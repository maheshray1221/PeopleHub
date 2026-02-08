import axios from "axios"

export const Client = axios.create({
    baseURL:"http://localhost:8080/api/users"
})