import React, {useState, useEffect} from 'react';
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useGlobalContext } from './utils/globalContext';
import { signOut } from './services/authServices';
import { useNavigate } from 'react-router-dom';
import CartSidebar from './components/CartSidebar';
import { showToast } from './services/toastServices';
import ToastArea from './components/ToastArea';
import taco from './taco64.png';
import { Footer } from './styled/styled';
import { getUserRole } from './services/authServices';
import { clearLoginCredentials, setRole } from './services/globalContextServices';

const Header = () => {

  const {globalStore, globalDispatch} = useGlobalContext();
  const {user} = globalStore;
  const navigate = useNavigate();

  const [roleRequested, setRoleRequested] = useState(false);

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
        globalStore.globalErrorHandler(error);
        sessionStorage.clear();
      });

  };


  useEffect(() => {
    if (globalStore.user.email && !globalStore.user.role) {
      if (!roleRequested) {
        getUserRole()
          .then((role) => {
            setRole(globalDispatch, role);
          })
          .catch((error) => {
            globalStore.globalErrorHandler(error);
          });
        setRoleRequested(true);
      }

    }
  }),[user.jwt];


  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect fixed="top"
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
                  <NavDropdown.Item  as={Link} to="/pending" href="/pending">Pending Items</NavDropdown.Item>
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
      <Outlet />
      <Footer />

    </>
  );
};

export default Header;