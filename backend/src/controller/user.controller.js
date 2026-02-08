import User from "../models/user.model.js"
import Post from "../models/posts.model.js"
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

// controller for posts
const createPost = asyncHandler(async (req, res) => {
    const { description } = req.body
    // image ka baad me dekhenge
    if (description.trim() === "") {
        throw new ApiError(400, "description are required")
    }
    const newPost = await Post.create({
        description
    })

    if (!newPost) {
        throw new ApiError(400, "Error while creating new Post")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Post successfully created", newPost))
})

const allPost = asyncHandler(async (req, res) => {
    const Posts = await Post.find()
    if (!Posts) {
        throw new ApiError(400, "Error while get All Post")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "successfully get all Posts"))
})

const likeUnlikePosts = asyncHandler(async (req, res) => {
    const postId = req.params
    const userId = req.user._id

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(400, "Post not found !!")
    }

    if (post.likes.includes(userId)) {
        // unlike
        post.likes.pull(userId)
    } else {
        // like
        post.likes.push(userId)
    }

    await post.save()

    return res
        .status(200)
        .json(new ApiResponse(200, "Post like seccess",
            {
                likesCount: post.likes.length,
                isLiked: post.likes.includes(userId)
            }
        ))
})

const commentPost = asyncHandler(async (req, res) => {
    const postId = req.params
    const userId = req.user._id
    const { msg } = req.body

    if (msg.trim() === "") {
        throw new ApiError(400, "message required")
    }

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(400, "Post not found")
    }

    post.comments.push({
        user: userId,
        msg: msg.trim()
    });

    await post.save()

    return res
        .status(200)
        .json(new ApiResponse(200, "successfully comment send", { comments: post.comments }))
})
export {
    registerUser,
    loginUser,
    createPost,
    allPost,
    likeUnlikePosts,
    commentPost
}