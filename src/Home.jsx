import React from 'react';
import { Carousel, Image, Row, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image1 from './assets/carousel_1.jpg';
import image2 from './assets/carousel_2.jpg';
import image3 from './assets/carousel_3.jpg';
import image4 from './assets/carousel_4.jpg';
import { StyledButton } from './styled/styled';

const Home = () => {
  return (
    <div
      style={{
        marginBottom: '6rem'
      }}>
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

      <div className="col-md-5 mx-auto d-grid gap-2 my-4">
        <StyledButton as={Link} to="/menu" href="/menu" variant={'primary'} size={'lg'}>Order</StyledButton>
      </div>

      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Row className="col-3-sm mx-auto">
          <Alert
            variant='success'
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 'larger',
                fontWeight: 'bold',
              }}>
              <span>Mexiquito mexican restaurant</span>
              <span>42 Wallaby Way</span>
              <span>Sydney</span>
              <span><a href="mailto:admin@mexiqui.to">Email Us</a></span>
            </div>
          </Alert>
        </Row>
        <Row>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.9406114694625!2d144.9332255152352!3d-37.79143154053867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d190a125d39%3A0x818211dde18a3722!2sLa%20Tortilleria!5e0!3m2!1sen!2sau!4v1644729359517!5m2!1sen!2sau" 
            width="800" 
            height="600" 
            style={{
              border : 0,
            }} 
            allowFullScreen="" 
            loading="lazy" />
        </Row>
      </Container>
    </div>
    
  );
};

export default Home;