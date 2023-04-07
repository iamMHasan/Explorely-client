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
import { useDispatch, useSelector } from 'react-redux';
import { likeATour } from '../features/tour/tourSlice';


const excerpt = (str) => {
    if (str?.length > 45) {
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
    const dispatch = useDispatch()

    const userId = user?.result?._id || user?.result?.googleId

    const Like = () => {
        if (likes.length > 0) {
            return likes.find(like => like === userId) ? (
                <>
                    <MDBIcon fas icon='thumbs-up' />
                    &nbsp;
                    {likes.length > 1 ?
                        <MDBTooltip tag='t' title={`you and ${likes.length - 1} others like`}>
                            {likes.length} Likes
                        </MDBTooltip>
                        : (
                            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
                        )
                    }
                </>
            ) : (
                <>
                    <MDBIcon far icon='thumbs-up' />
                    &nbsp;  {likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            )
        }
        return (
            <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;Like
            </>
        )
    }

    const handleLike = () => {
        dispatch(likeATour(_id))
    }
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
                        onClick={!user?.result ? null : handleLike}
                        style={{ float: "right" }}
                        tag="a"
                        color="none"
                    >
                        {
                            !user?.result ?
                                <MDBTooltip tag='t' title={`Please login to like`}>
                                    <Like />
                                </MDBTooltip> :
                                <Like/>
                        }
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
