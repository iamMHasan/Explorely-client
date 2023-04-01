import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin } from "../api";

export const login = createAsyncThunk("auth/login",
    async ({ formValue, navigate, toast }) => {
        try {
            const res = await signin(formValue)
            toast.success("login successfull")
            navigate("/")

            return res.data;
        } catch (error) {
            console.log(error)
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
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })

    }
})

export default authSlice.reducer;