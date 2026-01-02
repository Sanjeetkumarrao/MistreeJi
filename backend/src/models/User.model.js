import mongoose, {Schema} from "mongoose"

const UserSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        default: ""
    },
    address: {
        lat: Number,
        lng: Number,
        addressText: String
    },
    profilePic: {
        type: String,
        default: "default-user.png"
    },
    role: {
        type: String,
        default: "customer"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

export const User = mongoose.model(User, UserSchema);