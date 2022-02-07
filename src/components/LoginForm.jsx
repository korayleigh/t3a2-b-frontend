import React from 'react';
import {Form, Button, FloatingLabel} from 'react-bootstrap';
import {useState} from 'react';
import {signIn} from '../services/authServices';
import {useGlobalContext} from '../utils/globalContext';
import { useNavigate } from 'react-router-dom';
import { setLoginCredentials } from '../services/globalContextServices';
import { ButtonRow } from '../styled/styled';
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

  const [formState, setFormState] = useState(initialFormState);
  const {store, dispatch} = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormState({
      ...formState,
      user: {
        ...formState.user,
        [event.target.name]: event.target.value
      },
      validation: {
        ...formState.validation,
        validated: false,
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.user.email || !formState.user.password) {
      setFormState({
        ...formState,
        validation: {
          ...formState.validation,
          validated: true,
          user: {
            ...formState.validation.user,
            email: !!formState.user.email,
            password: !!formState.user.password
          }
        }
      });
      showToast(store, dispatch, 'email and password are required', 'danger');
    } else {

      setFormState({
        ...formState,
        validation: {
          ...formState.validation,
          validated: false
        },
      });
      signIn(formState.user)
        .then(({ email, jwt }) => {
          sessionStorage.setItem('jwt', jwt);
          sessionStorage.setItem('email', email);
          setLoginCredentials(dispatch, email, jwt);
          showToast(store, dispatch, 'Successfully logged in', 'success');
          navigate('/orders');
        })
        .catch(error => {
          if (error.response.status === 401) {
            showToast(store, dispatch, 'Incorrect email or password', 'danger');
            setFormState({
              ...formState,
              validation: {
                ...formState.validation,
                validated: false,
                user: {
                  email: false,
                  password: false,
                },
              },
            
            });
          }
        });
    }
  };


  return (
    <Form onSubmit={handleSubmit} noValidate >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel controlId='floatinginput' label="Email address" className='mb-3'>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={formState.user.email} isInvalid={formState.validation.validated && !formState.validation.user.email} isValid={formState.validation.validated && formState.validation.user.email} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <FloatingLabel controlId='floadingPassword' label="Password" className='mb-3'>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}  value={formState.user.password} isInvalid={formState.validation.validated && !formState.validation.user.password} isValid={formState.validation.validated && formState.validation.user.password}  />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formButton">
        <ButtonRow>
          <Button style={{minWidth: '6rem'}} variant="primary" type="submit">Submit</Button>
        </ButtonRow>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
