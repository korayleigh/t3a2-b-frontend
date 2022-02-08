import React from 'react';
import { Container, Navbar, Nav, NavDropdown, ToastContainer, Toast , Collapse} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useGlobalContext } from './utils/globalContext';
import { signOut } from './services/authServices';
import { useNavigate } from 'react-router-dom';
import { deleteToast } from './services/toastServices';

const Header = () => {

  const {store, dispatch} = useGlobalContext();
  const {loggedInUser} = store;
  const navigate = useNavigate();


  const handleLogout = () => {

    signOut()
      .then(() => {
        sessionStorage.clear();
        dispatch({
          type: 'setUser',
          data: null
        });
        dispatch({
          type: 'setToken',
          data: null
        });
        navigate('/');
      })
      .catch(error => {
        console.error(error);
            
      });

  };

  const handleDeleteToast = (toast) => {
    deleteToast(store, dispatch, toast);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">MEXIQUITO BANNER</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/order" href="/order">Order</Nav.Link>
              <Nav.Link as={Link} to="/orderstatus" href="/orderstatus">Order Status</Nav.Link>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item  as={Link} to="/orders" href="/orders">Orders</NavDropdown.Item>
                <NavDropdown.Item  as={Link} to="/categories" href="/categories">Categories</NavDropdown.Item>
                <NavDropdown.Item  as={Link} to="#action/3.3" href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item  as={Link} to="#action/3.3" href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              { loggedInUser
                ? <>
                  <Navbar.Text>{loggedInUser}</Navbar.Text>
                  <Nav.Link as={Link} to="/logout" href="/logout" onClick={handleLogout}>Logout</Nav.Link>
                </>
                : <Nav.Link as={Link} to="/login" href="/login">Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          minHeight: '100vh',
          minWidth: '100vw',
          pointerEvents: 'none',
          zIndex: '999',
          height: '100%',
          width: '100%',
        }}
      >
        <ToastContainer position='top-end' className="p-4">
          {store.toasts.map((toast, index) => {
            return (
              <Toast bg={toast.variant} key={index} delay={2000} show={toast.show} animation transition={Collapse} autohide={true} onClose={() => handleDeleteToast(toast)}
                style={{
                  transitionProperty: 'opacity, visibility',
                  transitionDelay: '2s',
                }}
              >
                <Toast.Header>
                  <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                  <strong className="me-auto">Mexiquito</strong>
                  <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body
                  style={{
                    color: 'white',
                  }}
                >{toast.message}</Toast.Body>
              </Toast>
            );
          })}
        </ToastContainer>
      </div>
      <Container className="my-5">
        <Outlet />
      </Container>

    </>
  );
};

export default Header;