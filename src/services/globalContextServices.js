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
