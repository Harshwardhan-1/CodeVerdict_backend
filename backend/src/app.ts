import express  , {Request , Response} from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}))


import addUserRoutes from "./Routes/userRoutes";
import addQuestionRoutes from "./Routes/AddQuestionRoutes";
import hiddenTestRoutes from "./Routes/AddHiddenTestCaseRoutes";
import runCodeRoutes from "./Routes/RunCodeRoutes";
import submitCodeRoutes from "./Routes/SubmissionRoutes";
import { request } from "http";
app.get("/"  , (req : Request, res : Response)=>{
  res.send("hii harsh here")
})
mongoose.connect(process.env.MONGO_URL!)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.use('/add/new',addUserRoutes);
app.use('/api/newQuestion',addQuestionRoutes);
app.use('/api/hidden',hiddenTestRoutes);
app.use('/api/run',runCodeRoutes);
app.use('/api/submit',submitCodeRoutes);

app.get('/ping',(req:Request,res:Response)=>{
  res.send("alive");
})
const PORT=5000;
app.listen(PORT,()=>{
  console.log(`Server is listening to http://localhost:${PORT}`);
})
export default app;