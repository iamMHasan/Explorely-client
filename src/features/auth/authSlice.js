import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin } from "../api";

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

    }
})

export default authSlice.reducer;