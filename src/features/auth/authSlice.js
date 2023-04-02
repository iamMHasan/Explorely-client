import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signup, signupwithgoogle } from "../api";

export const login = createAsyncThunk("auth/login",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
        try {
            const res = await signin(formValue)
            toast.success("login successfull")
            navigate("/")

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })
export const register = createAsyncThunk("auth/register",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
        try {
            const res = await signup(formValue)
            toast.success("login successfull")
            navigate("/")

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })
export const googleSignIn = createAsyncThunk("auth/googleSignin",
    async ({ result, navigate, toast }, { rejectWithValue }) => {
        try {
            const res = await signupwithgoogle(result)
            toast.success("google sign in successfull")
            navigate("/")

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                localStorage.setItem("profile", JSON.stringify(action.payload))
                state.user = action.payload
                console.log(action)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(register.pending, (state, action) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                localStorage.setItem("profile", JSON.stringify(action.payload))
                state.user = action.payload
                console.log(action)
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(googleSignIn.pending, (state, action) => {
                state.loading = true
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                state.loading = false
                localStorage.setItem("profile", JSON.stringify(action.payload))
                state.user = action.payload
                console.log(action)
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    }
})

export default authSlice.reducer;