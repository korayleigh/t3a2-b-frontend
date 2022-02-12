import React from 'react';
import { Modal, Image, Ratio } from 'react-bootstrap';
import {StyledButton} from './styled/styled';
import PropTypes from 'prop-types';
import imageNotFound from './assets/taco_image_not_found_smaller.png';
import { useGlobalContext } from './utils/globalContext';

const MenuItemModal = (props) => {

  const {globalStore} = useGlobalContext();
  const {menu} = globalStore;

  const menuItem = menu.find(menuItem => menuItem.id === props.menuItemId);
  console.log(menuItem);

  const modalContent = (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {menuItem ? menuItem.name : 'Loading...'}
        </Modal.Title>
      </Modal.Header>
      <Ratio>
        {menuItem && menuItem.image ?
          <Image variant="top" src={menuItem.image.imagePath} />
          : 
          <Image variant="top" src={imageNotFound} />
        }
        
        {/* <Image variant="top" src={menuItem ? menuItem.image.imagePath : imageNotFound} /> */}
      </Ratio>
      <Modal.Body>
        <h4>{menuItem ? menuItem.name : 'Loading...'}</h4>
        <h5>{menuItem ? '$'+menuItem.price : 'Loading...'}</h5>
        <p>{menuItem ? menuItem.description : 'Loading...'}</p>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={props.onHide}>Close</StyledButton>
      </Modal.Footer>
    </Modal> 
  );

  return (modalContent);
};

MenuItemModal.propTypes = {
  onHide: PropTypes.func,
  menuItemId: PropTypes.number
};

export default MenuItemModal;