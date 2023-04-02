import axios from "axios";

const API = axios.create({baseURL : "http://localhost:5000"})

export const signin = (formData) => {
    return API.post("/users/signin", formData)
}
export const signup = (formData) => {
    return API.post("/users/signup", formData)
}
export const signupwithgoogle = (result) => {
    return API.post("/users/googleSignin", result)
}