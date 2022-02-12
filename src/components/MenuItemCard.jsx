import React, { useEffect, useState } from 'react';
import {Card, Button, Col, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
import imageNotFound from '../assets/taco_image_not_found_smaller.png';
import { useCart } from 'react-use-cart';
import { formatCentsAsDollars } from '../utils/textUtils';

const MenuItemCard = props => {
  const handleViewButtonClick = () => {
    props.handleViewButtonClick(props.menuItem.id);
  };
  
  const increaseCartQuantity = () => {
    props.increaseCartQuantity(props.menuItem);
    setCartQuantity(cartQuantity + 1);
  };
  
  const decreaseCartQuantity = () => {
    const id = props.menuItem.id;
    props.decreaseCartQuantity(id);
    setCartQuantity(inCart(id) ? getItem(id).quantity : 0 );
  };
  
  const { inCart, getItem } = useCart();

  useEffect( ()=>{
    const id = props.menuItem.id;
    setCartQuantity(inCart(id) ? getItem(id).quantity : 0 );
  });

  const [cartQuantity, setCartQuantity] = useState(0);

  return (
    <Col>
      <Card border={'dark'}>
        <Card.Img className={'img-fluid'} variant="top" src={props.menuItem.image ? props.menuItem.image.imagePath : imageNotFound} />
        <Card.Body>
          <div className='card-container'>
            <Card.Title >{props.menuItem.name}</Card.Title>
            <Card.Title >{'$'+formatCentsAsDollars(props.menuItem.price) }</Card.Title>
          </div>
        </Card.Body>

        <Card.Footer border={'dark'}>
          <ButtonToolbar className="justify-content-between" >
            <Button onClick={handleViewButtonClick} variant="primary">View</Button>
            <ButtonGroup>
              <Button variant='danger'
                onClick={decreaseCartQuantity}
              >
                -
              </Button>
              <Button disabled variant='light'>{cartQuantity}</Button>
              <Button variant='primary'
                onClick={increaseCartQuantity} >
                  +
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Footer>
      </Card>
    </Col>
  );
};

MenuItemCard.propTypes = {
  menuItem: PropTypes.object,
  setModalShow: PropTypes.func,
  handleViewButtonClick: PropTypes.func,
  increaseCartQuantity: PropTypes.func,
  decreaseCartQuantity: PropTypes.func
};

export default MenuItemCard;