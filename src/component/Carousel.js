import React from 'react';
import banner from "../img/banner.JPG"
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

const Carousel = () => {
  return (
    <MDBCarousel>
      <img
        className='w-100 d-block carousel-item'
        itemId={1}
        src={banner}
        alt='...'
      />
    </MDBCarousel>
  );
}

export default Carousel;

// C