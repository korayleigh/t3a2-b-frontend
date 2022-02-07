import mexiquitoApi from '../config/api';

export async function getOrders() {

  const response = await mexiquitoApi.get('/orders');
  return response.data;
}
