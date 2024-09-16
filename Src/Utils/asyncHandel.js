const asyncHandeler=(requestHandler)=>{
   return (res,req,next)=>{
        Promise
        .resolve(requestHandler(req,res,next))
        .catch((err)=>next (err))
    }
}

export {asyncHandeler}

// const asyncHandeler=(fn)=>async(req,res,next)=>{
//  try {
//     await fn(req,res,next)
//  } catch (error) {
//     res.status(err.code||500, error).jason({
//         success:false,
//         message:err.message
//     })
//  }
// }
