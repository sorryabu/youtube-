
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const UserSchema = new Schema(
    {
  username:{
     type:string,
     required: true,
     unique:true,
     lowercase:true,
     trim:true,
     index: true
  },
  email:{
    type:string,
     required: true,
     unique:true,
     lowercase:true,
     trim:true,
  },
  fulname:{
    type:string,
     required: true,
     trim:true,
  },
  avtar:{
    type:string, // cloundanry url
     required: true,
    
  },
 coverimg:{
     type:string,
  },
  watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref: "Video"
  }
],
password:{
     type: string ,
     required: true
},
refresshToken:{
  type : string ,
}    
},
{
    timestamps: true
}
)
 
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})
UserSchema.methods.isPasswordCorrect = async function (password) {
  return  await   bcrypt.compare(password,this.password)
}
UserSchema.methods.GenerateAccessToken= function(){
  return jwt.sign(
    {
   _id: this._id,
   email:this.email,
   username:this.username,
   fulname:this.fulname
},
process.env.ACCESS_TOKEN_SECRET,
{
  expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
}
)
}
UserSchema.methods.GenerateRefreshToken= function(){
    return jwt.sign(
        {
       _id: this._id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export  const User = mongoose.model.Schema|("User",UserSchema)