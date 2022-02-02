import {Form, Button} from 'react-bootstrap'
import {useState} from 'react'

const LoginForm = () => {

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleEmailChange} value={email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handlePasswordChange}  value={password} />
      </Form.Group>
      <Button variant="primary" type="submit">
          Submit
      </Button>
    </Form>
  )
}

export default LoginForm