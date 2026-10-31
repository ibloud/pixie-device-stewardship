import http from 'node:http';
import https from 'node:https';
import {readFile} from 'node:fs/promises';
import {timingSafeEqual} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {configuration,createScanner,MailError} from './scanner.js';
export const PIXIE_MAIL_MODE='read-only';
export function createServer({scanner=createScanner(),token=process.env.PIXIE_MAIL_READ_TOKEN||'',tls}={}){
  const authorized=req=>{
    if(token.length<32)return false;
    const expected=Buffer.from('Bearer '+token),actual=Buffer.from(req.headers.authorization||'');
    return expected.length===actual.length&&timingSafeEqual(expected,actual);
  };
  let server;
  const handler=async(req,res)=>{
    const json=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});res.end(JSON.stringify(value));};
    try{
      const url=new URL(req.url,'http://localhost');
      // Literal loopback hosts prevent DNS rebinding. External transport must be native TLS.
      if(!req.socket.encrypted&&(!['127.0.0.1','::1'].includes(server.address()?.address)||!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress))){json(403,{error:'external_binding_requires_native_tls'});return;}
      if(!req.socket.encrypted&&!/^(127\.0\.0\.1|localhost|\[::1\])(?::\d+)?$/.test(req.headers.host||'')){json(403,{error:'invalid_local_host'});return;}
      if(req.headers.origin||req.headers['sec-fetch-site']==='cross-site'){json(403,{error:'browser_cross_origin_not_supported'});return;}
      if(req.method!=='GET'){res.setHeader('Allow','GET');json(405,{error:'method_not_allowed'});return;}
      if(!authorized(req)){json(401,{error:'unauthorized'});return;}
      if(url.pathname==='/health'){json(200,{ok:true,service:'PIXIE iCloud Mail Adapter',mode:PIXIE_MAIL_MODE,automaticScanning:false});return;}
      if(url.pathname==='/probe/folders'){json(200,{folders:await scanner.folders()});return;}
      if(url.pathname==='/scan/status'){json(200,await scanner.status());return;}
      if(url.pathname==='/scan/candidates'){json(200,await scanner.page(Number(url.searchParams.get('offset')||0),Number(url.searchParams.get('limit')||50)));return;}
      json(404,{error:'not_found'});
    }catch(e){json(e instanceof MailError?e.status:503,{error:e instanceof MailError?e.code:'adapter_operation_failed'});}
  };
  server=tls?https.createServer(tls,handler):http.createServer(handler);return server;
}
export async function start(env=process.env){
  const host=env.HOST||'127.0.0.1',token=env.PIXIE_MAIL_READ_TOKEN||'';
  if(token.length<32)throw new MailError('read_token_minimum_32_characters');
  if(env.PIXIE_MAIL_INDEX_ON_START==='true')throw new MailError('automatic_scanning_disabled_use_manual_scan');
  let tls;
  if(!['127.0.0.1','::1','localhost'].includes(host)){
    if(!env.PIXIE_MAIL_TLS_CERT||!env.PIXIE_MAIL_TLS_KEY)throw new MailError('external_binding_requires_native_tls');
    tls={cert:await readFile(env.PIXIE_MAIL_TLS_CERT),key:await readFile(env.PIXIE_MAIL_TLS_KEY),minVersion:'TLSv1.2'};
  }
  const server=createServer({scanner:createScanner(configuration(env)),token,tls});
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(Number(env.PORT||3000),host,resolve);});
  return server;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  start().then(server=>{
    console.log('PIXIE mail adapter started; automatic scanning disabled.');
    for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>server.close(()=>process.exit(0)));
  }).catch(e=>{console.error(e instanceof MailError?e.code:'local_server_start_failed');process.exitCode=1;});
}
