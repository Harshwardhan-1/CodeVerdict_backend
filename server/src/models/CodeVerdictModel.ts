import mongoose from 'mongoose';
import { stringFormat, treeifyError } from 'zod';
const verdictContestSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
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
        required:true,
    }],
});


export const  adminAddContestModel=mongoose.model('adminAddContest',verdictContestSchema);