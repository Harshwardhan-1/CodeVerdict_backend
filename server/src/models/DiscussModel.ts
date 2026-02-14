import mongoose from 'mongoose';
const discussSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    problemTitle:{
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
    userCode:{
        type:String,
        required:true,
    },
    approach:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
},{
    timestamps:true,
})


export const discussModel=mongoose.model("discuss",discussSchema);