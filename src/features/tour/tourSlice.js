import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTour, deleteTour, getTourData, getToursData, getUserTour, likeTour, reletedTours, searchByTag, searchTour, updateTour } from "../api";
import { toast } from "react-toastify"

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
    async (page, { rejectWithValue }) => {
        try {
            const res = await getToursData(page)
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
export const deleteATour = createAsyncThunk("tour/deleteTour",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteTour(id)
            toast.success("Tour deleted")
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    })
export const updateATour = createAsyncThunk("tour/updateTour",
    async ({ id, updatedTourdata, navigate }, { rejectWithValue }) => {
        try {
            const res = await updateTour(id, updatedTourdata)
            toast.success("Tour updated")
            navigate("/")
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    })
export const getTourBySearch = createAsyncThunk("tour/getTourBySearch",
    async (searchQuery, { rejectWithValue }) => {

        try {
            const res = await searchTour(searchQuery)
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    })
export const getTourByTags = createAsyncThunk("tour/getTourByTags",
    async (tag, { rejectWithValue }) => {
        console.log(tag)
        try {
            const res = await searchByTag(tag)
            return res.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    })
export const getReletedTours = createAsyncThunk("tour/getReletedTours",
    async (tags, { rejectWithValue }) => {
        try {
            const res = await reletedTours(tags)
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })
export const likeATour = createAsyncThunk("tour/likeTour",
    async (id, { rejectWithValue }) => {
        try {
            const res = await likeTour(id)
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
        currentPage: 1,
        numOfpages: null,
        reletedTours: [],
        tour: {},
        userTours: [],
        tagTours: [],
        error: "",
        loading: false
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
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
                state.tours = action.payload.data
                state.currentPage = action.payload.currentPage
                state.numOfpages = action.payload.numOfPages
            })
            .addCase(getTours.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
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
            .addCase(deleteATour.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteATour.fulfilled, (state, action) => {
                state.loading = false
                state.userTours = state.userTours.filter(item => item._id !== action.meta.arg)
                state.tours = state.tours.filter(item => item._id !== action.meta.arg)
            })
            .addCase(deleteATour.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(updateATour.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateATour.fulfilled, (state, action) => {
                state.loading = false
                state.userTours = state.userTours.map(item => item._id === action.meta.arg ? action.payload : item)
                state.tours = state.tours.map(item => item._id === action.meta.arg ? action.payload : item)
            })
            .addCase(updateATour.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(getTourBySearch.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getTourBySearch.fulfilled, (state, action) => {
                state.loading = false
                state.tours = action.payload
            })
            .addCase(getTourBySearch.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getTourByTags.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getTourByTags.fulfilled, (state, action) => {
                state.loading = false
                state.tagTours = action.payload
            })
            .addCase(getTourByTags.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                console.log(action.payload.message)
            })
            .addCase(getReletedTours.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getReletedTours.fulfilled, (state, action) => {
                state.loading = false
                state.reletedTours = action.payload
            })
            .addCase(getReletedTours.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
                console.log(action.payload.message)
            })
            .addCase(likeATour.pending, (state, action) => {
            })
            .addCase(likeATour.fulfilled, (state, action) => {
                state.loading = false
                state.tours = state.tours.map(item => item._id === action.meta.arg ? action.payload : item)
            })
            .addCase(likeATour.rejected, (state, action) => {
                state.error = action.payload.message
            })
    }
})

export default tourSlice.reducer;
export const { setCurrentPage } = tourSlice.actions