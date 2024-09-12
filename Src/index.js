// import monogoose from "mongoose";
// import {DB_Name} from "./constants.js";
// require("dotenv").config({path:"./env"})

// import express from "express";

// const app = express();

// (async()=>{
//     try { 
//    await  monogoose.connect(`${process.env.MONOGO_URL}/${DB_Name}`)
//    app.on("error",(err)=>{
//     console.log("error in connection", err)
//     throw err;
//    });
//    app.listen(process.env.PORT,()=>{
//     console.log("SERVER IS RUNNING ON PORT ")
//    });
// } catch (error) {
//         console.log(" ERROR ",error)
//         throw error;

// }
// })();



import connectDB from "./DB/Index.js";
import dotenv from "dotenv";

dotenv.config({path:"./env"})

connectDB()
.then(()=>{
    app.on("error",(err)=>{
    console.log("error :",err)
    throw err
    });
    
    app.listen(process.env.PORT ||8000,()=>{
        console.log("server is running !!")
    } )
})
.catch((err)=>{
console.log("mongo db connection failed ", err)
})