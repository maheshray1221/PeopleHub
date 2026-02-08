import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"


// send cokie
const options = {
    httpOnly: true,
    secure: true,
}

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "all fields are required");
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(401, "User not found Please register the user")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid user cradiatial")
    }
    const { accessToken, refreshToken } = await generateAccesseAndRefreshToken(user._id)

    const loginUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loginUser, accessToken, refreshToken }, "User successfully loged In"))
})

export {
    registerUser,
    loginUser,
}