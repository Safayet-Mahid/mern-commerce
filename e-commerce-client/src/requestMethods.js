import axios from "axios"

const Base_Url = "http://localhost:5000/api/"

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGQ0ZWE5ODMwMGY4ZWMxNGUzODRjNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjQ1NzQxMCwiZXhwIjoxNjY2NzE2NjEwfQ.wNxsdsuOAATExO-_rG5gEw1yKSSJITJqHCTEukAE9x4"
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken

export const publicRequest = axios.create({
    baseURL: Base_Url
})

export const userRequest = axios.create({
    baseURL: Base_Url,
    headers: {
        token: `Bearer ${TOKEN}`
    }
})