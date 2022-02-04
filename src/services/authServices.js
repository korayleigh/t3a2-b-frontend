import mexiquitoApi from '../config/api'

export async function signIn({email, password}) {

  const response = await mexiquitoApi.post('/users/sign_in', {
    'user': {
      'email': email,
      'password': password
    }
  })
  
  return {
    // responseStatus: response.status,
    email: response.data.email,
    jwt: response.headers.authorization
  }
}

export async function signOut() {

  const response = await mexiquitoApi.delete('/users/sign_out', {})

  return {
    responseStatus: response.status,
    message: response.data.message
  }
}
