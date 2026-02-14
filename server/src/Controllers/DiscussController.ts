import {Request,Response} from 'express';
import { discussModel } from '../models/DiscussModel';
import { discussApproach } from '../utils/DiscussApproach';




export const discussSolution=async(req:Request,res:Response)=>{
const {title,userCode,approach}=req.body;
if(!title || !userCode || !approach){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const checkLength=discussApproach({approach});
if(!checkLength.isValid){
    return res.status(400).json({
        message:"approach must be atleast of 10 characters",
    });
}
const user=(req as any).user;
const userId=user.userId;
const name=user.name;
const gmail=user.gmail;
const createIt=await discussModel.create({
    userId,
    problemTitle:title,
    name,
    gmail,
    userCode,
    approach,
    date:Date.now(),
});
return res.status(200).json({
    message:"successfully submitted",
    data:createIt,
});
}




export const checkDiscuss=async(req:Request,res:Response)=>{
    const {title}=req.body;
    if(!title){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const checkIt=await discussModel.find({problemTitle:title});
    if(checkIt.length=== 0){
        return res.status(400).json({
            message:"no one has discuss the solution yet",
        });
    }
    return res.status(200).json({
        message:"successfully found",
        data:checkIt,
    });
}








export const allDiscussions=async(req:Request,res:Response)=>{
    const user=(req as any).user;
    const name=user.name;
    const gmail=user.gmail;
    const checkIt=await discussModel.find({gmail});
    if(checkIt.length===0){
        return res.status(400).json({
            message:"no submission yet",
        });
    }
    return res.status(200).json({
        message:"successfully got",
        data:checkIt,
    });
}











export const getDiscussion=async(req:Request,res:Response)=>{
    const {title}=req.body;
    if(!title){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const user=(req as any).user;
    const userId=user.userId;
    const name=user.name;
    const gmail=user.gmail;
    const findIt=await discussModel.findOne({gmail:gmail,problemTitle:title}).sort({createdAt:-1});
    if(!findIt){
        return res.status(400).json({
            message:"no discussion of this question",
        });
    }
    return res.status(200).json({
        message:"successfull",
        data:{
            approach:findIt.approach,
        }
    })
}










export const allDiscussionsOfThisQuestion=async(req:Request,res:Response)=>{
const {title}=req.body;
if(!title){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const user=(req as any).user;
const userId=user.userId;
const name=user.name;
const gmail=user.gmail;
const checkIt=await discussModel.find({gmail:gmail,problemTitle:title});
if(checkIt.length===0){
    return res.status(400).json({
        message:"no previous discussion",
    });
}
return res.status(200).json({
    message:"successfull",
    data:checkIt,
});
}