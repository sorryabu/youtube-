import { Router } from "express";
import { userlogout, userregister, userlogin ,RefreshAccessToken} from "../Controllers/User.controller.js";
import { varifyJWT } from "../Middleware/auth.middleware.js";
import {upload} from "../Middleware/multer.middleware.js"


const router = Router()
router.route("/register").post(
    upload.fields([
       {
        name:"avtar",
        maxCount:1
       },
       {
       name:"coverimg",
        maxCount:1
       }
    ]),
    userregister
)
// router.route("/register").post(userregister)

router.route("/login").post( userlogin)


// secured route
router.route("/logout").post( varifyJWT,userlogout)
router.route("/refresh-token").post( RefreshAccessToken)


export default router