import mongoose from "mongoose";

const userProfile = new mongoose.Schema({
    phone_number: {
        type: String
    },
    profileImage: {
        type: String
    },
    preferences: {
        type: Object,
        default: {}
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    }
})

const UserProfile = mongoose.model('userProfile', userProfile);
export default UserProfile;