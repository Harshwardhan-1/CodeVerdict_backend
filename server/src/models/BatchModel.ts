import mongoose from 'mongoose';
const allotBatchesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gmail:{
        type:String,
        required:true,
    },
    batchNumber:{
        type:Number,
        required:true,
    },
    imageBatch:{
        type:String,
        required:true,
    },
});



export const batchModel=mongoose.model('allotedBatch',allotBatchesSchema);