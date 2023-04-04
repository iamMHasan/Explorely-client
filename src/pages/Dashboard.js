import React, { useEffect } from 'react'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBCardGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getuserTour } from '../features/tour/tourSlice';
import Spinner from '../component/Spinner';

const Dashboard = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { userTours, loading } = useSelector(state => state.tour)
    console.log(userTours)
    const userId = user?.result?._id
    useEffect(() => {
        if (userId) {
            dispatch(getuserTour(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const excerpt = (str) => {
        if (str?.length > 20) {
            str = str.substring(0, 20) + " ...";
        }
        return str;
    };

    const handleDelete = () => {

    }
    let content;
    if (loading) content = <Spinner/>
    if (!loading && userTours.length === 0) {
        content = <h3>No tour available with the user: {user?.result?.name}</h3>
    }
    if (!loading && userTours.length > 0) {
        content = (
            <>
                <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
                <hr style={{ maxWidth: "570px" }} />
                {userTours.map(item => {
                    const dataUri = "data:image/png;base64," + item?.imageFile
                    return <MDBCardGroup key={item._id}>
                        <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
                            <MDBRow className="g-0">
                                <MDBCol md="4">
                                    <MDBCardImage
                                        className="rounded"
                                        src={dataUri}
                                        alt={item.title}
                                        fluid
                                    />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody>
                                        <MDBCardTitle className="text-start">
                                            {item.title}
                                        </MDBCardTitle>
                                        <MDBCardText className="text-start">
                                            <small className="text-muted">
                                                {excerpt(item.description)}
                                            </small>
                                        </MDBCardText>
                                        <div
                                            style={{
                                                marginLeft: "5px",
                                                float: "right",
                                                marginTop: "-60px",
                                            }}
                                        >
                                            <MDBBtn className="mt-1" tag="a" color="none">
                                                <MDBIcon
                                                    fas
                                                    icon="trash"
                                                    style={{ color: "#dd4b39" }}
                                                    size="lg"
                                                    onClick={() => handleDelete(item._id)}
                                                />
                                            </MDBBtn>
                                            <Link to={`/editTour/${item._id}`}>
                                                <MDBIcon
                                                    fas
                                                    icon="edit"
                                                    style={{ color: "#55acee", marginLeft: "10px" }}
                                                    size="lg"
                                                />
                                            </Link>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCardGroup>
                }

                )}
            </>
        )
    }
    return (
        <div
            style={{
                margin: "auto",
                padding: "120px",
                maxWidth: "900px",
                alignContent: "center",
            }}
        >
            {content}

        </div>
    )
}

export default Dashboard
