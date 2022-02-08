export function setLoginCredentials(dispatch, email, jwt) {
  dispatch({
    type: 'setUser',
    data: email
  });
  dispatch({
    type: 'setToken',
    data: jwt
  });
}

export function setCategories(dispatch, categories) {
  dispatch({
    type: 'setCategories',
    data: categories
  });
}
