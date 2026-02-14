export const checkName=(data:{
    name:string,
})=>{
if(!data.name  || data.name.trim().length<3){
return{
    isValid:false,
    message:"name must be of 3 characters",
};
}
return{
isValid:true,
};
}