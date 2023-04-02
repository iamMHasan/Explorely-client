import React, { useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input"

const initialState = {
    title: "",
    description: null,
    tags: []
}
const AddorEditTour = () => {
    const [tourData, setTourData] = useState(initialState)
    const {title, description,tags} = tourData
    const handleClear = () =>{
        
    }
    const handleSubmit = () =>{

    }
    const onInputChange = () =>{

    }
    const handleAddTag = () =>{

    }
    const handleDeleteTag = () =>{

    }
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
                <h5>{ "Update Tour Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className="col-md-12">
                            <MDBInput
                                placeholder="Enter Title"
                                type="text"
                                value={title || ""}
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
                                value={description}
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

export default AddorEditTour
