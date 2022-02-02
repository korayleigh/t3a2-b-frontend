import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Header = ()=> {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">MEXIQUITO BANNER</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/order">Order</Nav.Link>
                        <Nav.Link href="/orderstatus">Order Status</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>

            <Outlet />

        </>
    )
}

export default Header;