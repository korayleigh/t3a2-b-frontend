import React from 'react';
import { Modal, Image, Ratio } from 'react-bootstrap';
import {StyledButton} from './styled/styled';
import PropTypes from 'prop-types';
import sadTaco from './sad_taco.png';

const MenuItemModal = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.menuItem.name}
        </Modal.Title>
      </Modal.Header>
      <Ratio aspectRatio={50}>
        <Image variant="top" src={props.menuItem.image ? props.menuItem.image.imagePath : sadTaco} />
      </Ratio>
      <Modal.Body>
        <h4>{props.menuItem.name}</h4>
        <h5>{'$'+props.menuItem.price}</h5>
        <p>{props.menuItem.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={props.onHide}>Close</StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

MenuItemModal.propTypes = {
  onHide: PropTypes.func,
  menuItem: PropTypes.object
};

export default MenuItemModal;