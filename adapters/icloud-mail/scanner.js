import path from 'node:path';
import os from 'node:os';
import {mkdir,readFile,rename,unlink,open,lstat,chmod,realpath} from 'node:fs/promises';
import {createHash,randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {ImapFlow} from 'imapflow';

export class MailError extends Error {
  constructor(code,status=503){super(code);this.code=code;this.status=status;}
}
export function configuration(env=process.env){
  return {email:env.ICLOUD_EMAIL||'',password:env.ICLOUD_APP_PASSWORD||'',
    liveApproved:env.PIXIE_MAIL_LIVE_ACCESS==='approved',
    dataDir:path.resolve(env.PIXIE_MAIL_DATA_DIR||path.join(os.homedir(),'.local','share','pixie','icloud-mail'))};
}
export function createClient(config){
  if(!config.email||!config.password)throw new MailError('credentials_not_configured');
  if(!config.liveApproved)throw new MailError('live_access_not_authorized');
  return new ImapFlow({host:'imap.mail.me.com',port:993,secure:true,
    auth:{user:config.email,pass:config.password},tls:{rejectUnauthorized:true},
    logger:false,logRaw:false,emitLogs:false,disableAutoIdle:true,
    connectionTimeout:15000,greetingTimeout:15000,socketTimeout:30000});
}
export function classify(subject=''){
  const rules=[['action-request',/\b(action required|response required|please respond|follow[ -]?up|request)\b/i],
    ['date-or-renewal',/\b(deadline|due|renewal|expires?|expiration)\b/i],
    ['payment-or-agreement',/\b(invoice|payment|contract|agreement|proposal)\b/i],
    ['application-or-case',/\b(application|grant|appeal|hearing|case|ticket|verification)\b/i]];
  const signals=rules.filter(([,re])=>re.test(subject)).map(([name])=>name);
  const informational=/\b(paid|receipt|resolved|closed|completed|cancelled|canceled|newsletter|sale|discount)\b/i.test(subject);
  return {label:!signals.length?'no-subject-signal':informational?'possible-informational-match':'possible-review',
    signals,confirmedObligation:false,basis:'Subject text only; not verified. Dates, amounts and obligations are not inferred.'};
}
export function scanScope(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['folders','since','before','maxMessages'].includes(k)))throw new MailError('invalid_scan_scope',400);
  const {folders,since,before,maxMessages=200}=input;
  const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
  if(!Array.isArray(folders)||!folders.length||folders.length>5||new Set(folders).size!==folders.length||folders.some(f=>typeof f!=='string'||!f.length||f.length>500||/[\x00-\x1f\x7f]/.test(f))||!validDate(since)||!validDate(before)||Date.parse(before)<=Date.parse(since)||Date.parse(before)-Date.parse(since)>31*86400000||!Number.isInteger(maxMessages)||maxMessages<1||maxMessages>500)throw new MailError('invalid_scan_scope',400);
  return {folders,since,before,maxMessages};
}
const empty=()=>({schema:'pixie.mail-metadata/v1',generatedAt:null,records:[]});
const fields=['folder','uidValidity','uid','messageId','date','sender','subject'];
function validateIndex(value){
  if(value?.schema!=='pixie.mail-metadata/v1'||!Array.isArray(value.records)||value.records.length>100000||Object.keys(value).some(k=>!['schema','generatedAt','records','account'].includes(k)))throw new MailError('index_invalid_preserved');
  const seen=new Set();
  for(const r of value.records){
    if(!r||Object.keys(r).length!==fields.length||Object.keys(r).some(k=>!fields.includes(k))||!Number.isSafeInteger(r.uid)||r.uid<1||typeof r.folder!=='string'||typeof r.uidValidity!=='string'||!/^\d+$/.test(r.uidValidity)||typeof r.subject!=='string'||!Array.isArray(r.sender)||r.sender.some(s=>typeof s!=='string')||!(r.messageId===null||typeof r.messageId==='string')||!(r.date===null||typeof r.date==='string'))throw new MailError('index_invalid_preserved');
    const key=identity(r);if(seen.has(key))throw new MailError('index_invalid_preserved');seen.add(key);
  }
  return value;
}
const identity=r=>JSON.stringify([r.folder,r.uidValidity,r.uid]);
const checkoutRoot=fileURLToPath(new URL('../../',import.meta.url));
function outsideCheckout(directory){
  const relative=path.relative(checkoutRoot,directory);
  if(!relative||(!relative.startsWith('..'+path.sep)&&relative!=='..'&&!path.isAbsolute(relative)))throw new MailError('data_directory_must_be_outside_checkout',400);
}
export function createScanner(config=configuration(),{clientFactory=()=>createClient(config)}={}){
  if(!path.isAbsolute(config.dataDir))throw new MailError('data_directory_must_be_absolute',400);
  outsideCheckout(config.dataDir);
  const filename=path.join(config.dataDir,'metadata.json');
  let state={state:'idle',startedAt:null,finishedAt:null,foldersCompleted:0,messages:0,errors:[]};
  async function privateDir(){
    await mkdir(config.dataDir,{recursive:true,mode:0o700});
    const info=await lstat(config.dataDir);if(!info.isDirectory()||info.isSymbolicLink())throw new MailError('unsafe_data_directory');
    outsideCheckout(await realpath(config.dataDir));
    await chmod(config.dataDir,0o700);
  }
  async function load(){
    try{
      const info=await lstat(filename);if(!info.isFile()||info.isSymbolicLink()||(info.mode&0o077))throw new MailError('unsafe_index_permissions');
      if(info.size>32*1024*1024)throw new MailError('index_too_large_preserved');
      return validateIndex(JSON.parse(await readFile(filename,'utf8')));
    }catch(e){if(e.code==='ENOENT')return empty();throw e instanceof MailError?e:new MailError('index_unreadable_preserved');}
  }
  async function exclusive(fn){
    await privateDir();const lock=path.join(config.dataDir,'scan.lock');let handle;
    try{handle=await open(lock,'wx',0o600);}catch{throw new MailError('scan_or_delete_already_locked',409);}
    try{return await fn();}finally{await handle.close();await unlink(lock);}
  }
  async function persist(value){
    validateIndex(value);const serialized=JSON.stringify(value);if(Buffer.byteLength(serialized)>32*1024*1024)throw new MailError('index_too_large_preserved');const temporary=path.join(config.dataDir,'.metadata-'+randomUUID());let handle;
    try{handle=await open(temporary,'wx',0o600);await handle.writeFile(serialized);await handle.sync();await handle.close();handle=null;await rename(temporary,filename);}
    finally{if(handle)await handle.close();await unlink(temporary).catch(()=>{});}
  }
  async function session(fn){
    let c;
    try{c=clientFactory();c.on?.('error',()=>{});await c.connect();return await fn(c);}
    catch(e){if(e instanceof MailError)throw e;throw new MailError('imap_operation_failed');}
    finally{if(c){await c.logout().catch(()=>{});c.close?.();}}
  }
  return {
    async status(){const index=await load();return {...structuredClone(state),scope:'this-process',lastIndexUpdatedAt:index.generatedAt,indexedMessages:index.records.length,automaticScanning:false};},
    async folders(){return session(async c=>(await c.list()).map(r=>({path:r.path,specialUse:r.specialUse||null})));},
    async scan(input){
      const scope=scanScope(input);
      return exclusive(async()=>{
        state={state:'running',startedAt:new Date().toISOString(),finishedAt:null,foldersCompleted:0,messages:0,errors:[]};
        try{
          const previous=await load();const account=createHash('sha256').update(config.email.toLowerCase()).digest('hex');
          if(previous.account&&previous.account!==account)throw new MailError('index_account_mismatch');
          const records=new Map(previous.records.map(r=>[identity(r),r]));
          for(const folder of scope.folders){
            try{
              const staged=await session(async c=>{
                const mailbox=await c.mailboxOpen(folder,{readOnly:true});
                if(mailbox.readOnly!==true||!mailbox.uidValidity)throw new MailError('readonly_mailbox_not_confirmed');
                const ids=await c.search({since:new Date(scope.since+'T00:00:00Z'),before:new Date(scope.before+'T00:00:00Z')},{uid:true});
                if(!Array.isArray(ids)||ids.length>scope.maxMessages)throw new MailError('folder_limit_exceeded_narrow_dates',400);
                if(!ids.length)return [];
                if(ids.some(n=>!Number.isSafeInteger(n)||n<1))throw new MailError('invalid_uid_response');
                const wanted=new Set(ids),rows=[];
                for await(const msg of c.fetch(ids,{uid:true,envelope:true,internalDate:true},{uid:true})){
                  if(!wanted.has(msg.uid))throw new MailError('unexpected_uid_response');
                  const date=msg.internalDate instanceof Date?msg.internalDate:new Date(msg.internalDate);
                  if(!Number.isFinite(date.getTime())||date<new Date(scope.since)||date>=new Date(scope.before))throw new MailError('unexpected_date_response');
                  rows.push({folder,uidValidity:String(mailbox.uidValidity),uid:msg.uid,messageId:typeof msg.envelope?.messageId==='string'?msg.envelope.messageId.slice(0,2000):null,date:date.toISOString(),sender:(msg.envelope?.from||[]).map(s=>s.address).filter(s=>typeof s==='string').slice(0,20),subject:String(msg.envelope?.subject||'').slice(0,4000)});
                  if(rows.length>scope.maxMessages)throw new MailError('folder_limit_exceeded_narrow_dates');
                }
                return rows;
              });
              for(const r of staged)records.set(identity(r),r);
              state.messages+=staged.length;state.foldersCompleted++;
            }catch(e){state.errors.push({folder,code:e instanceof MailError?e.code:'imap_operation_failed'});}
          }
          // Commit only completed folders; failures never replace their earlier records.
          if(state.foldersCompleted)await persist({schema:'pixie.mail-metadata/v1',account,generatedAt:new Date().toISOString(),records:[...records.values()]});
          state.state=state.errors.length?(state.foldersCompleted?'complete_with_errors':'failed'):'complete';
          return structuredClone(state);
        }catch(e){state.state='failed';throw e instanceof MailError?e:new MailError('index_update_failed_preserved');}
        finally{state.finishedAt=new Date().toISOString();}
      }).then(()=>structuredClone(state));
    },
    async page(offset=0,limit=50){
      if(!Number.isSafeInteger(offset)||offset<0||!Number.isSafeInteger(limit)||limit<1||limit>100)throw new MailError('invalid_pagination',400);
      const index=await load();const candidates=index.records.map(r=>({...r,classification:classify(r.subject)})).filter(r=>r.classification.label!=='no-subject-signal');
      return {schema:index.schema,generatedAt:index.generatedAt,mode:'read-only-metadata',note:'Subject-based review leads, never confirmed obligations. Index is cumulative; it does not prove current mailbox membership.',total:candidates.length,indexedMessages:index.records.length,offset,limit,candidates:candidates.slice(offset,offset+limit)};
    },
    async deleteData(confirmation){if(confirmation!=='DELETE LOCAL MAIL INDEX')throw new MailError('deletion_confirmation_required',400);return exclusive(async()=>{await unlink(filename).catch(e=>{if(e.code!=='ENOENT')throw e;});return {deleted:true};});}
  };
}
