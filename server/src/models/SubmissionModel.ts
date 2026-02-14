import mongoose from "mongoose";
const submitSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    gmail:{
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
    },
    difficulty:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
},
{
    timestamps:true,
}
)


export const submitModel=mongoose.model('submit',submitSchema);