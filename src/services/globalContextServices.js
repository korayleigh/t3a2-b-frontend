export function setLoginCredentials(dispatch, email, jwt, role) {
  dispatch({
    type: 'setLoginCredentials',
    data: {
      email: email,
      role: role,
      jwt: jwt,
    }
  });
}

export function setRole(dispatch, role) {
  dispatch({
    type: 'setRole',
    data: role,
  });
}

export function clearLoginCredentials(dispatch) {
  dispatch({
    type: 'clearLoginCredentials',
  });
}

export function setCategories(dispatch, categories) {
  dispatch({
    type: 'setCategories',
    data: categories
  });
}

export function setOrders(dispatch, orders) {
  dispatch({
    type: 'setOrders',
    data: orders
  });
}

export function setMenu(dispatch, menu) {
  dispatch({
    type: 'setMenu',
    data: menu
  });
}
