import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTour, getTourData, getToursData, getUserTour } from "../api";

export const createtour = createAsyncThunk("tour/createTour",
    async ({ updatedTourdata, navigate, toast }) => {
        try {
            const res = await createTour(updatedTourdata)
            toast.success("tour created successfull")
            navigate("/")

            return res.data;
        } catch (error) {
            console.log(error)
        }
    })
export const getTours = createAsyncThunk("tour/gettours",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getToursData()
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    })
export const getTour = createAsyncThunk("tour/gettour",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getTourData(id)
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    })
export const getuserTour = createAsyncThunk("tour/getUserTour",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getUserTour(id)
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    })
const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tours: [],
        tour: {},
        userTours: [],
        error: "",
        loading: false
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
                state.error = action.payload.message
            })
            .addCase(getTours.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getTours.fulfilled, (state, action) => {
                state.loading = false
                state.tours = action.payload
            })
            .addCase(getTours.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getTour.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getTour.fulfilled, (state, action) => {
                state.loading = false
                state.tour = action.payload
            })
            .addCase(getTour.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getuserTour.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getuserTour.fulfilled, (state, action) => {
                state.loading = false
               state.userTours = action.payload
            })
            .addCase(getuserTour.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})

export default tourSlice.reducer;