
import mongoose, {Schema} from "mongoose";

const SubcriptonsSchema = new Schema(
    {
 
  subscriber:
    {
        type:Schema.Types.ObjectId,
        ref: "User"
  },

channel:{
  type:Schema.Types.ObjectId,
        ref: "User"
},
 
},
{
    timestamps: true
}
)
export  const Subcriptons = mongoose.model("Subcriptons",SubcriptonsSchema)