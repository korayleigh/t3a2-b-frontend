import mexiquitoApi from '../config/api';

export async function getCategories() {

  const response = await mexiquitoApi.get('/categories');
  return response.data;
}
