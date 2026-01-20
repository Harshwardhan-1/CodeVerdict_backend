import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
const token=req.cookies?.token;
if(!token){
    return res.status(401).json({
        message:"Access Denied",
    });
}
const data=jwt.verify(token,process.env.JWT_SECRET!);
(req as any).user=data;
next();
}

export default verifyToken;