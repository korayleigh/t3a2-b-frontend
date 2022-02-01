import { Link, Outlet } from "react-router-dom";

const Header = ()=> {
    return (
        <div>
            <nav> 
                <Link to="/">Home</Link> | <Link to="/Order">Order</Link> |{' '}
                <Link to="/orderstatus">Order Status</Link> | <Link to='login'>Staff Login</Link>
            </nav>
            <h1>MEXIQUITO BANNER</h1>
            <Outlet />
        </div>
    )
}

export default Header;