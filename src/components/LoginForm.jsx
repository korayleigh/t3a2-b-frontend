import React, {useReducer} from 'react';
import {Container, Form, FloatingLabel} from 'react-bootstrap';
import {setFormValidated, setFormValidation, setUserValue, signIn} from '../services/authServices';
import authReducer from '../utils/authReducer';
import {useGlobalContext} from '../utils/globalContext';
import { useNavigate } from 'react-router-dom';
import { setLoginCredentials } from '../services/globalContextServices';
import { ButtonRow, StyledButton, StyledFormControl } from '../styled/styled';
import { showToast } from '../services/toastServices';


const LoginForm = () => {

  const initialFormState = {
    user: {
      email: '',
      password: '',
    },
    validation: {
      validated: false,
      user: {
        email: false,
        password: false,
      }
    }
  };

  const [formState, formDispatch] = useReducer(authReducer, initialFormState);
  const {globalStore, globalDispatch} = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserValue(formDispatch, event.target.name, event.target.value );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.user.email || !formState.user.password) {
      setFormValidated(formDispatch, true);
      setFormValidation(formDispatch, 'email', !!formState.user.email);
      setFormValidation(formDispatch, 'password', !!formState.user.password);
      showToast(globalStore, globalDispatch, 'email and password are required', 'danger');
    } else {
      setFormValidated(formDispatch, false);
      signIn(formState.user)
        .then(({ email, jwt, role, message }) => {
          sessionStorage.setItem('jwt', jwt);
          sessionStorage.setItem('email', email);
          setLoginCredentials(globalDispatch, email, jwt, role);
          showToast(globalStore, globalDispatch, message, 'success');
          navigate('/orders');
        })
        .catch(error => {
          globalStore.globalErrorHandler(error);
          setFormValidated(formDispatch, true);
          setFormValidation(formDispatch, 'email', false);
          setFormValidation(formDispatch, 'password', false);
        });
    }
  };  

  return (
    <Container className="my-5 p-0">

      <Form onSubmit={handleSubmit} noValidate >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId='floatinginput' label="Email address" className='mb-3'>
            <StyledFormControl type="email" placeholder="Enter email" name="email" onChange={handleChange} value={formState.user.email} isInvalid={formState.validation.validated && !formState.validation.user.email} isValid={formState.validation.validated && formState.validation.user.email} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId='floadingPassword' label="Password" className='mb-3'>
            <StyledFormControl type="password" placeholder="Password" name="password" onChange={handleChange}  value={formState.user.password} isInvalid={formState.validation.validated && !formState.validation.user.password} isValid={formState.validation.validated && formState.validation.user.password}  />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formButton">
          <Container className="my-5 p-0">
            <ButtonRow>
              <StyledButton variant="primary" type="submit">Submit</StyledButton>
            </ButtonRow>
          </Container>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default LoginForm;
