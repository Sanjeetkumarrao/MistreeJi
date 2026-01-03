import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/").get(registerUser)
router.route("/sk").get(loginUser)


export default router;