// import {Request,Response} from 'express';
// import { hiddenTestCaseModel } from '../models/AddHiddenTestCaseModel';
// import { executeCode } from '../utils/executeCode';

// export const runUserCode=async(req:Request,res:Response)=>{
// const {title,language,userCode}=req.body;
// if(!title || !language || !userCode){
//     return res.status(401).json({
//         message:"provide proper detail",
//     });
// }
// const hiddenTests=await hiddenTestCaseModel.find({title});
// if(!hiddenTests || hiddenTests.length===0){
//     return res.status(403).json({
//         message:"not found", 
//     });
// }
// let allPassed=true;
// const testCaseResult:any[]=[];
// for(let i=0;i<hiddenTests.length;i++){
// const input=String(hiddenTests[i].sampleInput).trim();
// const expected=String(hiddenTests[i].sampleOutput).trim();
// try{
//     const output=await executeCode(language,userCode,input);
//     if(output==="time limit exceeded"){
//         allPassed=false;
//         testCaseResult.push({
//             input,
//             expectedOutput:expected,
//             userOutput:"time limit exceeded(TLE)",
//             status:"time limit exceeded(TLE)",
//         });
//         continue;
//     }
//     if(output=== 'complile error'){
//         allPassed=false;
//         testCaseResult.push({
//             input,
//             expectedOutput:expected,
//             userOutput:"Compile error",
//             status:"compile error",
//         });
//         break;
//     }
//     if(output=== 'runtime error'){
//         allPassed=false;
//         testCaseResult.push({
//             input,
//             expectedOuput:expected,
//             userOutput:"runtime error",
//             status:"runtime error",
//         });
//         continue;
//     }

//     if(output.trim()!==expected){
//         allPassed=false;
//         testCaseResult.push({
//             input,
//             expectdOutput:expected,
//             userOutput:output,
//             status:"wrong answer",
//         });
//         continue;
//     }
// testCaseResult.push({
//     input,
//     expectedOutput:expected,
//     userOutput:output,
//     status:"Accepted",
// });
// }catch(err){
//     allPassed=false;
//     testCaseResult.push({
//         input,
//         expectedOutput:expected,
//         userOutput:"unknown error",
//         status:"runtime error",
//     });
// }
// }
// return res.status(200).json({
//     message:allPassed?"all test case pass":"some test case failed",
//     data:testCaseResult,
// });
// }











import {Request,Response} from 'express';
import { hiddenTestCaseModel } from '../models/AddHiddenTestCaseModel';
import { executeCode } from '../utils/executeCode';
export const runUserCode=async(req:Request,res:Response)=>{
const {title,language,userCode}=req.body;
if( !title || !language || !userCode){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const hiddenTests=await hiddenTestCaseModel.find({title});
if(hiddenTests.length=== 0){
    return res.status(400).json({
    message:"admin has not completely make the question and added does not hidden test case for it",
    });
}
let allPassed=true;
const testCaseResult:any[]=[];
for(let i=0;i<hiddenTests.length;i++){
    const input=String(hiddenTests[i].sampleInput).trim();
const expected=String(hiddenTests[i].sampleOutput).trim();
const output=await executeCode(language,userCode,input);

const passed=output.trim()===expected;
if(!passed)allPassed=false;
testCaseResult.push({
    input,
    expectedOutput:expected,
    userOutput:output,
    status:passed?"Passed":"Failed",
})
}
return res.status(200).json({
    message:allPassed?"all test case pass":"Some test cases failed",
    data:testCaseResult,
});
}