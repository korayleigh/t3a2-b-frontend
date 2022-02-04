import React from 'react'
import {Form, Button, FloatingLabel, Alert} from 'react-bootstrap'
import {useState} from 'react'
import {signIn} from '../services/authServices'
import {useGlobalContext} from '../utils/globalContext'
import { useNavigate } from 'react-router-dom'
import { setLoginCredentials } from '../services/globalContextServices'

const LoginForm = () => {

  const initialFormState = {
    email: '',
    password: '',
    validated: false,
    valid: false
  }

  const [formState, setFormState] = useState(initialFormState)
  const {dispatch} = useGlobalContext()
  const navigate = useNavigate()

  const handleChange = (event) => {
    setFormState({
      ...formState,
      validated: false,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormState({
      ...formState,
      validated: false
    })
    signIn(formState)
      .then(({ email, jwt }) => {
        sessionStorage.setItem('jwt', jwt)
        sessionStorage.setItem('email', email)
        setLoginCredentials(dispatch, email, jwt)
        setFormState({
          ...formState,
          validated: true,
          valid: true
        })
        navigate('/orders')
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log('Unauthorised')
          setFormState({
            ...formState,
            validated: true,
            valid: false
          })
        }
      })

  }


  return (
    <Form onSubmit={handleSubmit} noValidate >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel controlId='floatinginput' label="Email address" className='mb-3'>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={formState.email} isInvalid={formState.validated && !formState.valid} isValid={formState.validated && formState.valid} />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <FloatingLabel controlId='floadingPassword' label="Password" className='mb-3'>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}  value={formState.password} isInvalid={formState.validated && !formState.valid}isValid={formState.validated && formState.valid}  />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formButton">
        <Button variant="primary" type="submit">Submit</Button>
      </Form.Group>
      { (formState.validated && !formState.valid) && <Alert variant='danger'>Incorrect email or password</Alert> }
    </Form>
  )
}

export default LoginForm
