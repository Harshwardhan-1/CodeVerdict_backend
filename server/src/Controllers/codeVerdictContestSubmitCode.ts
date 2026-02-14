import {Request,Response} from 'express';
import { codeVerdictContestModel } from '../models/CodeVerdictContestModel';


export const codeVerdictContestSubmitCode=async(req:Request,res:Response)=>{
const user=(req as any).user;
const userId=user.userId;
const name=user.name;
const gmail=user.gmail;




const {startingTime,endingTime,contestId,title,description,userCode}=req.body;
if(!contestId || !title || !description || !userCode || !startingTime || !endingTime){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const current=new Date();
const checkStartingTime=new Date(startingTime);
const checkEndingTime=new Date(endingTime);
if(current>checkEndingTime){
    return res.status(400).json({
        message:"time is up you cannot submit now",
    });
}
const checkIt=await codeVerdictContestModel.findOne({gmail,title,contestId});
if(checkIt){
    return res.status(400).json({
        message:"you have already submit it try other question of contest",
    });
}
const createIt=await codeVerdictContestModel.create({
    userId:userId,
    contestId,
    name:name,
    gmail:gmail,
    startingTime,
    endingTime,
    title,
    description,
    userCode,
    points:10,
});
return res.status(200).json({
    message:"successfully submitted",
    data:createIt,
})
}














export const showCodeVerdictLeaderBoard=async(req:Request,res:Response)=>{
const {contestId}=req.body;
if(!contestId){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const user=(req as any).user;
const userId=user.userId;
const gmail=user.gmail;
const checkIt=await codeVerdictContestModel.findOne({gmail,contestId});
// if(!checkIt){
//     return res.status(400).json({
//         message:"you dont have submit any solution so you cant see it",
//     });
// }

const showCompleteLeaderBoard=await codeVerdictContestModel.find({contestId});
if(showCompleteLeaderBoard.length===0){
    return res.status(400).json({
        message:"no one has submit correct answer",
    });
}
return res.status(200).json({
    message:"successfull",
    data:showCompleteLeaderBoard,
});
}