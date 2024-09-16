
import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema = new Schema(
    {
 VideoFile:{
    type:String,
    required: true,
 },
 thumbnail:{
    type:String,
    required: true,
 },
 Title:{
    type:String,
    required: true,
 },
  Desciption:{
    type:String,
    required: true,
 },
  Duration:{
    type:Number,
    required: true,
 },
  views:{
      type : Number ,
      default:0
 },
 isPublished:{
 type:Boolean,
 default:0
 },
 Owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
 }

},
{timestamps:true

}
)

VideoSchema.plugin(mongooseAggregatePaginate)
export  const Video = mongoose.model.Schema|("Video",VideoSchema)