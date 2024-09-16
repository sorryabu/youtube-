import { asyncHandeler } from "../Utils/asyncHandel.js" 
import {apiError} from "../Utils/ApiError.js"
import {User} from "../Models/User.model.js";
import {uplodOnCludinary} from "../Utils/Cloudnairy.js"
import { apiResponse } from "../Utils/ApiResponse.js";
  
const userregister = asyncHandeler(async (req , res)=>{
     
   //  get user detail form forntend
   // validation - no empty
   //  alreday exist : username / email
   //  check images  / check avtar
   // uplod them clodnary, avtar
   //  crate user obj- create in db call
   //  remove paassword and fresh token field
   //  check for user create
   //  retrun response

  const {username,email,fulname,password}=  req.body

  // console.log("email:",email);

  // if (fulname ===""){
  //  throw new apiError(400 ," fulname is required") 
  // }

 if (
   [username,email,fulname,password].some((field)=>(
     field?.trim()===""
   ))
 ){
   throw new apiError(400, "all field sre requird ")
 }

  const existedUser = await User.findOne({
   $or:[{email},{password}]
 })
 if (existedUser){
   throw new apiError(409, "user already exist")
 }


 const  avtarlocalPath = req.files?. avtar[0]?.path;
//  const coverimglocalPath = req.files?. avtar[0]?.path;
let coverimglocalpath;
if(req.files &&Array.isArray(req.files.coverimg)&&req.files.coverimg.length>0){
 coverimglocalpath = req.files.coverimg[0].path
}


 if(!avtarlocalPath){
   throw new apiError(400 ,"avtarlocalpath is required")
  
 }

 const avtar = await uplodOnCludinary(avtarlocalPath)
 const coverimg = await uplodOnCludinary(coverimglocalPath)
 
 if(!avtar){
   throw new apiError(400 ,"avtar is required")
 }

 const user = await User.create({
   fulname,
   avtar:avtar.url,
   coverimg:coverimg?.url||"",
   email,
   password,
   username:username.toLowerCase()
 })
  const createUser = await User.findById(user._Id).select(
   "-password -refresshToken"
  )
  if(!createUser){
   throw new apiError(500,"somthing went wrong  while registring the user ")
  }

 return res.status(201).json(
    new   apiResponse(200,createUser,"user register successfully")
)
})

export {userregister}