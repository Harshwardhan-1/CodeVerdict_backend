import {Request,Response} from 'express';
import { addQuestionModel } from '../models/AddQuestionModel';

export const allQuestion=async(req:Request,res:Response)=>{
const allQuestions=await addQuestionModel.find();
return res.status(200).json({
    message:"this are all the question",
    data:allQuestions,
})
}


export const getAllQuestion=async(req:Request,res:Response)=>{
    const getAllQues=await addQuestionModel.find();
    return res.status(200).json({
        message:"all question",
        data:getAllQues,
    });
}







export const addQuestion=async(req:Request,res:Response)=>{
const {title,description,constraint,sampleInput,sampleOutput,difficulty,topic}=req.body;
if(!title || !description || !constraint || !sampleInput || !sampleOutput || !difficulty || !topic){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const checkIt=await addQuestionModel.findOne({title});
if(checkIt){
    return res.status(401).json({
        message:"already have sameInput sameOutput for same question",
    });
}
const user=(req as any).user;
const userId=user.userId;
const createQuestion=await addQuestionModel.create({
userId:userId,
title,
description,
constraint,
sampleInput,
sampleOutput,
difficulty,
topic,
});
return res.status(200).json({
    message:"question created successfully",
    data:createQuestion,
});
}