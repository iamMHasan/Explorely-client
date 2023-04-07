import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Spinner from "../component/Spinner";
import { getTourBySearch, getTours } from "../features/tour/tourSlice";
import CardTour from "../component/CardTour";
import Pagination from "../component/Pagination";
import Carousel from "../component/Carousel";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { tours, loading , currentPage, numOfpages} = useSelector(state => state.tour) || {}
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    if (searchQuery) {
      dispatch(getTourBySearch(searchQuery));
    } else {
      dispatch(getTours(currentPage));
    }
  }, [location, dispatch, searchQuery,currentPage])

  if (loading) {
    return  <div  style={{
      display: "flex",
      justifyContent: "center",
      height: "100vh",
    }}> <Spinner/></div>
  }
  return (
   <>
   <Carousel/>
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}

        {tours.length === 0 && searchQuery && (
          <MDBTypography className="text-center mb-0" tag="h2">
            We couldn't find any matches for "{searchQuery}"
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              { tours.length > 0 &&
                tours?.map(tour => <CardTour key={tour?._id} tour={tour}/>)
              }
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {tours.length > 0 && !searchQuery && (
        <Pagination
          numberOfPages={numOfpages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )}
    </div>
   </>
  );
};

export default Home;
