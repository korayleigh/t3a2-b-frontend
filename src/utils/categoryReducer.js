export default function categoryReducer (state, action) {

  switch(action.type) {


  case 'setCategory': {
    return {
      ...state,
      category: action.data
    };
  }

  case 'setTables': {
    return {
      ...state,
      tables: action.data
    };
  }

  case 'setCategoryValue': {
    return {
      ...state,
      category: {
        ...state.category,
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
        category: {
          ...state.validation.category,
          [action.name]: action.value
        }
      }
    };
  }

  default: return state;
  }

}
