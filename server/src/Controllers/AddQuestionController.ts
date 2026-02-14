import {Request,Response} from 'express';
import { addQuestionModel } from '../models/AddQuestionModel';
import { submitModel } from '../models/SubmissionModel';

export const allQuestion=async(req:Request,res:Response)=>{
const allQuestions=await addQuestionModel.find();
if(allQuestions.length===0){
    return res.status(400).json({
        message:"admin has not yet add yet question",
    });
}
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
const {title,description,constraint,sampleInput,sampleOutput,difficulty,topic,points}=req.body;
if(!title || !description || !constraint || !sampleInput || !sampleOutput || !difficulty || !topic || !points){
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
points,
difficulty,
topic,
});
return res.status(200).json({
    message:"question created successfully",
    data:createQuestion,
});
}





export const selectedQuestion=async(req:Request,res:Response)=>{
const {chooseTopic}=req.body;
if(!chooseTopic){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const showIt=await addQuestionModel.find({topic:{$regex: chooseTopic, $options: "i"}});
if(showIt.length===0){
    return res.status(400).json({
        message:"admin has not yet question on this topic",
    });
}
return res.status(200).json({
    message:"successfull",
    data:showIt,
})
}




export const getAllAdminQuestion=async(req:Request,res:Response)=>{
    const findIt=await addQuestionModel.find();
    if(findIt.length===0){
        return res.status(400).json({
            message:"no question to show",
        });
    }
    return res.status(200).json({
        message:"successfull",
        data:findIt,
    })   
}







export const deleteQuestion=async(req:Request,res:Response)=>{
    const {id}=req.body;
    if(!id){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const checkIt=await addQuestionModel.findByIdAndDelete(id);
    if(!checkIt){
        return res.status(400).json({
            message:"question not found",
        });
    }
    return res.status(200).json({
        message:"delete successfull",
        data:checkIt,
    });
}




export const updateQuestion=async(req:Request,res:Response)=>{
    const {id,title,description,constraint,sampleInput,sampleOutput,difficulty,topic,points}=req.body;
    if(!id || !title || !description || !constraint || !sampleInput || !sampleOutput || !difficulty || !topic || !points){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const checkIt=await addQuestionModel.findByIdAndUpdate(id,{title,description,constraint,sampleInput,sampleOutput,difficulty,topic,points},{new:true});
    if(!checkIt){
        return res.status(400).json({
            message:"question not found",
        });
    }
    return res.status(200).json({
        message:"successfull",
        data:checkIt,
    });
}












export const getQuestionCount=async(req:Request,res:Response)=>{
const user=(req as any).user;
const userId=user.userId;
const gmail=user.gmail;
const findIt=await submitModel.find({gmail});
const solvedEasySet=new Set<string>();
const solvedMediumSet=new Set<string>();
const solvedHardSet=new Set<string>();
    const checkIt=await addQuestionModel.find();
    let count=0;
    let easy=0;
    let medium=0;
    let hard=0;
    for(let i=0;i<checkIt.length;i++){
        if(checkIt[i].difficulty=== "Easy"){
            easy++;
        }else if(checkIt[i].difficulty==="Medium"){
            medium++;
        }else if(checkIt[i].difficulty=== 'hard'){
            hard++;
        }
        count++;
    }
if(findIt){
    for(let i=0;i<findIt.length;i++){
        const questionTitle=findIt[i].title;
        const difficulty=findIt[i].difficulty;
        if(difficulty=== "Easy"){
            solvedEasySet.add(questionTitle);
        }else if(difficulty=== 'Medium'){
            solvedMediumSet.add(questionTitle);
        }else if(difficulty=== 'hard'){
            solvedHardSet.add(questionTitle);
        }
    }
}
    const solvedEasy=solvedEasySet.size;
    const solvedMedium=solvedMediumSet.size;
    const solvedHard=solvedHardSet.size;
    const solvedCount=solvedEasy+solvedMedium+solvedHard;
    return res.status(200).json({
        message:"successfull",
        data:{
             totalQuestion:count,
            totalEasyQuestion:easy,
            totalMediumQuestion:medium,
            totalHardQuestion:hard,
            totalSolvedEasyQuestion:solvedEasy,
            totalSolvedMediumQuestion:solvedMedium,
            totalSolvedHardQuestion:solvedHard,
            totalSolvedCount:solvedCount,
        }
    })
}