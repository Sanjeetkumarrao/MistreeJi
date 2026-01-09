import { Router } from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Guard import kiya

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// SECURED ROUTES (Sirf logged in users ke liye)
router.route("/logout").post(verifyJWT, logoutUser); // Pehle verify, phir logout
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;