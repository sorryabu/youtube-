import { Router } from "express";
import { userregister } from "../Controllers/User.controller.js";


const router = Router()


router.route("/register").post(userregister)
// Router.route("/login").post(login)





export default router