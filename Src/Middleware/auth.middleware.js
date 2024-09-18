import { apiError } from "../Utils/ApiError.js";
import { asyncHandeler } from "../Utils/asyncHandel.js";
import jwt from "jsonwebtoken"
import { User } from "../Models/User.model.js";




export const varifyJWT=asyncHandeler(async(req,_,next)=>
    {
  try {
     const Token = req.cookies?.generateAccessToken || req.header("authrization")?.replace("Bearer","")
  
     if (!Token){
      throw new apiError(401,"Unauthrization req")
     }
    const decoded =  jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decoded._id).select("-password -refresshToken")
    if (!user){
      // todo discusion about frontend
      throw new apiError(401,"invald access token")
    }
  
  
    req.user=user;
    next()
  } catch (error) {
    throw new apiError(401,error?.message||"invalid access token ")
  }
}
)