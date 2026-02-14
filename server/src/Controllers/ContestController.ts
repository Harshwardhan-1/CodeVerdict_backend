import {Request,Response} from 'express';
import { contestModel } from "../models/ContestModel";
import { addQuestionModel } from '../models/AddQuestionModel';




export const addContest=async(req:Request,res:Response)=>{
    const {name,gmail,organizingDate,startingTime,endingTime,selectedQuestions,instructions}=req.body;
    if(!name || !gmail || !organizingDate || !startingTime || !endingTime || !selectedQuestions || !instructions){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    if(!selectedQuestions || selectedQuestions.length===0){
        return res.status(400).json({
            message:"select at least 1 question",
        });
    }   
    const todays=new Date();
    todays.setHours(0,0,0,0);
    const contestDate=new Date(organizingDate);
    contestDate.setHours(0,0,0,0);
    if(contestDate<todays){
        return res.status(400).json({
            message:"you cannot select previous date",
        });
    }
   const startDateTime = new Date(`${organizingDate}T${startingTime}`);
   const endDateTime = new Date(`${organizingDate}T${endingTime}`);
   if(endDateTime<=startDateTime){
    return res.status(400).json({
        message:"ending date must be greater than starting date",
    });
   }

   const today=new Date();
    const user=(req as any).user;
    const userId=user.userId;
    const namel=user.name;
    const gmaill=user.gmail;
    // if(name!== namel || gmail!== gmaill){
    //     return res.status(400).json({
    //         message:"your name and gmail dont match what you provided at the time of login",
    //     });
    // }
    const createIt=await contestModel.create({
        userId:userId,
        name,
        gmail,
        organizingDate:new Date(organizingDate),
        startingTimeOfContest:startDateTime,
        endingTimeOfContest:endDateTime,
        instructions,
        questions:selectedQuestions,
    });
    return res.status(200).json({
        message:"successfull",
        contestId:createIt._id,
        joinLink: `http://localhost:5173/join/${createIt._id}`,
        data:createIt,
    });
}








export const seeAllContest=async(req:Request,res:Response)=>{
const user=(req as any).user;
const userId=user.userId;
const gmail=user.gmail;
const findIt=await contestModel.find({gmail});
if(findIt.length===0){
    return res.status(400).json({
        message:"not found",
    });
}
return res.status(200).json({
    message:"got successfull",
    data:findIt,
});
}



export const deleteContest=async(req:Request,res:Response)=>{
const {id}=req.body;
if(!id){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const checkIt=await contestModel.findByIdAndDelete(id);
if(!checkIt){
    return res.status(400).json({
        message:"not found",
    });
}
return res.status(200).json({
    message:"succssfully deleted",
});
}







export const joinContest=async(req:Request,res:Response)=>{
    const {id}=req.body;
    if(!id){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const findIt=await contestModel.findById(id);
    if(!findIt){
        return res.status(400).json({
            message:"contest not found",
        });
    }
    const now=new Date();
    const startTime=new Date(findIt.startingTimeOfContest);
    const endTime=new Date(findIt.endingTimeOfContest);
    if (now.toDateString() !== startTime.toDateString() && now < startTime) {
    return res.status(400).json({
        message: "contest is scheduled for future date",
    });
}
    //here we checks both date and time
    if(now<startTime){
        return res.status(400).json({
            mesasge:"contest is not live now",
        });
    }
    if(now>endTime){
        return  res.status(400).json({
            message:"contest is expired",
        });
    }
    return res.status(200).json({
        message:"contest is live",
        data:findIt,
    });
}




export const showContestQuestion=async(req:Request,res:Response)=>{
const {questionsId}=req.body;
if(!questionsId){
    return res.status(400).json({
        message:"provide proper detail",
    });
}
const questions=await addQuestionModel.find({
    _id:{$in:questionsId}
});
return res.status(200).json({
    message:"got successfull",
    data:questions,
})
}