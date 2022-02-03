import LoginForm from "./components/LoginForm";
import {Container} from 'react-bootstrap'


const Login = () => {
    return (
        <div>

            <Container className="my-5">

            <h1>Login</h1>
            <LoginForm />
            </Container>

        </div>
    );
}

export default Login;

