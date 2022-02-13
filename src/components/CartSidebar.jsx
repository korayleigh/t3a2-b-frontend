import { React, useState } from 'react';
import {Offcanvas, NavLink} from 'react-bootstrap';
import Cart from './Cart';
import { useCart } from 'react-use-cart';


function CartSidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { totalUniqueItems } = useCart();

  return (
    <>
      <NavLink onClick={handleShow}>Cart ({totalUniqueItems > 0 ? totalUniqueItems : null})</NavLink>

      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>mexiqui.to </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart handleClose={handleClose}></Cart>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartSidebar;