import { Router } from "express";
import {
    allPost,
    commentPost,
    createPost,
    likeUnlikePosts,
    loginUser,
    registerUser
} from "../controller/user.controller.js";

const router = Router()


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/createPost").post(createPost)

router.route("/allPosts").get(allPost)

router.route("/likeUnlike").post(likeUnlikePosts)

router.route("/addComment").post(commentPost)



export default router