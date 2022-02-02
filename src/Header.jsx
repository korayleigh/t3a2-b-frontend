import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Header = ()=> {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">MEXIQUITO BANNER</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/order">Order</Nav.Link>
                        <Nav.Link as={Link} to="/orderstatus">Order Status</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>

            <Outlet />

        </>
    )
}

export default Header;