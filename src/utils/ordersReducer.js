export default function ordersReducer (state, action) {

  switch(action.type) {


  case 'setOrders': {
    return {
      ...state,
      orders: action.data
    };
  }

  default: return state;
  }

}
