// Local synthetic IMAP peer: verifies commands emitted by the actual locked library.
import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import {once} from 'node:events';
import {mkdtemp,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {ImapFlow} from 'imapflow';
import {createScanner} from '../scanner.js';
test('real ImapFlow emits EXAMINE and metadata-only UID FETCH without STORE or body reads',async t=>{
 const commands=[];const flags=new Set();const sockets=new Set();
 const peer=net.createServer(socket=>{
  sockets.add(socket);socket.on('close',()=>sockets.delete(socket));socket.write('* OK [CAPABILITY IMAP4rev1] synthetic server\r\n');let buffer='';
  socket.on('data',chunk=>{buffer+=chunk.toString();let newline;
   while((newline=buffer.indexOf('\r\n'))>=0){const line=buffer.slice(0,newline);buffer=buffer.slice(newline+2);const [tag,...parts]=line.split(' '),command=parts.join(' ');commands.push(command.replace(/LOGIN .*/,'LOGIN [synthetic]'));
    if(command==='CAPABILITY')socket.write('* CAPABILITY IMAP4rev1\r\n'+tag+' OK done\r\n');
    else if(command.startsWith('LOGIN '))socket.write(tag+' OK authenticated\r\n');
    else if(command.startsWith('LIST '))socket.write('* LIST () "/" "INBOX"\r\n'+tag+' OK done\r\n');
    else if(command.startsWith('EXAMINE '))socket.write('* FLAGS (\\Seen)\r\n* 1 EXISTS\r\n* OK [UIDVALIDITY 123]\r\n* OK [UIDNEXT 2]\r\n'+tag+' OK [READ-ONLY] examined\r\n');
    else if(command.startsWith('UID SEARCH '))socket.write('* SEARCH 1\r\n'+tag+' OK done\r\n');
    else if(command.startsWith('UID FETCH '))socket.write('* 1 FETCH (UID 1 INTERNALDATE "03-Oct-2026 12:00:00 +0000" ENVELOPE ("Sat, 03 Oct 2026 12:00:00 +0000" "Invoice due" ((NIL NIL "synthetic" "example.invalid")) NIL NIL NIL NIL NIL NIL "<wire@example.invalid>"))\r\n'+tag+' OK done\r\n');
    else if(command==='LOGOUT'){socket.end('* BYE synthetic logout\r\n'+tag+' OK logout\r\n');}
    else socket.write(tag+' BAD unexpected command\r\n');
   }
  });
 });
 peer.listen(0,'127.0.0.1');await once(peer,'listening');const dataDir=await mkdtemp(path.join(os.tmpdir(),'pixie-wire-'));
 t.after(async()=>{for(const s of sockets)s.destroy();await new Promise(r=>peer.close(r));await rm(dataDir,{recursive:true,force:true});});
 const scanner=createScanner({email:'synthetic@example.invalid',dataDir},{clientFactory:()=>new ImapFlow({host:'127.0.0.1',port:peer.address().port,secure:false,doSTARTTLS:false,auth:{user:'synthetic',pass:'synthetic'},logger:false,disableAutoIdle:true,socketTimeout:3000})});
 assert.equal((await scanner.folders()).length,1);
 const result=await scanner.scan({folders:['INBOX'],since:'2026-10-01',before:'2026-10-08'});assert.equal(result.state,'complete',JSON.stringify(result));
 assert.equal((await scanner.page()).candidates[0].messageId,'<wire@example.invalid>');
 assert.ok(commands.some(c=>c.startsWith('EXAMINE ')));const fetch=commands.find(c=>c.startsWith('UID FETCH '));assert.match(fetch,/ENVELOPE/);assert.match(fetch,/INTERNALDATE/);assert.ok(!/BODY|RFC822|FLAGS/.test(fetch));
 assert.ok(!commands.some(c=>/^(SELECT|STORE|UID STORE|APPEND|COPY|UID COPY|MOVE|UID MOVE|EXPUNGE|CREATE|DELETE|RENAME|SUBSCRIBE|UNSUBSCRIBE)\b/.test(c)));assert.deepEqual(flags,new Set());
});
