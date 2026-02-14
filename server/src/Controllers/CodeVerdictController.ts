import {Request,Response} from 'express';
import { userModel } from '../models/userModel';
import { adminAddContestModel } from '../models/CodeVerdictModel';
import { codeVerdictContestModel } from '../models/CodeVerdictContestModel';


export const allCodeVerdictContest=async(req:Request,res:Response)=>{
    const checkIt=await adminAddContestModel.find();
    if(checkIt.length===0){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    return res.status(200).json({
        message:"successfull",
        data:checkIt,
    });
}



export const showAllContest=async(req:Request,res:Response)=>{
const findIt=await adminAddContestModel.find();
if(findIt.length===0){
    return res.status(400).json({
        message:"not have any contest to show",
    });
}
return res.status(200).json({
    message:"successfull",
    data:findIt,
});
}



export const codeVerdictContest=async(req:Request,res:Response)=>{
    const user=(req as any).user;
    const name=user.name;
    const gmail=user.gmail;
    if(!name || !gmail){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const checkIt=await userModel.findOne({gmail});
    if(!checkIt){
        return res.status(400).json({
            message:"gmail not found do sign up first",
        });
    }
    const findIt=await codeVerdictContestModel.find();
    if(findIt.length===0){
        return res.status(400).json({
            message:"contest will be added shortly check after some time",
        })
    }
    return res.status(200).json({
        message:"successfull",
        data:checkIt,
    });
}




export const adminAddVerdictContest=async(req:Request,res:Response)=>{
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
    const createIt=await adminAddContestModel.create({
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












export const joinCodeVerdictContest=async(req:Request,res:Response) => {
  const {contestId}=req.params;
  const contest=await adminAddContestModel.findById(contestId);
  if (!contest) {
    return res.status(404).json({
      message:"contest not found",
    });
  }
  const now=new Date();
  if (now<contest.startingTimeOfContest || now>contest.endingTimeOfContest){
    return res.status(400).json({
      message: "contest is not live",
    });
  }
  return res.status(200).json({
    message:"contest is live",
    data:contest,
  });
};




export const deleteVerdictContest=async(req:Request,res:Response)=>{
    const {id}=req.body;
    if(!id){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const checkIt=await adminAddContestModel.findByIdAndDelete(id);
    if(!checkIt){
        return res.status(400).json({
            message:"not found",
        });
    }
    return res.status(200).json({
        message:"successfully deleted",
    });
}