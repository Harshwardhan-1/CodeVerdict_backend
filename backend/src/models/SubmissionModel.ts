import mongoose from "mongoose";
const submitSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    userCode:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    points:{
        type:Number,
        required:true,
    },
    count:{
        type:Number,
        required:true,
    }
})


export const submitModel=mongoose.model('submit',submitSchema);