import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})

export const signin = async (formData) => {
    const response = await API.post("/users/signin", formData)
    return response;
}
export const signup = async (formData) => {
    const response = await API.post("/users/signup", formData)
    return response;
}
export const signupwithgoogle = async (result) => {
    const response = await API.post("/users/googleSignin", result)
    return response;
}

export const createTour = async (tourData) => {
    const response = await API.post("/tours", tourData)
    return response
}
export const getToursData = async () => {
    const response = await API.get("/tours")
    return response
}
export const getTourData = async (id) => {
    const response = await API.get(`/tours/${id}`)
    return response
}
export const getUserTour = async (id) => {
    const response = await API.get(`/tours/userTours/${id}`)
    return response
}
export const deleteTour = async (id) => {
    const response = await API.delete(`/tours/${id}`)
    return response
}
export const updateTour = async (id, updatedData) => {
    const response = await API.patch(`/tours/${id}`, updatedData)
    return response
}
export const searchTour = async (searchQuery) => {
    const response = await API.get(`/tours/search?searchQuery=${searchQuery}`)
    return response
}
export const searchByTag = async (tag) => {
    console.log(tag)
    const response = await API.get(`/tours/tag/${tag}`)
    return response
}