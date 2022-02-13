import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from 'react-use-cart';
import { StyledButton } from '../styled/styled';
import { formatCentsAsDollars } from '../utils/textUtils';

function Cart(props) {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal
  } = useCart();
  
  const navigate = useNavigate();
  
  const handleClick = event => {
    event.preventDefault();
    props.handleClose();
    navigate('/checkout');
  };

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <>
      <h1>Total ${formatCentsAsDollars(cartTotal)}</h1>
      <StyledButton onClick={handleClick} size={'lg'}>Checkout</StyledButton>
      <br />
      <br />

      <ul style={{listStyleType : 'none', 'padding':'0%'}} >
        {items.map((item) => (
          <li style={{'padding':'4%'}} key={item.id}>
            <Row>
              <div style={{'display':'flex', 'justifyContent':'space-between'}} className='container flex'>
                <h4>{item.name}</h4>
                <h4>${formatCentsAsDollars(item.price * item.quantity)}</h4>
              </div>
              <p>(${formatCentsAsDollars(item.price)}ea)</p>
              <ButtonToolbar className="gap-2 w-fit">
                <ButtonGroup>
                  <Button style={{color: 'white'}} onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</Button>
                  <Button disabled variant='light'>{item.quantity}</Button>
                  <Button style={{color: 'white'}} onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
                </ButtonGroup>

                <Button variant='danger' onClick={() => removeItem(item.id)}>&times;</Button>
              </ButtonToolbar>
            </Row>
          </li>
        ))}
      </ul>
    </>
  );
}

Cart.propTypes = {
  handleClose: PropTypes.func
};

export default Cart;