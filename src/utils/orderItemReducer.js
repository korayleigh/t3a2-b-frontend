export default function orderItemReducer (state, action) {

  console.log(action);

  switch(action.type) {

  case 'setOrderItemStatuses': {
    return {
      ...state,
      order_item_statuses: action.data
    };
  }

  case 'setMenuItemOptions': {
    return {
      ...state,
      menu_item_options: action.data
    };
  }

  case 'setOrderItem': {
    return {
      ...state,
      order_item: action.data
    };
  }

  case 'setOrderItemValue': {
    return {
      ...state,
      order_item: {
        ...state.order_item,
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
        order_item: {
          ...state.validation.order_item,
          [action.name]: action.value
        }
      }
    };
  }

  default: return state;
  }

}
