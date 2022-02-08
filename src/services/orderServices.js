import mexiquitoApi from '../config/api';

const orders_path = '/orders';

export async function indexOrders() {

  const response = await mexiquitoApi.get(orders_path);
  return response.data;
}

export async function showOrder(id) {
  const response = await mexiquitoApi.get(`${orders_path}/${id}`);
  return response.data;
}

export async function createUpdateOrder(order) {
  
  let response;
  if (order.id) {
    response = await mexiquitoApi.put(`${orders_path}/${order.id}`, order);
  } else {
    response = await mexiquitoApi.post(orders_path, order);
  }

  return response.data;
}

export async function destroyOrder(id) {
  const response = await mexiquitoApi.delete(`${orders_path}/${id}`);

  return response.data;
}

export function setOrders(dispatch, orders) {
  dispatch({
    type: 'setOrders',
    data: orders
  });
}