import { React, useState } from 'react';
import {Offcanvas, NavLink} from 'react-bootstrap';
import Cart from './Cart';


function CartSidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavLink onClick={handleShow}>Cart</NavLink>

      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>mexiqui.to </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart></Cart>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartSidebar;