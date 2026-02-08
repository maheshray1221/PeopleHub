import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

// helper function
const generateAccesseAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()

        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if ([username, email, password].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "all fields are required");
    }

    // search for exist user
    const existUser = await User.findOne({ $or: [{ username }, { email }] })

    if (existUser) {
        throw new ApiError(400, "user are allready exist")
    }

    const newUser = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })

    //  remove password and refresh token in response

    const createUser = await User.findById(newUser._id).select("-password -refreshToken")

    //  check for user creation 
    if (!createUser) {
        throw new ApiError(400, "User can not create")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "User register successfully", createUser))
})



export { registerUser }