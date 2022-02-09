import mexiquitoApi from '../config/api';

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