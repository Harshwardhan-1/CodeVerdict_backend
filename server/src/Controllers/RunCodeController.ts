import {Request,Response} from 'express';
import { hiddenTestCaseModel } from '../models/AddHiddenTestCaseModel';
import { executeCode } from '../utils/executeCode';
import { io } from '../app';

export const runUserCode=async(req:Request,res:Response)=>{
const {title,language,userCode}=req.body;
if(!title || !language || !userCode){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const hiddenTests=await hiddenTestCaseModel.find({title});
if(!hiddenTests || hiddenTests.length===0){
    return res.status(403).json({
        message:"not found", 
    });
}
let allPassed=true; 
const testCaseResult:any[]=[];



let passed=0;
let total=hiddenTests.length;
for(let i=0;i<hiddenTests.length;i++){
    io.emit('progress',{
        type:"running",
        testCase:i+1
    });
const input=String(hiddenTests[i].sampleInput).trim();
const expected=String(hiddenTests[i].sampleOutput).trim();
try{

    //tle
    const output=await executeCode(language,userCode,input);
    if(output==="time limit exceeded"){
        io.emit('progress',{
    type:"failed",
    testCase:i+1
});
        return res.status(200).json({
            message:`Test case ${i+1} failed(TLE)`,
            passed,
            total,
            data:[{
                testCaseNumber:i+1,
                input,
                expectedOutput:expected,
                userOutput:"time limit excedded",
                status:"time limit exceeded"
            }]
        });
    }

    
    if(output.startsWith('complile error')){
        io.emit('progress',{
    type:"failed",
    testCase:i+1
});
        return res.status(200).json({ 
         message: "Compile Error",
         passed,
         total,
           data: [{
                    testCaseNumber:i+1,
                    input,
                    expectedOutput: expected,
                    userOutput: output,
                    status: "compile error"
                }]
            });
    }
    if(output=== 'runtime error'){
        io.emit('progress',{
    type:"failed",
    testCase:i+1
});
                    return res.status(200).json({
                message: `Test case ${i+1} runtime error`,
                passed,
                total,
                data: [{
                    testCaseNumber:i+1,
                    input,
                    expectedOutput: expected,
                    userOutput: output,
                    status: "runtime error"
                }]
            });

    }

    if(output.trim()!==expected){
        io.emit('progress',{
    type:"failed",
    testCase:i+1
});
        return res.status(200).json({
                message: `Test case ${i+1} failed (Wrong Answer)`,
                passed,
                total,
                data: [{
                    testCaseNumber:i+1,
                    input,
                    expectedOutput: expected,
                    userOutput: output,
                    status: "wrong answer"
                }]
            });
    }
passed++;
}catch(err:any){
    io.emit('progress',{
    type:"failed",
    testCase:i+1
});
        return res.status(200).json({
            message:`Test case ${i+1} runtime error`,
            data:[{ 
                input,
                expectedOutput: expected,
                userOutput:err.message ||  "unknown error",
                status: "runtime error"
            }]
        });
    }
}
return res.status(200).json({
    message:"all test case pass",
    passed:total,
    total,
    data:[],
});
}