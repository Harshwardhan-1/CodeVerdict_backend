import {Request,Response} from 'express';
import { submitModel } from '../models/SubmissionModel';
import { addQuestionModel } from '../models/AddQuestionModel';
import { activeDaysModel } from '../models/ActiveDaysModel';
import { batchModel } from '../models/BatchModel';

export const allSubmission=async(req:Request,res:Response)=>{
    const user=(req as any).user;
    const userId=user.userId;
    const findIt=await submitModel.find({userId}).sort({createAt:-1});
    const map = new Map();
  for (const item of findIt) {
    if (!map.has(item.title)) {
      map.set(item.title, item);
    }
  }

  const latestOnly = Array.from(map.values());
    if(findIt.length=== 0){
        return res.status(401).json({
            message:"no submission yet",
        });
    }
    return res.status(200).json({
        message:"this are the list of submission",
        data:latestOnly,
    });
}






export const allPoints=async(req:Request,res:Response)=>{
    const user=(req as any).user;
    const userId=user.userId;
    const gmail=user.gmail;
    const checkIt=await submitModel.find({gmail});
    if(checkIt.length===0){
        return res.status(400).json({
            message:"no submission yet",
        });
    }
    const pointsSet=new Set<string>();
    const allPoints: { title: string, points: string }[] = [];
    let totalPoints=0;
    for(let i=0;i<checkIt.length;i++){
        const questionTitle=checkIt[i].title;
        const points=checkIt[i].points;
        if(!pointsSet.has(questionTitle)){
            pointsSet.add(questionTitle);
        allPoints.push({title:questionTitle,points: points.toString() });
        totalPoints += Number(points);
        }
    }
    return res.status(200).json({
        message:"successfull",
        data:allPoints,
        totalPoints:totalPoints,
    })
}




export const submitUserCode=async(req:Request,res:Response)=>{
const {title,description,userCode,difficulty,topic,language}=req.body;
if(!title || !description || !userCode || !difficulty || !topic || !language){
    return res.status(401).json({
        message:"provide proper detail",
    });
}
const user=(req as any).user;
const name=user.name;
const userId=user.userId;
const gmail=user.gmail;
const checkIt=await addQuestionModel.findOne({title});
if(!checkIt){
    return res.status(400).json({
        message:"something went wrong",
    });
}
const questionPoints=checkIt.points;
    const createIt=await submitModel.create({
        userId,
        gmail,
        title,
        description,
        userCode,
        date:Date.now(),
        points:questionPoints,
        count:1, 
        difficulty,
        topic,
        language,
    });
    const today=new Date();
    today.setHours(0,0,0,0);
    const findIt=await activeDaysModel.findOne({gmail,date:today});
    if(!findIt){
        await activeDaysModel.create({
            name,
            gmail,
            count:1,
            date:today,
        });
    }
    return res.status(200).json({
        message:"successfully submitted",
        data:createIt,
    });
}










                                                                                         




export const activeDays=async(req:Request,res:Response)=>{
const user=(req as any).user;
const userId=user.userId;
const name=user.name;
const gmail=user.gmail;
const findIt=await activeDaysModel.find({gmail});
if(findIt.length===0){
    return res.status(400).json({
        message:"no active days",
    });
}
let sum=0;
for(let i=0;i<findIt.length;i++){
    sum+=findIt[i].count;
}
//check here for batch if greater insert current batch and then at frontend use useEffect so it will 
//be easier to search check for duplicates also
let newBatchAlert: string | null = null;

if(sum>=1){
    const checkIt=await batchModel.findOne({gmail:gmail,batchNumber:1});
    if(!checkIt){
        await batchModel.create({
            name,
            gmail,
            batchNumber:1,
            imageBatch:"batch1.jpg",
        });
            newBatchAlert = "Congratulations! You completed Batch 1!";
    }
}
if(sum>=2){
    const checkIt=await batchModel.findOne({gmail:gmail,batchNumber:2});
    if(!checkIt){
        await batchModel.create({
            name,
            gmail,
            batchNumber:2,
            imageBatch:"batch2.jpg",
        });
            newBatchAlert = "Congratulations! You completed Batch 2!";
    }
}

return res.status(200).json({
    message:"successfull",
    data:{
        gmail:gmail,
        totalactiveDays:sum,
        alert:newBatchAlert,
    }
})
}



export const getBatchCount=async(req:Request,res:Response)=>{
const user=(req as any).user;
const gmail=user.gmail;
const checkIt=await batchModel.find({gmail});
let count=0;
for(let i=0;i<checkIt.length;i++){
count+=1;
}
return res.status(200).json({
    message:"successfull",
    data:{
        totalBatches:count,
    }
})
}


export const activeDaysBatch=async(req:Request,res:Response)=>{
const user=(req as any).user;
const gmail=user.gmail;
const checkIt=await batchModel.find({gmail});
if(checkIt.length===0){
    return res.status(400).json({
        message:"no batches",
    });
}
return res.status(200).json({
    message:"successfull",
    data:checkIt,
});
}
 


export const checkStreak=async(req:Request,res:Response)=>{
const user=(req as any).user;
const userId=user.userId;
const name=user.name;
const gmail=user.gmail;
const checkIt=await activeDaysModel.find({gmail}).sort({date:1});
if(checkIt.length===0){
    return res.status(400).json({
        message:"no active days",
    });
}
let currentStreak=0;
let maxStreak=0;
let prevDate:Date | null=null;
for(let i=0;i<checkIt.length;i++){
const date=new Date(checkIt[i].date);
date.setHours(0,0,0,0);
if(!prevDate){
    currentStreak=1;
}else{
  const diff=(date.getTime()-prevDate.getTime())/(1000*60*60*24);
      if(diff==1){
        currentStreak+=1;
    }else{
        currentStreak=1;
    }
}
if(currentStreak>maxStreak){
    maxStreak=currentStreak;
}
prevDate=date;
}
return res.status(200).json({
    message:"successfull",
    data:{
        maxStreak:maxStreak,
    }
})
}







export const checkSubmit=async(req:Request,res:Response)=>{
    const {title}=req.body;
    if(!title){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const user=(req as any).user;
    const name=user.name;
    const gmail=user.gmail;
    const checkIt=await submitModel.findOne({gmail,title}).sort({createdAt:-1});
    if(checkIt){
        return res.status(200).json({
            message:"successfull",
            data:{
                alreadySubmit:"solved",
                userCode:checkIt.userCode,
                language:checkIt.language,
            },
        });
    }
}





export const getSolution=async(req:Request,res:Response)=>{
try{
     const user=(req as any).user;
    const gmail=user.gmail;
    const {language,title}=req.body;
    if(!language || !title){
        return res.status(400).json({
            message:"language and title missing",
        });
    }
    const checkIt=await submitModel.findOne({language,title,gmail}).sort({createdAt:-1});
    if(checkIt){
        return res.status(200).json({
            message:"successfull",
            data:{
                language:language,
                userCode:checkIt.userCode,
                alreadySubmit:"solved",
            }
        });
    }else{
        return res.status(400).json({
            message:"not found",
        });
    }
}catch(err){
    return res.status(500).json({
        message:"internal server error",
    });
}
}












export const submission=async(req:Request,res:Response)=>{
    const {title}=req.body;
    if(!title){
        return res.status(400).json({
            message:"provide proper detail",
        });
    }
    const user=(req as any).user;
    const gmail=user.gmail;
    const checkIt=await submitModel.find({gmail,title});
    if(checkIt.length===0){
        return res.status(400).json({
            message:"no submission yet",
        });
    }
    return res.status(200).json({
        message:"successfull",
        data:checkIt,
    });
}














export const heatMap=async(req:Request,res:Response) => {
  try {
    const user=(req as any).user;
    const gmail=user.gmail;
    const year=Number(req.query.year); 
    const start=new Date(`${year}-01-01`);
    const end=new Date(`${year}-12-31T23:59:59.999`);
    const data=await submitModel.aggregate([
      { $match:{gmail: gmail, createdAt: { $gte: start, $lte: end }}},
      {
        $group:{_id: {$dateToString: { format: "%Y-%m-%d",date:"$createdAt"}},count:{$sum:1}}
      },
      {
        $project:{ _id:0,date: "$_id",count: 1}
      },
      {
        $sort:{date:1}
      }
    ]);

    res.status(200).json({
      message:"success",
      data
    });
  } catch (err) {
    res.status(500).json({ message:"something went wrong"});
  }
};



















export const checkLanguage=async(req:Request,res:Response)=>{
     const user=(req as any).user;
     const name=user.name;
     const gmail=user.gmail;
     const checkIt=await submitModel.find({gmail});
     if(checkIt.length===0){
        return res.status(400).json({
            message:"no submission",
        });
    }
    const languageCplusplusset=new Set<String>();
    const javaset=new Set<String>();
    const pythonset=new Set<String>();
    for(let i=0;i<checkIt.length;i++){
        const title=checkIt[i].title;
        const language=checkIt[i].language;
        if(language=== 'C++'){
            if(!languageCplusplusset.has(title)){
                languageCplusplusset.add(title);
            }
        }else if(language=== 'java'){
            if(!javaset.has(title)){
                javaset.add(title);
            }
        }else if(language=== 'python'){
            if(!pythonset.has(title)){
                pythonset.add(title);
            }
        }
    }
    return res.status(200).json({
        message:"successfull",
        data:{
            languageCplusplus:languageCplusplusset.size,
            java:javaset.size,
            python:pythonset.size,
        }
    });
}