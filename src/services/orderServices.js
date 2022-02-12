import mexiquitoApi from '../config/api';
import { formatCentsAsDollars } from '../utils/textUtils';

// API HELPERS

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

export async function indexTables() {
  const response = await mexiquitoApi.get('/tables');
  return response.data;
}

export async function showOrderStatus(id, email) {
  const response = await mexiquitoApi.post(`${orders_path}/status/${id}`, {email: email});
  return response.data;
}


// DISPATCHERS

export function setOrder(dispatch, order) {
  dispatch({
    type: 'setOrder',
    data: order
  });
}

export function setTables(dispatch, tables) {
  dispatch({
    type: 'setTables',
    data: tables
  });
}

export function setOrderValue(dispatch, name, value) {
  dispatch({
    type: 'setOrderValue',
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

export function transformOrder(order) {
  if (order) {
    return {
      ...order,
      total: formatCentsAsDollars(order.total),
      created_at: new Date(order.created_at).toLocaleString('en-AU', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'
      }),
    };
  } else {
    return null;
  }
}


export function transformOrderStatus(order) {
  if (order) {
    return {
      table: order.table,
      name: order.name,
      items: order.items,
      total: formatCentsAsDollars(order.total),
      created_at: formatDate(order.created_at),
    };
  } else {
    return null;
  }
}

