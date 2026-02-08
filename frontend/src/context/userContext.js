import { createContext } from "react";
import { Client } from "../utils";
const userContext = createContext({})

export const userProvider = ({ children }) => {

    // register user
    const registerUser = async (email, password, username) => {
        try {
            const request = await Client.post("/register", {
                email,
                username,
                password
            })
            if (request.status === 200) {
                return request.data.message
            }
        } catch (err) {
            throw err
        }

    }

    // login user
    const loginUser = async (email, password) => {
        try {
            const request = await Client.post("/login", {
                email,
                password
            }, { withCredentials: true })

            if (request.status === 200) {
                console.log(request.data)
            }
        } catch (err) {
            throw err
        }
    }

    // create post
    const createPost = async (description) => {
        try {
            const request = await Client.post("/createPost", {
                description
            }, { withCredentials: true })
            if (request.status === 200) {
                console.log(request.data)
            }
        } catch (error) {
            throw error
        }
    }

    // Read all post
    const getPost = async () => {
        try {
            const request = await Client.get("allPosts", { withCredentials: true })
            if (request.status === 200) {
                console.log(request.data)
            }
        } catch (error) {
            throw error
        }

    }
    const data = {
        registerUser,
        loginUser,
        createPost,
        getPost,
        
    }
    return (
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    )
}
