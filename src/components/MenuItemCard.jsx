import React from 'react';
import {Card, Button, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

const MenuItemCard = props => {
  return (
    <Col>
      <Card>
        {props.menuItem.image ? <Card.Img variant="top" src={props.menuItem.image.imagePath} /> 
          : 
          <Card.Text>NO IMAGE</Card.Text>
        }
        
        <Card.Body>
          <Card.Title>{props.menuItem.name + '   -   $'+props.menuItem.price }</Card.Title>
          <Card.Text>{props.menuItem.description}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

MenuItemCard.propTypes = {
  menuItem: PropTypes.object
};

export default MenuItemCard;