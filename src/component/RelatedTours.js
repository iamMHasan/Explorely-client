import React from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const excerpt = (str, count) => {
    if (str.length > count) {
        str = str.substring(0, count)
    }
    return str
}

const RelatedTours = ({ relatedTours, tourId }) => {
    console.log(relatedTours)
    return (
        <>
            {relatedTours && relatedTours.length > 0 && (
                <>
                   
                    {relatedTours.length > 1 && <h4>Related Tours</h4>}
                    <MDBRow className="h-100 mt-2 d-sm-flex row-cols-1 row-cols-md-3 g-4" >
                        {relatedTours
                            .filter((item) => item._id !== tourId)
                            .splice(0, 3)
                            .map((item) => {
                                const dataUri = "data:image/png;base64," + item?.imageFile
                                return (
                                    <MDBCol>
                                        <MDBCard>
                                            <Link to={`/tour/${item._id}`}>
                                                <MDBCardImage
                                                    src={dataUri}
                                                    alt={item.title}
                                                    position="top"
                                                />
                                            </Link>
                                            <span className="text-start tag-card">
                                                {item.tags.map((tag) => (
                                                    <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
                                                ))}
                                            </span>
                                            <MDBCardBody>
                                                <MDBCardTitle className="text-start">
                                                    {item.title}
                                                </MDBCardTitle>
                                                <MDBCardText className="text-start">
                                                    {excerpt(item.description, 45)}
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                )
                            })}
                    </MDBRow>
                </>
            )}
        </>
    );
};

export default RelatedTours;