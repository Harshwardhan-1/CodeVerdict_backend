import mongoose from 'mongoose';
export const activeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gmail:{
        type:String,
        required:true,
    },
    count:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
},{
    timestamps:true,
})





export const activeDaysModel=mongoose.model('activeDays',activeSchema);