import mexiquitoApi from '../config/api';

// API HELPERS

export async function signIn({email, password}) {

  const response = await mexiquitoApi.post('/users/sign_in', {
    'user': {
      'email': email,
      'password': password
    }
  });
  
  return {
    email: response.data.email,
    role: response.data.role,
    message: response.data.message,
    jwt: response.headers.authorization
  };
}

export async function signOut() {

  const response = await mexiquitoApi.delete('/users/sign_out');

  return {
    responseStatus: response.status,
    message: response.data.message
  };
}

export async function getUserRole() {
  const response = await mexiquitoApi.get('/users/show');

  return response.data.role;
}

export const setUserValue = (dispatch, name, value) => {
  dispatch({
    type: 'setUserValue',
    name: name,
    value: value,
  });
};

export const setFormValidated = (dispatch, data) => {
  dispatch({
    type: 'setFormValidated',
    data: data,
  });
};

export const setFormValidation = (dispatch, name, value) => {
  dispatch({
    type: 'setFormValidation',
    name: name,
    value: value,
  });
};