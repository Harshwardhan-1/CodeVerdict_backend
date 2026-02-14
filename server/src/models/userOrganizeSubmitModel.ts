import mongoose from 'mongoose';
const organizeSubmitSchema=new mongoose.Schema({
        userId:{
            type:String,
            required:true,
        },
        contestId:{
        type:String,
        required:true,
    },
        name:{
            type:String,
            required:true,
        },
        gmail:{
            type:String,
            required:true,
        },
        startingTime:{
            type:Date,
            required:true,
        },
        endingTime:{
            type:Date,
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
        points:{
            type:Number,
            required:true,
        },
})



export const organizeSubmitModel=mongoose.model('oranizeSubmit',organizeSubmitSchema);