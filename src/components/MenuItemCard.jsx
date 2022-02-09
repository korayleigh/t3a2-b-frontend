import React from 'react';
import {Card, Button, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import sadTaco from '../sad_taco.png';
import { useState } from 'react';
import MenuItemModal from '../MenuItemModal';

const MenuItemCard = props => {
  const [modalShow, setModalShow] = useState(false);

  const handleClick = () => {
    setModalShow(true);
  };
  
  const handleModalOnHide = () => {
    setModalShow(false);
  };
  
  return (
    <Col>
      <Card>
        {props.menuItem.image ? null : <Card.Text className='text-center'>No image found</Card.Text>}
        <Card.Img variant="top" src={props.menuItem.image ? props.menuItem.image.imagePath : sadTaco} />        
        <Card.Body>
          <Card.Title >{props.menuItem.name}</Card.Title>
          <Card.Title >{'$'+props.menuItem.price }</Card.Title>
          
          
          <Card.Text>{props.menuItem.description}</Card.Text>
          <Button onClick={handleClick} variant="primary">View</Button>
        </Card.Body>
        <MenuItemModal show={modalShow} onHide={handleModalOnHide} menuItem={props.menuItem} />
      </Card>
    </Col>
  );
};

MenuItemCard.propTypes = {
  menuItem: PropTypes.object,
  setModalShow: PropTypes.func
};

export default MenuItemCard;