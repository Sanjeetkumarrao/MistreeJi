import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true, // Search karne mein aasan hoga
        },
        role: {
            type: String,
            enum: ["customer", "worker"], // Sirf yahi do values allow hain
            required: true,
        },
        // Ye fields sirf tab bhari jayengi jab role 'worker' hoga
        skill: {
            type: String,
            default: "",
        },
        experience: {
            type: Number,
            default: 0,
        },
        aadharNumber: {
            type: String,
            unique: true,
            sparse: true, // Taki jinpe aadhar nahi (customers) unhe error na aaye
        },
        hourlyRate: {
            type: Number,
        },
        // Ye fields customer aur worker dono ke liye ho sakti hain
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
        },
        profilePicture: {
            type: String, // Cloudinary ka URL aayega yahan
        }
    },
    {
        timestamps: true, // Isse 'createdAt' aur 'updatedAt' apne aap ban jayega
    }
);
// YE HAI ASLI JADU (Compound Index)
userSchema.index({ phoneNumber: 1, role: 1 }, { unique: true });


// Token generate karne ka function
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            phoneNumber: this.phoneNumber,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);