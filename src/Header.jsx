import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useGlobalContext } from "./utils/globalContext";
import { signOut } from './services/authServices'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const {store} = useGlobalContext()
    const {loggedInUser} = store
	const {dispatch} = useGlobalContext()
    const navigate = useNavigate()

    const handleLogout = () => {

        signOut()
        .then(({responseStatus, message}) => {
            sessionStorage.clear()
            dispatch({
            type: 'setUser',
            data: null
            })
            dispatch({
              type: 'setToken',
              data: null
            })
            navigate('/')
        })
        .catch(error => {
            console.error(error)
            
        })

    }

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

            <Outlet />

        </>
    )
}

export default Header;