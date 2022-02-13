import React from 'react';
import { Button, ButtonGroup, ButtonToolbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { formatCentsAsDollars } from '../utils/textUtils';

function Cart() {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal
  } = useCart();
  
  
  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <>
      <h1>Total ${formatCentsAsDollars(cartTotal)}</h1>
      <Button as={Link} to="/checkout" href="/checkout" size={'lg'}>Checkout</Button>
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
                  <Button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</Button>
                  <Button disabled variant='light'>{item.quantity}</Button>
                  <Button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
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

export default Cart;