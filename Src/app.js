import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express();
app.use(cors({
    origin:process.env.CORSE_ORIGIN,
    credentials : true
}))
 app.use(express.json({limit:"16kb"}))
 app.use(express.urlencoded({limit:"16kb",extended:true}))
  app.use(express.static("public"))
  app.use(cookieParser())
  
  import router from "./Routes/User.route.js"

  //   route decleration 
  app.use("/api/v1/users",router)
export {app}