import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/test").post(registerUser)
router.route("/test2").get(loginUser)


export default router;