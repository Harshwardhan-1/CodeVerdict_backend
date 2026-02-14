import {Request,Response} from 'express';
import { hiddenTestCaseModel } from '../models/AddHiddenTestCaseModel';


export const showAllHidden=async(req:Request,res:Response)=>{
const allHidden=await hiddenTestCaseModel.find();
return res.status(200).json({
    message:"this are all the hidden test cases",
    data:allHidden,
});
}


export const addHiddenTest=async(req:Request,res:Response)=>{
const {title,sampleInput,sampleOutput}=req.body;
if(!title || !sampleInput || !sampleOutput){
    return res.status(401).json({
        message:"provide proper details",
    });
}
const inputStr=sampleInput.trim();
const outputStr=sampleOutput.trim();
const checkIt=await hiddenTestCaseModel.findOne({title,sampleInput:inputStr,sampleOutput:outputStr});
if(checkIt){
    return res.status(401).json({
        message:"you already add same sampleInput and sampleOutput for same question",
    });
}
const user=(req as any).user;
const userId=user.userId;
const createTestCase=await hiddenTestCaseModel.create({
    userId:userId,
    title,
    sampleInput:inputStr,
    sampleOutput:outputStr,
});
return res.status(200).json({
    message:"succesfully added",
    data:createTestCase,
});
}