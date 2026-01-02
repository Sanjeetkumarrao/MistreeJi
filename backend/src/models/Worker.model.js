import mongoose, {Schema} from "mongoose";
import { User } from "./User.model.js";

const WorkerSchema = new Schema({
    usesrId: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    skill: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        default: 0
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 5.0
    },
    reviews: [
        {
        customerId: String,
        comment: String,
        rating: Number
        }
    ],
    portfolioImages: [String],
    totalCalls: {
        type: Number,
        default: 0
    },
    basePrice: {
        type: String
    }
},
    {timestamps: true}
);

export const Worker = mongoose.model(Worker, WorkerSchema);