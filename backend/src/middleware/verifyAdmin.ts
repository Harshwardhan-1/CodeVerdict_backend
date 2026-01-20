import {Request,Response,NextFunction} from 'express';
const verifyAdmin=async(req:Request,res:Response,next:NextFunction)=>{
const user=(req as any).user;
if(!user || user.role!== 'ADMIN'){
    return res.status(403).json({
        message:"Access Denied",
    });
}
next();
}

export default verifyAdmin;