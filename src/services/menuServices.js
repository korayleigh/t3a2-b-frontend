import mexiquitoApi from '../config/api';

export async function indexMenu() {

  const response = await mexiquitoApi.get('/menu_items');
  return response.data;
}

export async function showMenuItem(id) {
  const response = await mexiquitoApi.get(`/menu_items/${id}`);
  return response.data;
}

export async function createUpdateMenuItem(menu_item) {
  
  let response;
  if (menu_item.id) {
    response = await mexiquitoApi.put(`/menu_items/${menu_item.id}`, menu_item);
  } else {
    response = await mexiquitoApi.post('/menu_items', menu_item);
  }

  return response.data;
}

export async function destroyMenuItem(id) {
  const response = await mexiquitoApi.delete(`/menu_items/${id}`);
  return response.data;
}

export function menuItemOptionList(menu) {
  return Object.values(menu).map((menu_item) => {
    return [menu_item.id, menu_item.name];
  });
}

export function setSearchText(dispatch, search_text) {
  dispatch({
    type: 'setSearch',
    data: search_text,
  });
}

export function setCategoryFilter(dispatch, category_id) {
  dispatch({
    type: 'setCategoryId',
    data: category_id,
  });
}
