import { Router } from "express";
import { userregister } from "../Controllers/User.controller.js";
// import {upload} from "../Middleware/multer.middleware.js"


const router = Router()
// router.route("/register").post(
//     upload.fields([
//        {
//         name:"avtar",
//         maxCount:1
//        },
//        {
//        name:"coverimg",
//         maxCount:1
//        }
//     ]),
//     userregister
// )
router.route("/register").post(userregister)


export default router