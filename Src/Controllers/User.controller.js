import { asyncHandeler } from "../Utils/asyncHandel.js" 
import {apiError} from "../Utils/ApiError.js"
import {User} from "../Models/User.model.js";
import {uplodOnCludinary} from "../Utils/Cloudnairy.js"
import { apiResponse } from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefresshToken= async(userId)=>{
  try {
    const user= await User.findOne(userId)
    const generateAccessToken=   user.GenerateAccessToken()
    const generateRefresshToken=user.GenerateRefreshToken()
    user.generateRefresshToken=generateRefresshToken
    await user.save({validateBeforeSave: false})

   return {generateAccessToken,generateRefresshToken}

  } catch (error) {
    throw new apiError(500,"somethin wnr wrong while generating refresh or access token")
  }
}
  
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

const userlogin = asyncHandeler(async (req , res)=>{
//  req body > = data 
//  username or email
//   find the user 
// password check 
//   access and refresh token
//  send cookies



const {username,email,password}= req.body
 
     if (!(username || email)){
      throw new apiError(400,'user or password is required')
     }

  const user = User.findOne({
      $or:[{username},{email}]
})

 if (!user){
  throw new apiError(404,"user not found")
 }

  const ispasswordvalid = await user.isPasswordCorrect(password)
  if (!ispasswordvalid){
    throw new apiError(404,"password is incorrect ")
   }

   const {generateAccessToken,generateRefresshToken} = await generateAccessAndRefresshToken(user._Id)



   const loginuser= await  User.findById(user._Id).select("-password -refresshToken")

   const options={
    httpOnly:true,
    secure: true
   }
   return res
   .status(200)
   .cookie("generateAccessToken",generateAccessToken,options)
   .cookie("generateRefresshToken",generateRefresshToken,options)
   .json(
    new apiResponse(
      200,{
        user: loginuser,generateAccessToken,generateRefresshToken

      },
      "user login succesfully"
    )
   )

  })

   const userlogout = asyncHandeler(async (req , res)=>{
    await User.findByIdAndUpdate(
      req.user._Id,
      {
        $set:{
          refresshToken:undefined
        }
       
      },
      {
        new: true
      }
    )


    const options={
      httpOnly:true,
      secure: true
     }

 return res.status(200)
 .clearcookie("generateAccessToken",options)
 .clearcookie("generateRefresshToken",options)
 .json(
   new apiResponse(
      200,{},"user logout"
    )
 )
  

})

const  RefreshAccessToken = asyncHandeler(async(req,res)=>{

const incomingRefresToken =  req.cookie.refresshToken || req.body.refresshToken

if(!incomingRefresToken){
   throw new apiError(401,"unauthrix req")
}

try {
  const decodedToken = jwt.verify(
    incomingRefresToken,
    process.env.REFRESH_TOKEN_SECRET
  )
  
    const user =  await User.findById(decodedToken?._Id)
  
    if(!user){
      throw new apiError(401,"invalid refresh token ")
   }
  
  if (incomingRefresToken !== user?.refresshToken){
    throw new apiError(401," refresh token is expire ")
  } 
  
  const options ={
    httpOnly:true,
    secure:true,
  
  }
    const {generateAccessToken,generateRefresshToken} = await generateAccessAndRefresshToken(user._Id)
   return res
   .status(200)
   .cookie("accestoken",generateAccessToken,options)
   .cookie("refreshtoken",generateRefresshToken,options)
   .json(
    new apiResponse(
      200,
      {generateAccessToken,generateRefresshToken },
      "accesstoken or refresh token "
    )
   )
} catch (error) {
  throw new apiError(401, error?.mesage|| "invalid  refresh token ")
}
})

export {
  userregister,
  userlogin,
  userlogout,
  RefreshAccessToken
}