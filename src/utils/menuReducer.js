export default function menuReducer (state, action) {

  console.log('action: ', action);

  switch(action.type) {

  case 'setSearch': {
    return {
      ...state,
      search: action.data
    };
  }

  case 'setCategoryId': {
    return {
      ...state,
      category_id: action.data
    };
  }

  default: return state;
  }

}

