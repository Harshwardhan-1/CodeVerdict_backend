import express  , {Request , Response} from "express";
import cors from 'cors';
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))


const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
export const io=new Server(server,{
  cors:{
    origin:'http://localhost:5173',
    credentials:true,
  },
}); 
 
import addUserRoutes from "./Routes/userRoutes";
import addQuestionRoutes from "./Routes/AddQuestionRoutes";
import hiddenTestRoutes from "./Routes/AddHiddenTestCaseRoutes";
import runCodeRoutes from "./Routes/RunCodeRoutes";
import submitCodeRoutes from "./Routes/SubmissionRoutes";
import discussSolutionRoutes from "./Routes/DiscussRoutes";
import contestRouter from "./Routes/ContestRoute";
import codeVerdictRouter from "./Routes/CodeVerdictRoutes";
import analyzeComplexityRoutes from "./Routes/AnalyzeComplexityRoutes";
import makeProfileRoutes from "./Routes/EditProfileRoutes";
import batchRoutes from "./Routes/BatchRoutes";
app.get("/"  , (req : Request, res : Response)=>{
  res.send("hii harsh here")
})
mongoose.connect(process.env.MONGO_URL!)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.use('/uploads',express.static("uploads"));
app.use('/Batchuploads',express.static("Batchuploads"));

app.use('/add/new',addUserRoutes);
app.use('/api/newQuestion',addQuestionRoutes);
app.use('/api/hidden',hiddenTestRoutes);
app.use('/api/run',runCodeRoutes);
app.use('/api/submit',submitCodeRoutes);
app.use('/api/discuss',discussSolutionRoutes);
app.use('/api/contest',contestRouter);  
app.use('/api/verdict',codeVerdictRouter);
app.use('/api/analyze',analyzeComplexityRoutes);
app.use('/api/profile',makeProfileRoutes);
app.use('/api/batch',batchRoutes);
 

app.get('/ping',(req:Request,res:Response)=>{
  res.send("alive");
})
// const PORT=5000;
// app.listen(PORT,()=>{
//   console.log(`Server is listening to http://localhost:${PORT}`);
// })
export default app;