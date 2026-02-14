import mongoose from 'mongoose';
const contestSchema=new mongoose.Schema({
    userId:{
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
    organizingDate:{
        type:Date,
        required:true,
    },
    startingTimeOfContest:{
        type:Date,
        required:true,
    },
    endingTimeOfContest:{
        type:Date,
        required:true,
    },
    instructions:{
        type:String,
        required:true,
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"question",
    }],
});



export const contestModel=mongoose.model("contest",contestSchema);