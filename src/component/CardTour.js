import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardGroup,
    MDBBtn,
    MDBIcon,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const excerpt = (str) => {
    if(str?.length > 45){
        str = str.substring(0, 45) + "..."
    }
    return str;
}

const CardTour = ({ tour }) => {
    const {
        imageFile,
        description,
        title,
        tags,
        _id,
        name,
        likes,
    } = tour || {}
    const dataUri = "data:image/png;base64," + imageFile
    const { user } = useSelector(state => state.auth)
    return (
        <MDBCardGroup>
            <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
                <MDBCardImage
                    src={dataUri}
                    alt={title}
                    position="top"
                    style={{ maxWidth: "100%", height: "180px" }}
                />
                <div className="top-left">{name}</div>
                <span className="text-start tag-card">
                    {tags.map((tag) => (
                        <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
                    ))}
                    <MDBBtn
                        style={{ float: "right" }}
                        tag="a"
                        color="none"
                    >
                    </MDBBtn>
                </span>
                <MDBCardBody>
                    <MDBCardTitle className="text-start">{title}</MDBCardTitle>
                    <MDBCardText className="text-start">
                        {excerpt(description)}
                        <Link to={`/tour/${_id}`}>Read More</Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    )
}

export default CardTour
