export default function globalReducer (state, action) {

  switch(action.type) {

  case 'setEmail': {
    return {
      ...state,
      user: {
        ...state.user,
        email: action.data
      }
    };
  }
  case 'setToken': {
    return {
      ...state,
      user: {
        ...state.user,
        jwt: action.data
      }
    };
  }
  case 'setRole': {
    return {
      ...state,
      user: {
        ...state.user,
        role: action.data
      }
    };
  }

  case 'setLoginCredentials': {
    return {
      ...state,
      user: action.data
    };
  }

  case 'clearLoginCredentials': {
    return {
      ...state,
      user: {
        email: null,
        role: null,
        jwt: null,
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