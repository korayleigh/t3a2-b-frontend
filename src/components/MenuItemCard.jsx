import React from 'react';
import {Card, Button, Col, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
import imageNotFound from '../assets/taco_image_not_found_smaller.png';

const MenuItemCard = props => {
  const handleViewButtonClick = () => {
    props.handleViewButtonClick(props.menuItem.id);
  };

  return (
    <Col>
      <Card border={'dark'}>
        <Card.Img variant="top" src={props.menuItem.image ? props.menuItem.image.imagePath : imageNotFound} />
        <Card.Body>
          <div className='card-container'>
            <Card.Title >{props.menuItem.name}</Card.Title>
            <Card.Title >{'$'+props.menuItem.price }</Card.Title>
          </div>
        </Card.Body>

        <Card.Footer border={'dark'}>
          <ButtonToolbar className="justify-content-between" >
            <Button onClick={handleViewButtonClick} variant="primary">View</Button>
            <ButtonGroup>
              <Button variant='danger'
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <Button disabled variant='light'>0</Button>
              <Button variant='primary'
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)} >
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
  handleViewButtonClick: PropTypes.func
};

export default MenuItemCard;