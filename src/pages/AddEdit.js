import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input"
import { useSelector, useDispatch } from "react-redux"
import { createtour, updateATour } from '../features/tour/tourSlice';
const initialState = {
    title: "",
    description: "",
    tags: []
}
const AddEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [tourData, setTourData] = useState(initialState)
    const [tagErrMsg, settagErrMsg] = useState("")
    const { title, description, tags } = tourData
    const dispatch = useDispatch()
    const { error, loading, userTours } = useSelector(state => state.tour)
    const { user } = useSelector(state => state.auth)

    function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(",")[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    }
    useEffect(() => {
        const singleTour = userTours.find(tour => tour._id === id)
        if (id) {
            setTourData({ ...singleTour })
        }
    }, [id, userTours])

    const handleClear = () => {
        setTourData({ title: "", description: "", tags: [] })
    }
    const handleSubmit = (e) => {
        if(tags.length === 0){
            settagErrMsg("please add tag too")
            return
       }
        e.preventDefault()
        if (title && description && tags) {
            const updatedTourdata = { ...tourData, name: user?.result?.name }
            if (!id) {
                dispatch(createtour({ updatedTourdata, navigate, toast }))
            } else {
                dispatch(updateATour({ id, updatedTourdata, navigate }))
            }

        }

    }
    const onInputChange = (e) => {
        const { name, value } = e.target
        setTourData({ ...tourData, [name]: value })
    }
    const handleAddTag = (tour) => {
        setTourData({ ...tourData, tags: [...tourData.tags, tour] })
    }
    const handleDeleteTag = (deletetag) => {
        setTourData({ ...tourData, tags: tourData.tags.filter(tag => tag !== deletetag) })
    }

    useEffect(() => {
        error && toast.error(error)
    }, [error])
    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignContent: "center",
                marginTop: "120px",
            }}
            className="container"
        >
            <MDBCard alignment="center">
                <h5>{id ? "Update Tour Add Tour" : "Add Tour Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className="col-md-12">
                            <MDBInput
                                value={title}
                                label="Enter Title"
                                type="text"
                                name="title"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please provide title"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                value={description}
                                label="Enter Description"
                                type="text"
                                name="description"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                textarea
                                rows={4}
                                validation="Please provide description"
                            />
                        </div>
                        <div className="col-md-12">
                            <ChipInput
                                required
                                name="tags"
                                variant="outlined"
                                placeholder="Enter Tag"
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                            {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
                        </div>
                        <div className="d-flex justify-content-start">
                            <input
                                type="file"
                                onChange={async (event) => {
                                    const file = event.target.files[0];
                                    const base64String = await readFileAsBase64(file);
                                    // console.log(base64String)
                                    setTourData({ ...tourData, imageFile: base64String });
                                }}
                            />

                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }}>
                                {loading ? "Submitting..." : (id ? "Update" : "Submit")}
                            </MDBBtn>
                            <MDBBtn
                                style={{ width: "100%" }}
                                className="mt-2"
                                color="danger"
                                onClick={handleClear}
                            >
                                Clear
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default AddEdit
