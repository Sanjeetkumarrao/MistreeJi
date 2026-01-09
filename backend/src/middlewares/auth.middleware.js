import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // 1. Cookie ya Header se token uthao
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request! No token found.");
        }

        // 2. Token ko decode karo (Verify)
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 3. Database se user dhoondo
        const user = await User.findById(decodedToken?._id).select("-aadharNumber"); // Security ke liye aadhar hide kar diya

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // 4. Request mein user ka data daal do (Sabse important step)
        req.user = user;
        next(); // Agle function (Controller) ko pass kar do

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});