import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { v4 as uuid } from 'uuid';
export const OrganizeExecuteCode=(language:string,userCode:string,input:string):Promise<string>=>{
return new Promise((resolve,reject)=>{
    const jobId=uuid();
    const basePath=path.join(__dirname,"..","temp");
    if(!fs.existsSync(basePath)){
        fs.mkdirSync(basePath,{recursive:true});
    }
    const inputPath=path.join(basePath,`${jobId}.txt`);
    fs.writeFileSync(inputPath,input+"\n");
    let filePath="";
    let command="";
    if(language=== "C++"){
        filePath=path.join(basePath,`${jobId}.cpp`);
        const exePath=path.join(basePath,`${jobId}.exe`);
        fs.writeFileSync(filePath,userCode);
        command = `g++ "${filePath}" -o "${exePath}" && "${exePath}" < "${inputPath}"`;
    }else if(language=== 'python'){
        filePath=path.join(basePath,`${jobId}.py`);
        fs.writeFileSync(filePath,userCode);
        command = `python "${filePath}" < "${inputPath}"`;
    }else if(language=== 'java'){
        filePath=path.join(basePath,`Main.java`);
        fs.writeFileSync(filePath,userCode);
         command = `javac "${filePath}" && java -cp "${basePath}" Main < "${inputPath}"`;
    }
            exec(command, { timeout: 15000 }, (error, stdout, stderr) => {
            if (error?.signal === 'SIGTERM') {
           return resolve("time limit exceeded");
}

    if (stderr && stderr.toLowerCase().includes("error")) {
        return resolve("complile error");
    }

  
    if (error) {
        return resolve("runtime error");
    }
            return resolve(stdout.trim());
        });
});
}