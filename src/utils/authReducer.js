export default function authReducer (state, action) {

  switch(action.type) {


  case 'setUserValue': {
    return {
      ...state,
      user: {
        ...state.user,
        [action.name]: action.value
      }
    };
  }

  case 'setFormValidated': {
    return {
      ...state,
      validation: {
        ...state.validation,
        validated: action.data
      }
    };
  }

  case 'setFormValidation': {
    return {
      ...state,
      validation: {
        ...state.validation,
        user: {
          ...state.validation.user,
          [action.name]: action.value
        }
      }
    };
  }
  default: return state;
  }

}
