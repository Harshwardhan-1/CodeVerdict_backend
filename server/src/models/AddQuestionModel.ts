import mongoose from 'mongoose';
const addQuestionSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"user",
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
    constraint:{
        type:String,
        required:true,
    },
    sampleInput:{
        type:String,
        required:true,
    },
    sampleOutput:{
        type:String,
        required:true,
    },
    points:{
        type:Number,
        required:true,
    },
    difficulty:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
        required:true,
    },
})

export const addQuestionModel=mongoose.model("addQuestion",addQuestionSchema);