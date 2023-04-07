import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getReletedTours, getTour } from "../features/tour/tourSlice";
import RelatedTours from "../component/RelatedTours";
import DisqusThread from "../component/DisqusThread";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, reletedTours } = useSelector(state => state.tour);
  console.log(reletedTours)
  const dataUri = "data:image/png;base64," + tour?.imageFile
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(getReletedTours(tags))
  }, [tags, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={dataUri}
            alt={tour.title}
          />
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="red"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedTours relatedTours={reletedTours} tourId={id} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
      </MDBContainer>
    </>
  );
};

export default SingleTour;