import mongoose from 'mongoose';
const editProfileSchema=new mongoose.Schema({
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
    gender:{
        type:String,
    },
    profilePhoto:{
        type:String,
    },
    dateOfBirth:{
        type:Date,
    },
    githubLink:{
        type:String,
    },
    linkedinLink:{
        type:String,
    },
})




export const profileModel=mongoose.model('editProfile',editProfileSchema);