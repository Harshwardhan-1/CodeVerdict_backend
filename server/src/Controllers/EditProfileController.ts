import {Request,Response} from 'express';
import { profileModel} from '../models/EditProfileModel';



export const makeProfile=async(req:Request,res:Response)=>{
const {gender,dateOfBirth,githubLink,linkedinLink}=req.body;
const profilePhoto=req.file?.filename;
const user=(req as any).user;
const userId=user.userId;
const name=user.name;
const gmail=user.gmail;

const checkIt=await profileModel.findOne({gmail});
if(checkIt){
    checkIt.gender=gender;
    checkIt.dateOfBirth=dateOfBirth;
    checkIt.githubLink=githubLink;
    checkIt.linkedinLink=linkedinLink;
    if(profilePhoto){
        checkIt.profilePhoto=profilePhoto;
    }
    await checkIt.save();
    return res.status(200).json({
        message:"update successfull",
        data:checkIt,
    });
}

const createIt=await profileModel.create({
    userId,
    name,
    gmail,
    gender,
    profilePhoto,
    dateOfBirth,
    githubLink,
    linkedinLink,
});
return res.status(200).json({
    message:"successfull",
    data:createIt,
});
}







export const showProfile=async(req:Request,res:Response)=>{
const user=(req as any).user;
const gmail=user.gmail;
const checkIt=await profileModel.findOne({gmail});
if(checkIt){
    return res.status(200).json({
        message:"successfull",
        data:checkIt,
    })
}
}