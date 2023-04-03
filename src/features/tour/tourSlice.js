import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTour } from "../api";

export const createtour = createAsyncThunk("tour/createTour",
    async ({ updatedTourdata, navigate, toast }, { rejectWithValue }) => {
        try {
            const res = await createTour(updatedTourdata)
            toast.success("tour created successfull")
            navigate("/")

            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    })
const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tours : [],
        tour : {},
        userTours : [],
        error : "",
        loading : false
    },
    extraReducers: (builder) => {
        builder
            .addCase(createtour.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createtour.fulfilled, (state, action) => {
                state.loading = false
                state.tours.push(action.payload)
            })
            .addCase(createtour.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default tourSlice.reducer;