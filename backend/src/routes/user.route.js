import { Router } from "express";
import {
    allPost,
    commentPost,
    createPost,
    likeUnlikePosts,
    loginUser,
    registerUser
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/createPost").post(verifyJWT, createPost)

router.route("/allPosts").get(verifyJWT, allPost)

router.route("/likeUnlike").post(verifyJWT, likeUnlikePosts)

router.route("/addComment").post(verifyJWT, commentPost)



export default router