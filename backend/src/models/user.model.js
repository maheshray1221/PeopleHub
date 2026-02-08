import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [6, "UserName must be minimum 6 character"],
            minlength: [25, "UserName must be with in 25 character"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [10, "UserName must be minimum 6 character"],
            minlength: [40, "UserName must be with in 25 character"],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [6, "UserName must be minimum 6 character"],
            minlength: [25, "UserName must be with in 25 character"],
        },
        refreshToken: {
            type: String,
        }

    }, { timestamps: true })

const User = mongoose.model("User", UserSchema)

export default User