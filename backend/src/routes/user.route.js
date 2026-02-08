import { Router } from "express";
import {
    allPost,
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


export default router