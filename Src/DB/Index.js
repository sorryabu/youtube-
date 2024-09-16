import mongoose from "mongoose"
import {DB_Name} from "../constants.js"


const connectDB= async()=>{
    try {
      const connectionInstance = await  mongoose.connect(`${process.env.MONOGO_URL}/${DB_Name}`)
      // console.log(connectionInstance)
      console.log(`\n MongoDB connected !!  DB host: ${connectionInstance.connection.host} `)
    } catch (error) {
        console.log(" mongo db connect error  ", error);
        process.exit(1)
    }
}

export default connectDB