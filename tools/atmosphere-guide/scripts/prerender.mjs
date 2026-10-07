import {readFile,writeFile} from 'node:fs/promises';
import {render} from '../dist/server/entry-server.js';
const file=new URL('../dist/client/index.html',import.meta.url);
const html=await readFile(file,'utf8');
if(!html.includes('<div id="root"></div>'))throw new Error('Expected empty app root');
const output=html.replace('<div id="root"></div>','<div id="root">'+render()+'</div>');
if(!output.includes('did:plc:o6kuv3yieti2vqrb7ckmd5vg'))throw new Error('Identity explainer missing from served HTML');
await writeFile(file,output);
console.log('First screen and Learn resources prerendered.');
