import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile,writeFile,stat} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {once} from 'node:events';
import http from 'node:http';
import {fileURLToPath} from 'node:url';
import {createScanner,configuration,createClient,classify,scanScope} from '../scanner.js';
import {runCli} from '../cli.js';
import {createServer,start} from '../server.js';
const scope={folders:['INBOX'],since:'2026-10-01',before:'2026-10-08'};
const record=(uid=1,subject='Invoice due')=>({uid,internalDate:new Date('2026-10-03T12:00:00Z'),flags:new Set(),envelope:{messageId:'<synthetic-'+uid+'@example.invalid>',subject,from:[{address:'synthetic@example.invalid'}],to:[{address:'not-retained@example.invalid'}]},source:'BODY MUST NOT BE STORED',attachments:['MUST NOT BE STORED']});
async function fixture(t){
 const dataDir=await mkdtemp(path.join(os.tmpdir(),'pixie-mail-test-'));t.after(()=>rm(dataDir,{recursive:true,force:true}));
 const config={dataDir,email:'synthetic@example.invalid',password:'synthetic-secret',liveApproved:true};
 const messages=[record()];const calls=[];const behavior={fail:false,readonly:true,uidValidity:10n};
 const clientFactory=()=>({on(){},async connect(){calls.push('connect');if(behavior.connectFail)throw Error('SECRET upstream error synthetic-secret');},async list(){calls.push('list');return [{path:'INBOX'}];},async mailboxOpen(folder,options){calls.push(['open',folder,options]);if(behavior.fail||folder==='Broken')throw Error('SECRET upstream error');return {readOnly:behavior.readonly,uidValidity:behavior.uidValidity};},async search(query,options){calls.push(['search',query,options]);return behavior.ids||messages.map(m=>m.uid);},async *fetch(ids,query,options){calls.push(['fetch',ids,query,options]);for(const m of messages){yield m;if(behavior.fetchFail)throw Error('SECRET partial fetch');}},async logout(){calls.push('logout');},close(){calls.push('close');}});
 return {config,messages,calls,behavior,scanner:createScanner(config,{clientFactory}),clientFactory};
}
test('manual bounded scan saves metadata only, uses UID and read-only access, and leaves flags unchanged',async t=>{
 const f=await fixture(t),before=structuredClone(f.messages[0].flags);assert.equal(f.calls.length,0);
 assert.deepEqual(await f.scanner.folders(),[{path:'INBOX',specialUse:null}]);
 const result=await f.scanner.scan(scope);assert.equal(result.state,'complete');assert.ok(result.finishedAt);
 assert.deepEqual(f.calls.find(c=>c[0]==='open'),['open','INBOX',{readOnly:true}]);
 assert.deepEqual(f.calls.find(c=>c[0]==='fetch'),['fetch',[1],{uid:true,envelope:true,internalDate:true},{uid:true}]);
 const search=f.calls.find(c=>c[0]==='search');assert.equal(search[1].since.toISOString(),'2026-10-01T00:00:00.000Z');assert.deepEqual(search[2],{uid:true});
 assert.deepEqual(f.messages[0].flags,before);
 const raw=await readFile(path.join(f.config.dataDir,'metadata.json'),'utf8');for(const bad of ['synthetic-secret','BODY MUST','attachments','not-retained','flags'])assert.ok(!raw.includes(bad));
 assert.equal((await stat(f.config.dataDir)).mode&0o777,0o700);assert.equal((await stat(path.join(f.config.dataDir,'metadata.json'))).mode&0o777,0o600);
 const page=await f.scanner.page();assert.equal(page.total,1);assert.equal(page.candidates[0].classification.confirmedObligation,false);
 assert.equal((await createScanner(f.config,{clientFactory:f.clientFactory}).page()).total,1);
 const resumedStatus=await createScanner(f.config,{clientFactory:f.clientFactory}).status();assert.equal(resumedStatus.indexedMessages,1);assert.ok(resumedStatus.lastIndexUpdatedAt);
});
test('repeat scans upsert stable folder/UIDVALIDITY/UID identities without duplicates',async t=>{
 const f=await fixture(t);await f.scanner.scan(scope);await f.scanner.scan(scope);assert.equal((await f.scanner.page()).total,1);
 f.messages[0].envelope.subject='Payment resolved';await f.scanner.scan(scope);assert.equal((await f.scanner.page()).candidates[0].classification.label,'possible-informational-match');
 f.behavior.uidValidity=11n;await f.scanner.scan(scope);assert.equal((await f.scanner.page()).total,2);
});
test('failed folders and interrupted fetches preserve previous valid results atomically',async t=>{
 const f=await fixture(t);await f.scanner.scan(scope);const file=path.join(f.config.dataDir,'metadata.json'),raw=await readFile(file,'utf8');
 f.behavior.fail=true;assert.equal((await f.scanner.scan(scope)).state,'failed');assert.equal(await readFile(file,'utf8'),raw);
 f.behavior.fail=false;f.behavior.fetchFail=true;f.messages.push(record(2));assert.equal((await f.scanner.scan(scope)).state,'failed');assert.equal(await readFile(file,'utf8'),raw);
 f.behavior.fetchFail=false;const result=await f.scanner.scan({...scope,folders:['INBOX','Broken']});assert.equal(result.state,'complete_with_errors');assert.equal(result.foldersCompleted,1);assert.equal((await f.scanner.page()).total,2);assert.ok(!JSON.stringify(result).includes('SECRET'));
});
test('limits, server refusal of read-only mode, invalid dates and invalid UIDs fail safely',async t=>{
 const f=await fixture(t);
 for(const input of [{...scope,folders:[]},{...scope,since:'2026-02-30'},{...scope,before:'2026-12-01'},{...scope,folders:['INBOX','INBOX']},{...scope,maxMessages:501},{...scope,source:true}])assert.throws(()=>scanScope(input),/invalid_scan_scope/);
 f.behavior.readonly=false;assert.equal((await f.scanner.scan(scope)).errors[0].code,'readonly_mailbox_not_confirmed');assert.ok(!f.calls.some(c=>c[0]==='search'));
 f.behavior.readonly=true;f.behavior.ids=[1,2];assert.equal((await f.scanner.scan({...scope,maxMessages:1})).errors[0].code,'folder_limit_exceeded_narrow_dates');assert.ok(!f.calls.some(c=>c[0]==='fetch'));
 f.behavior.ids=[0];assert.equal((await f.scanner.scan(scope)).state,'failed');
});
test('concurrent scans/deletion are locked and corrupt or account-mismatched indices are preserved',async t=>{
 const f=await fixture(t),file=path.join(f.config.dataDir,'metadata.json');
 await writeFile(path.join(f.config.dataDir,'scan.lock'),'synthetic-lock',{mode:0o600});await assert.rejects(f.scanner.scan(scope),/locked/);await assert.rejects(f.scanner.deleteData('DELETE LOCAL MAIL INDEX'),/locked/);await rm(path.join(f.config.dataDir,'scan.lock'));await f.scanner.scan(scope);
 await writeFile(file,'not-json',{mode:0o600});await assert.rejects(f.scanner.scan(scope),/index_unreadable_preserved/);assert.equal(await readFile(file,'utf8'),'not-json');
 await rm(file);await f.scanner.scan(scope);const raw=await readFile(file,'utf8');const other=createScanner({...f.config,email:'another@example.invalid'},{clientFactory:f.clientFactory});await assert.rejects(other.scan(scope),/account_mismatch/);assert.equal(await readFile(file,'utf8'),raw);
 await assert.rejects(f.scanner.deleteData('yes'),/confirmation/);await f.scanner.deleteData('DELETE LOCAL MAIL INDEX');assert.equal((await f.scanner.page()).total,0);
});
test('credentials and explicit live authorization are mandatory; TLS and logging remain safe',()=>{
 assert.throws(()=>createClient({}),/credentials_not_configured/);assert.throws(()=>createClient({email:'synthetic',password:'synthetic'}),/live_access_not_authorized/);
 const c=createClient({email:'synthetic',password:'synthetic',liveApproved:true});assert.equal(c.options.secure,true);assert.equal(c.options.tls.rejectUnauthorized,true);assert.equal(c.options.logger,false);assert.equal(c.options.logRaw,false);c.close();
 assert.ok(!configuration({}).dataDir.startsWith('/tmp/'));
});
test('classification avoids substring false positives and never asserts obligations',()=>{
 assert.equal(classify('Weekend duet').label,'no-subject-signal');assert.equal(classify('Your invoice is paid').label,'possible-informational-match');assert.equal(classify('Action required: renewal').label,'possible-review');for(const s of ['Deadline tomorrow','Payment receipt',''])assert.equal(classify(s).confirmedObligation,false);
});
test('HTTP local server starts without mail credentials; every endpoint needs bearer; no mutation routes',async t=>{
 const f=await fixture(t);const scanner=createScanner({...f.config,email:'',password:''});const token='synthetic-test-token-'.repeat(3),server=createServer({scanner,token});server.listen(0,'127.0.0.1');await once(server,'listening');t.after(()=>new Promise(r=>server.close(r)));const base='http://127.0.0.1:'+server.address().port;const auth={Authorization:'Bearer '+token};
 for(const route of ['/health','/probe/folders','/scan/status','/scan/candidates']){const response=await fetch(base+route);assert.equal(response.status,401);assert.equal(response.headers.get('cache-control'),'no-store');assert.equal((await fetch(base+route,{headers:{Authorization:'Bearer wrong'}})).status,401);}
 assert.equal((await fetch(base+'/health',{headers:auth})).status,200);
 const missing=await fetch(base+'/probe/folders',{headers:auth});assert.equal(missing.status,503);assert.deepEqual(await missing.json(),{error:'credentials_not_configured'});
 assert.equal((await fetch(base+'/scan/candidates?offset=NaN',{headers:auth})).status,400);
 assert.equal((await fetch(base+'/scan/status',{headers:auth,method:'POST'})).status,405);
 assert.equal((await fetch(base+'/scan',{headers:auth,method:'POST'})).status,405);
 assert.equal((await fetch(base+'/scan/candidates',{headers:{...auth,Origin:'https://untrusted.invalid'}})).status,403);
 const hostStatus=await new Promise((resolve,reject)=>{const req=http.get(base+'/health',{headers:{...auth,Host:'untrusted.invalid'}},res=>{res.resume();resolve(res.statusCode)});req.on('error',reject)});assert.equal(hostStatus,403);
});
test('authenticated read interface lists mocked folders and reads manually saved state without scanning',async t=>{
 const f=await fixture(t),token='synthetic-interface-token'.repeat(2);await f.scanner.scan(scope);
 const server=createServer({scanner:f.scanner,token});server.listen(0,'127.0.0.1');await once(server,'listening');t.after(()=>new Promise(r=>server.close(r)));const base='http://127.0.0.1:'+server.address().port,headers={Authorization:'Bearer '+token};
 assert.equal((await (await fetch(base+'/probe/folders',{headers})).json()).folders.length,1);const count=f.calls.filter(c=>c[0]==='fetch').length;
 assert.equal((await (await fetch(base+'/scan/candidates',{headers})).json()).total,1);assert.equal(f.calls.filter(c=>c[0]==='fetch').length,count);
});
test('external plain HTTP, short tokens and legacy automatic scanning are refused',async()=>{
 await assert.rejects(start({PIXIE_MAIL_READ_TOKEN:'short'}),/minimum_32/);
 await assert.rejects(start({HOST:'0.0.0.0',PIXIE_MAIL_READ_TOKEN:'x'.repeat(40)}),/native_tls/);
 await assert.rejects(start({PIXIE_MAIL_READ_TOKEN:'x'.repeat(40),PIXIE_MAIL_INDEX_ON_START:'true'}),/automatic_scanning_disabled/);
});
test('CLI missing credentials and manual scope failures exclude sensitive environment values from logs',async t=>{
 const f=await fixture(t),secret='SYNTHETIC-NOT-A-REAL-SECRET';
 const result=spawnSync(process.execPath,['cli.js','scan','--folder','INBOX','--since',scope.since,'--before',scope.before],{cwd:fileURLToPath(new URL('../',import.meta.url)),encoding:'utf8',env:{...process.env,ICLOUD_EMAIL:'',ICLOUD_APP_PASSWORD:secret,PIXIE_MAIL_DATA_DIR:f.config.dataDir,PIXIE_MAIL_LIVE_ACCESS:''}});
 assert.equal(result.status,1);assert.ok(!result.stdout.includes(secret));assert.ok(!result.stderr.includes(secret));assert.ok(!result.stdout.includes('example.invalid'));assert.match(result.stdout,/credentials_not_configured/);
});

test('manual CLI completes a synthetic scan and repeat review without disclosing metadata in scan output',async t=>{
 const f=await fixture(t),lines=[];
 const argv=['scan','--folder','INBOX','--since',scope.since,'--before',scope.before,'--max-messages','20'];
 assert.equal(await runCli(argv,{scanner:f.scanner,output:s=>lines.push(s)}),0);
 assert.equal(JSON.parse(lines[0]).state,'complete');assert.ok(!lines[0].includes('synthetic@example.invalid'));assert.ok(!lines[0].includes('Invoice'));
 assert.equal(await runCli(argv,{scanner:f.scanner,output:s=>lines.push(s)}),0);assert.equal((await f.scanner.page()).total,1);
 await assert.rejects(runCli(['scan'],{scanner:f.scanner}),/invalid_scan_scope/);
});

test('local data cannot be configured inside the source checkout; malformed stores are preserved',async t=>{
 const f=await fixture(t);assert.throws(()=>createScanner({...f.config,dataDir:path.resolve('private-state')}),/outside_checkout/);
 await f.scanner.scan(scope);const file=path.join(f.config.dataDir,'metadata.json'),value=JSON.parse(await readFile(file,'utf8'));value.records[0].body='SYNTHETIC-BODY';const raw=JSON.stringify(value);await writeFile(file,raw);
 await assert.rejects(f.scanner.scan(scope),/index_invalid_preserved/);assert.equal(await readFile(file,'utf8'),raw);
});
test('factory cannot accidentally serve plaintext on a wildcard bind even with a spoofed loopback Host',async t=>{
 const f=await fixture(t),token='synthetic-wildcard-test-token'.repeat(2);const server=createServer({scanner:f.scanner,token});server.listen(0,'0.0.0.0');await once(server,'listening');t.after(()=>new Promise(r=>server.close(r)));
 const response=await fetch('http://127.0.0.1:'+server.address().port+'/health',{headers:{Authorization:'Bearer '+token}});assert.equal(response.status,403);
});

test('actual start defaults to loopback and does not require credentials or contact IMAP',async t=>{
 const f=await fixture(t),token='synthetic-startup-token'.repeat(2);
 const server=await start({PORT:'0',PIXIE_MAIL_READ_TOKEN:token,PIXIE_MAIL_DATA_DIR:f.config.dataDir});t.after(()=>new Promise(r=>server.close(r)));
 assert.equal(server.address().address,'127.0.0.1');const headers={Authorization:'Bearer '+token};const base='http://127.0.0.1:'+server.address().port;
 const response=await fetch(base+'/health',{headers});assert.equal(response.status,200);assert.equal((await response.json()).automaticScanning,false);
 assert.equal((await fetch(base+'/probe/folders',{headers})).status,503);assert.equal((await fetch(base+'/scan/candidates',{headers})).status,200);
 assert.equal((await stat(f.config.dataDir)).isDirectory(),true);
});
