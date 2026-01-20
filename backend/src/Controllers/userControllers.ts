import {Request,Response} from 'express';
import { userModel } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkName } from '../utils/checkName';



export const allUser=async(req:Request,res:Response)=>{
const allUsers=await userModel.find();
if(allUsers.length=== 0){
    return res.status(403).json({
        message:"Not have any users yet",
    });
}
return res.status(200).json({
    message:"this are the users",
    data:allUsers,
});
}


export const addNewUser=async(req:Request,res:Response)=>{
const {name,gmail,password}=req.body;
if(!name || !gmail || !password){
    return res.status(401).json({
        message:"fill form properly",
    });
}
const checkNa=checkName({name});
if(!checkNa.isValid){
    return res.status(403).json({
        message:"name must be of 3 characters",
    });
}
const checkIt=await userModel.findOne({gmail});
if(checkIt){
    return res.status(401).json({
        message:"gmail already exist",
    });
}
bcrypt.genSalt(12, function(err, salt) {
    bcrypt.hash(password, salt,async function(err, hash) {
        const createUser=await userModel.create({
            name,
            gmail,
            password:hash,
            role:"STUDENT",
        });
        let token=jwt.sign({name:name,gmail:gmail,userId:createUser._id,role:createUser.role},process.env.JWT_SECRET!);
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
        });
        return res.status(200).json({
            message:"succesfully created",
            data:createUser,
        })
    });
});
}





export const checkUser=async(req:Request,res:Response)=>{
const {gmail,password}=req.body;
if(!gmail || ! password){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const oldUser=await userModel.findOne({gmail});
if(!oldUser){
    return res.status(403).json({
        message:"gmail not found",
    });
}

bcrypt.compare(password, oldUser.password, function(err, result) {
    if(!result){
        return res.status(401).json({
            message:"something went wrong",
        });
    }
    let token=jwt.sign({name:oldUser.name,gmail:oldUser.gmail,userId:oldUser._id,role:oldUser.role},process.env.JWT_SECRET!);
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
    });
    return res.status(200).json({
        message:"login successfully",
        data:oldUser,
    });
});
}