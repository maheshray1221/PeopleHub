import { Router } from "express";
import {
    allPost,
    createPost,
    loginUser,
    registerUser
} from "../controller/user.controller.js";

const router = Router()


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/createPost").post(createPost)

router.route("/allPosts").get(allPost)


export default router