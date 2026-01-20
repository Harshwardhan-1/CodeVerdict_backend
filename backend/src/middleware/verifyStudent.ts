import {Request,Response,NextFunction} from 'express';
const verifyStudent=async(req:Request,res:Response,next:NextFunction)=>{
    const user=(req as any).user;
    if(!user || user.role!== 'STUDENT'){
        return res.status(403).json({
            message:"Access Denied",
        });
    }
    next();
}

export default verifyStudent;