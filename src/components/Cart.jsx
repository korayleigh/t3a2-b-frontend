import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useCart } from 'react-use-cart';

function Cart(props) {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();
  
  
  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <>
      <h1>Cart ({totalUniqueItems})</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.name} &mdash;
            <ButtonGroup>
              <Button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</Button>
              <Button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
              <Button variant='danger' onClick={() => removeItem(item.id)}>&times;</Button>
            </ButtonGroup>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Cart;