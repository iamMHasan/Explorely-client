import axios from "axios";

const API = axios.create({baseURL : "http://localhost:5000"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})

export const signin = (formData) => {
    return API.post("/users/signin", formData)
}
export const signup = (formData) => {
    return API.post("/users/signup", formData)
}
export const signupwithgoogle = (result) => {
    return API.post("/users/googleSignin", result)
}

export const createTour = (tourData) =>{
    return API.post("/tours", tourData)
}