import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createScanner,configuration,MailError} from './scanner.js';
// Operational output contains safe codes/counts only. Explicit folders/review commands
// intentionally print private metadata to the owner; never capture it in shared logs.
export async function runCli(argv,{scanner=createScanner(configuration()),output=value=>process.stdout.write(value+'\n')}={}){
 const [command,...args]=argv;

  if(command==='folders')output(JSON.stringify({folders:await scanner.folders()},null,2));
  else if(command==='scan'){
    const scope={folders:[]};
    for(let i=0;i<args.length;i+=2){const flag=args[i],value=args[i+1];if(!value)throw new MailError('scan_arguments_required',400);
      if(flag==='--folder')scope.folders.push(value);
      else if(flag==='--since'&&!scope.since)scope.since=value;
      else if(flag==='--before'&&!scope.before)scope.before=value;
      else if(flag==='--max-messages'&&!scope.maxMessages)scope.maxMessages=Number(value);
      else throw new MailError('invalid_scan_argument',400);
    }
    const result=await scanner.scan(scope);
    output(JSON.stringify({state:result.state,foldersCompleted:result.foldersCompleted,messages:result.messages,errorCodes:result.errors.map(e=>e.code)}));
    return result.state==='complete'?0:1;
  }else if(command==='review')output(JSON.stringify(await scanner.page(Number(args[0]||0),Number(args[1]||50)),null,2));
  else if(command==='delete-data'){output(JSON.stringify(await scanner.deleteData(args.join(' '))));}
  else throw new MailError('use_folders_scan_review_or_delete-data',400);
 return 0;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 runCli(process.argv.slice(2)).then(code=>{process.exitCode=code;}).catch(e=>{console.error(e instanceof MailError?e.code:'local_operation_failed');process.exitCode=1;});
}
