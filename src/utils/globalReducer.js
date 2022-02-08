export default function globalReducer (state, action) {

  console.log('type:', action.type, 'data:', action.data);

  switch(action.type) {

  case 'setUser': {
    return {
      ...state,
      loggedInUser: action.data
    };
  }
  case 'setToken': {
    return {
      ...state,
      auth: {
        ...state.auth,
        jwt: action.data
      }
    };
  }

  case 'setCategories': {
    return {
      ...state,
      categories: action.data
    };
  }

  case 'setToasts': {
    return {
      ...state,
      toasts: action.data
    };
  }
  
  case 'setMenu': {
    return {
      ...state,
      menu: action.data
    };
  }

  default: return state;
  }
}