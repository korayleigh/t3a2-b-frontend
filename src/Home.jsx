import React from 'react';
import { Button, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image1 from './assets/carousel_1.jpg';
import image2 from './assets/carousel_2.jpg';
import image3 from './assets/carousel_3.jpg';
import image4 from './assets/carousel_4.jpg';

const Home = () => {
  return (
    <>
      <Carousel >
        <Carousel.Item as={Link} to="/menu" href="/menu">
          <Image className='d-block w-100' src={image1} alt="First slide"/>
        </Carousel.Item>
        <Carousel.Item as={Link} to="/menu" href="/menu">
          <Image className='d-block w-100' src={image2} alt="First slide"/>
        </Carousel.Item>
        <Carousel.Item as={Link} to="/menu" href="/menu">
          <Image className='d-block w-100' src={image3} alt="First slide"/>
        </Carousel.Item>
        <Carousel.Item as={Link} to="/menu" href="/menu">
          <Image className='d-block w-100' src={image4} alt="First slide"/>
        </Carousel.Item>
      </Carousel>

      <div className="col-md-5 mx-auto d-grid gap-2">
        <br />
        <Button as={Link} to="/menu" href="/menu" variant={'primary'} size={'lg'}>Order</Button>
      </div>
    </>
    
  );
};

export default Home;