import mongoose from 'mongoose';
const hiddenTestCaseSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    sampleInput:{
        type:String,
        required:true,
    },
    sampleOutput:{
        type:String,
        required:String,
    },
})

export const hiddenTestCaseModel=mongoose.model('hiddentestCase',hiddenTestCaseSchema);