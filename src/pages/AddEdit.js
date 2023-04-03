import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input"
import FileBase from "react-file-base64"
import { useSelector, useDispatch } from "react-redux"
import { createtour } from '../features/tour/tourSlice';
const initialState = {
    title: "",
    description: "",
    tags: []
}
const AddEdit = () => {
    const navigate = useNavigate()
    const [tourData, setTourData] = useState(initialState)
    const { title, description, tags } = tourData
    const dispatch = useDispatch()
    const { error, } = useSelector(state => state.tour)
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
      
    const handleClear = () => {
        setTourData({ title: "", description: "", tags: [] })
    }
    const handleSubmit = (e) => {
        console.log(title, description, tags)
        e.preventDefault()
        if (title && description && tags) {
            const updatedTourdata = { ...tourData, name: user?.result?.name }
            dispatch(createtour({ updatedTourdata, navigate, toast }))
            // handleClear()
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
                <h5>{"Update Tour Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className="col-md-12">
                            <MDBInput
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
                                name="tags"
                                variant="outlined"
                                placeholder="Enter Tag"
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                            {/* {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>} */}
                        </div>
                        <div className="d-flex justify-content-start">
                            {/* <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setTourData({ ...tourData, imageFile: base64 })
                                }
                            /> */}
                            <input
                                type="file"
                                onChange={async (event) => {
                                    const file = event.target.files[0];
                                    const base64String = await readFileAsBase64(file);
                                    setTourData({ ...tourData, imageFile: base64String });
                                }}
                            />

                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }}>
                                "Submit"
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
