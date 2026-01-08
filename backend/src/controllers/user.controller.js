import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // 1. Data lo (Frontend se)
    // Humne form-data mein jo fields bheji thi wahi yahan pakdenge
    const { fullName, phoneNumber, role, address, city, skill, experience, aadharNumber, hourlyRate } = req.body;

    // 2. Validation: Koi important field khali toh nahi?
    if ([fullName, phoneNumber, role, address, city].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All common fields are required!");
    }

    // 3. Check if user already exists
    const existedUser = await User.findOne({ 
    $and: [{ phoneNumber }, { role }] 
    });

    if (existedUser) {
        throw new ApiError(409, `You are already registered as a ${role} with this number`);
    }

    // 4. Create User object and save in DB
    const user = await User.create({
        fullName,
        phoneNumber,
        role,
        address,
        city,
        skill: role === "worker" ? skill : "",
        experience: role === "worker" ? experience : 0,
        aadharNumber: role === "worker" ? aadharNumber : undefined,
        hourlyRate: role === "worker" ? hourlyRate : undefined
    });

    // 5. Check if user created successfully
    const createdUser = await User.findById(user._id);
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 6. Return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    );
});

export { registerUser };