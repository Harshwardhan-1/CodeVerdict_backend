import {Request,Response} from 'express';
import { submitModel } from '../models/SubmissionModel';




export const allSubmission=async(req:Request,res:Response)=>{
    const user=(req as any).user;
    const userId=user.userId;
    const findIt=await submitModel.find({userId});
    if(findIt.length=== 0){
        return res.status(401).json({
            message:"no submission yet",
        });
    }
    return res.status(200).json({
        message:"this are the list of submission",
        data:findIt,
    });
}



export const allPoints=async(req:Request,res:Response)=>{
    const user=(req as any).user;
    const userId=user.userId;
    const checkIt=await submitModel.find({userId});
    if(checkIt.length=== 0){
        return res.status(403).json({
            message:"no submission yet",
        });
    }
    return res.status(200).json({
        message:"all points",
        data:checkIt,
    });
}

export const submitUserCode=async(req:Request,res:Response)=>{
const {title,description,userCode}=req.body;
if(!title || !description || !userCode){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const user=(req as any).user;
const userId=user.userId;
const findUser=await submitModel.findOne({userId,title});
if(!findUser){
    const createIt=await submitModel.create({
        userId,
        title,
        description,
        userCode,
        date:Date.now(),
        points:10,
        count:1, 
    });
    return res.status(200).json({
        message:"successfully submitted",
        data:createIt,
    });
}else if(findUser.count>=3){
    return res.status(401).json({
        message:"try some other question you have alredy solved it 3 times",
    });
}
else {
    findUser.points+=10,
    findUser.count+=1,
    await findUser.save();
}
return res.status(200).json({
    message:"successfully submitted",
    data:findUser,
});
}