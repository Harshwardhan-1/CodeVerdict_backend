export const discussApproach=(data:{
    approach:string,
})=>{
if(!data.approach || data.approach.trim().length<=10){
    return{
        isValid:false,
        message:"approach must be atleast of 10 characters",
    };
}
return{
    isValid:true,
};
}