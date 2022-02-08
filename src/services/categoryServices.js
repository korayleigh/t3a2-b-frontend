import mexiquitoApi from '../config/api';

export async function indexCategories() {

  const response = await mexiquitoApi.get('/categories');
  return response.data;
}

export async function showCategory(id) {
  const response = await mexiquitoApi.get(`/categories/${id}`);
  return response.data;
}

export async function createUpdateCategory(category) {
  
  let response;
  if (category.id) {
    response = await mexiquitoApi.put(`/categories/${category.id}`, category);
  } else {
    response = await mexiquitoApi.post('/categories', category);
  }

  return response.data;
}

export async function destroyCategory(id) {
  const response = await mexiquitoApi.delete(`/categories/${id}`);

  return response.data;
}