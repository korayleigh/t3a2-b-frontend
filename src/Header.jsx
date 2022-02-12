import React from 'react';
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useGlobalContext } from './utils/globalContext';
import { signOut } from './services/authServices';
import { useNavigate } from 'react-router-dom';
import CartSidebar from './components/CartSidebar';
import { showToast } from './services/toastServices';
import { clearLoginCredentials } from './services/globalContextServices';
import ToastArea from './components/ToastArea';
import taco from './taco64.png';

const Header = () => {

  const {globalStore, globalDispatch} = useGlobalContext();
  const {user} = globalStore;
  const navigate = useNavigate();


  const handleLogout = () => {
    signOut()
      .then((response) => {
        console.log(response);
        sessionStorage.clear();
        clearLoginCredentials(globalDispatch);
        showToast(globalStore, globalDispatch, response.message, 'primary');
        navigate('/');
      })
      .catch(error => {
        if (error.response) {
          console.error(error.response.data.error);
          showToast(globalStore, globalDispatch, error.response.data.error, 'danger');
        } else {
          console.error(error.message);
          showToast(globalStore, globalDispatch, error.message, 'danger');
        }
        sessionStorage.clear();
      });

  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect
        style={{
          borderBottom: '5px',
          borderColor: '#6689a8',
          borderBottomStyle: 'solid',
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" href="/" className="d-flex gap-3 align-items-center">
            <img src={taco} alt=""/>
            <span >mexiqui.to</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/menu" href="/menu">Order</Nav.Link>
              <Nav.Link as={Link} to="/orderstatus" href="/orderstatus">Order Status</Nav.Link>
              { user && user.role === 'Admin' && (
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item  as={Link} to="/orders" href="/orders">Orders</NavDropdown.Item>
                  <NavDropdown.Item  as={Link} to="/categories" href="/categories">Categories</NavDropdown.Item>
                  <NavDropdown.Item  as={Link} to="#action/3.3" href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item  as={Link} to="#action/3.3" href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Nav>
              <CartSidebar as={Nav.Link}></CartSidebar>
              { user.email?
                <>
                  <Navbar.Text>{`${user.email} (${user.role})`}</Navbar.Text>
                  <Nav.Link as={Link} to="/logout" href="/logout" onClick={handleLogout}>Logout</Nav.Link>
                </>
                : <Nav.Link as={Link} to="/login" href="/login">Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastArea />
      <Container className="my-5">
        <Outlet />
      </Container>

    </>
  );
};

export default Header;