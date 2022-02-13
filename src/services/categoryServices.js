import mexiquitoApi from '../config/api';

// API HELPERS

const categories_path = '/categories';

export async function indexCategories() {

  const response = await mexiquitoApi.get(categories_path);
  return response.data;
}

export async function showCategory(id) {
  const response = await mexiquitoApi.get(`${categories_path}/${id}`);
  return response.data;
}

export async function createUpdateCategory(category) {
  
  let response;
  if (category.id) {
    response = await mexiquitoApi.put(`${categories_path}/${category.id}`, category);
  } else {
    response = await mexiquitoApi.post(categories_path, category);
  }

  return response.data;
}

export async function destroyCategory(id) {
  const response = await mexiquitoApi.delete(`${categories_path}/${id}`);

  return response.data;
}




// DISPATCHERS

export function setCategory(dispatch, category) {
  dispatch({
    type: 'setCategory',
    data: category,
  });
}

export function setCategoryValue(dispatch, name, value) {
  dispatch({
    type: 'setCategoryValue',
    name: name,
    value: value
  });
}


export function setFormValidated(dispatch, value) {
  dispatch({
    type: 'setFormValidated',
    value: value
  });
}

export function setFormValidation(dispatch, name, value) {
  dispatch({
    type: 'setFormValidation',
    name: name,
    value: value
  });
}
