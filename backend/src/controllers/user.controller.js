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


const loginUser = asyncHandler(async (req, res) => {
    // 1. Data lo req.body se
    const { phoneNumber, role } = req.body;

    // 2. Validation
    if (!phoneNumber || !role) {
        throw new ApiError(400, "Phone number and role are required");
    }

    // 3. User ko dhoondo (Phone + Role combination)
    const user = await User.findOne({ phoneNumber, role });

    if (!user) {
        throw new ApiError(404, "User does not exist with this role. Please register first.");
    }

    // 4. Token generate karo (Jo model mein method banaya tha)
    const accessToken = user.generateAccessToken();

    // 5. Cookie options (Security ke liye)
    const options = {
        httpOnly: true, // Browser code isse touch nahi kar payega (Extra safe)
        secure: true
    };

    // 6. Response bhejo aur Cookie mein token set karo
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200, 
                { user, accessToken }, 
                "User logged in successfully"
            )
        );
});

// loginUser ke niche add karo
const logoutUser = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options) // Cookie uda di!
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// logoutUser ke niche add karo
const getCurrentUser = asyncHandler(async (req, res) => {
    // Logic: req.user humein middleware (verifyJWT) ne pehle hi nikaal kar de diya hai
    // Humein bas use response mein bhejna hai
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User details fetched successfully"));
});

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getCurrentUser // Export karna mat bhoolna
};