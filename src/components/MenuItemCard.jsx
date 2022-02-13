import React, { useEffect, useState } from 'react';
import {Card, Button, Col, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
import imageNotFound from '../assets/taco_image_not_found_smaller.png';
import { useCart } from 'react-use-cart';
import { formatCentsAsDollars } from '../utils/textUtils';
import YesNoModal from '../YesNoModal';
import { useGlobalContext } from '../utils/globalContext';
import { showToast } from '../services/toastServices';
import { useNavigate } from 'react-router-dom';
import { destroyMenuItem } from '../services/menuServices';
import { StyledButton } from '../styled/styled';

const MenuItemCard = props => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const {globalStore, globalDispatch} = useGlobalContext();
  const navigate = useNavigate();
  
  const handleViewButtonClick = () => {
    props.handleViewButtonClick(props.menuItem.id);
  };
  const handleButtonClick = (event) => {
    if (event.target.name === 'delete') {
      setDeleteModalShow(true);
    }
    else if (event.target.name === 'edit') {
      navigate(`/menuitems/${props.menuItem.id}/edit`);
    }
  };
  
  const increaseCartQuantity = () => {
    props.increaseCartQuantity(props.menuItem);
    if (cartQuantity === 0) {
      showToast(globalStore, globalDispatch, `Added ${props.menuItem.name} to cart`, 'success');
    }
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

  const handleDeleteModalConfirm = () => {
    destroyMenuItem(props.menuItem.id)
      .then(() => {
        showToast(globalStore, globalDispatch,`Menu Item '${props.menuItem.name}' successfully deleted`, 'warning' );
      })
      .then(() => {
        setDeleteModalShow(false);
        navigate('/editmenu');
      })
      .catch((error) => {
        globalStore.globalErrorHandler(error);
      });
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalShow(false);
  };

  const userButtons = (
    <ButtonGroup>
      <Button variant='danger'
        onClick={decreaseCartQuantity}
      >
        -
      </Button>
      <Button disabled variant='light'>{cartQuantity}</Button>
      <Button variant='primary'
        onClick={increaseCartQuantity}
        style={{
          color: 'white',
        }} >
          +
      </Button>
    </ButtonGroup>

  );

  const adminButtons = (
    <>
      <Button variant='primary' onClick={handleButtonClick} name={'edit'}>Edit</Button>
      <Button variant='danger' onClick={handleButtonClick} name={'delete'}>Delete</Button>
      <YesNoModal show={deleteModalShow} prompt="Are you sure?" onYes={handleDeleteModalConfirm} onNo={handleDeleteModalCancel} yes_text="Delete" no_text="Cancel" yes_variant="danger" no_variant="secondary" />
    </>
  );

  return (
    <Col>
      <Card border={'dark'}>
        <Card.Img onClick={handleViewButtonClick} className={'img-fluid'} style={{cursor: 'pointer'}} variant='top' src={props.menuItem.image ? props.menuItem.image.imagePath : imageNotFound} />
        <Card.Body>
          <div className='card-container'>
            <Card.Title >{props.menuItem.name}</Card.Title>
            <Card.Title >{'$'+formatCentsAsDollars(props.menuItem.price) }</Card.Title>
          </div>
        </Card.Body>

        <Card.Footer border={'dark'}>
          <ButtonToolbar className='justify-content-between' >
            <StyledButton onClick={handleViewButtonClick} variant="primary">View</StyledButton>
            {props.variant === 'edit' ? adminButtons : userButtons}
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
  decreaseCartQuantity: PropTypes.func,
  variant: PropTypes.string
};

export default MenuItemCard;