// // //without docker
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { v4 as uuid } from 'uuid';
export const executeCode=(language:string,userCode:string,input:string):Promise<string>=>{
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
            exec(command, { timeout: 25000 }, (error, stdout, stderr) => {
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










// //use docker here because if anyone submit the code that is running infinite times it will crash
// //program that's why docker is best practice to use here

// import fs from 'fs';
// import path from 'path';
// import { exec } from 'child_process';
// import { v4 as uuid } from 'uuid';
// export const executeCode=(language:string,userCode:string,input:string):Promise<string>=>{
// return new Promise((resolve,reject)=>{
//     const jobId=uuid();
//     const basePath=path.join(__dirname,"..","temp",jobId);
//     if(!fs.existsSync(basePath)){
//         fs.mkdirSync(basePath,{recursive:true});
//     }
//     const inputPath=path.join(basePath,"input.txt");
//     fs.writeFileSync(inputPath,input);


//     let dockerPath=basePath.replace(/\\/g, "/");
//     let runCommand="";
//      if (language === "C++") {
//       fs.writeFileSync(path.join(basePath, "main.cpp"), userCode);
//      runCommand = 
//       `docker run --rm -v "${dockerPath}:/app" cpp-runner ` +
//         `bash -c "cd /app && g++ main.cpp -o main && ./main < input.txt"`;
//     } else if (language === "python") {
//       fs.writeFileSync(path.join(basePath, "main.py"), userCode);
//       runCommand = 
//       `docker run --rm -v "${dockerPath}:/app" python-runner \ bash -c "python main.py < input.txt" `;
//     }
//     else if (language === "java") {
//       fs.writeFileSync(path.join(basePath, "Main.java"), userCode);
//       runCommand = 
//       `docker run --rm -v "${dockerPath}:/app" java-runner \ bash -c "javac Main.java && java -cp /app Main < input.txt" `;
//     }
//             exec(runCommand, { timeout: 5000 }, (error, stdout, stderr) => {
//             if(error && error.killed){
//                 return resolve("time limit exceeded"); 
//             } 
//             if(error && stderr && stderr.includes("error")){
//                 return resolve("complile error");
//             }
//             if(error){
//                 return resolve("runtime error");
//             }
//             return resolve(stdout.trim());
//         });
// });
// }





