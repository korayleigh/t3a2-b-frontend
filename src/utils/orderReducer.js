export default function orderReducer (state, action) {

  switch(action.type) {


  case 'setOrder': {
    return {
      ...state,
      order: action.data
    };
  }

  case 'setTables': {
    return {
      ...state,
      tables: action.data
    };
  }

  case 'setOrderValue': {
    return {
      ...state,
      order: {
        ...state.order,
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
        order: {
          ...state.validation.order,
          [action.name]: action.value
        }
      }
    };
  }
  default: return state;
  }

}
