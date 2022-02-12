import { formatCentsAsDollars } from '../utils/textUtils';
import mexiquitoApi from '../config/api';
import {menuItemOptionList} from './menuServices';

const order_items_path = '/order_items';

export async function indexOrderItems() {

  const response = await mexiquitoApi.get(order_items_path);
  return response.data;
}

export async function showOrderItem(id) {
  const response = await mexiquitoApi.get(`${order_items_path}/${id}`);
  return response.data;
}

export async function createUpdateOrderItem(order) {
  
  let response;
  if (order.id) {
    response = await mexiquitoApi.put(`${order_items_path}/${order.id}`, order);
  } else {
    response = await mexiquitoApi.post(order_items_path, order);
  }

  return response.data;
}

export async function destroyOrderItem(id) {
  const response = await mexiquitoApi.delete(`${order_items_path}/${id}`);
  return response.data;
}

export async function indexOrderItemStatuses() {
  const response = await mexiquitoApi.get('/statuses');
  return response.data;
}


export async function indexPendingOrderItems() {
  const response = await mexiquitoApi.get(`${order_items_path}/pending`);
  return response.data;
}

export async function advancePendingOrderItem(order_item_id) {
  const response = await mexiquitoApi.post(`${order_items_path}/pending_advance/${order_item_id}`);
  return response.data;
}


export function transformOrderItem(order_item) {
  return {
    ...order_item,
    price_at_order: formatCentsAsDollars(order_item.price_at_order),
    total:formatCentsAsDollars(order_item.price_at_order * order_item.quantity),
  };
}

export function transformOrderItems(order_items) {
  if (order_items) {
    return Object.values(order_items).map((order_item) =>  transformOrderItem(order_item));
  } else {
    return null;
  }
}

export function setOrderItemStatuses(dispatch, statuses) {
  dispatch({
    type: 'setOrderItemStatuses',
    data: statuses,
  });
}

export function setMenuItemOptions(dispatch, menu) {
  dispatch({
    type: 'setMenuItemOptions',
    data: menuItemOptionList(menu)
  });
}

export function setOrderItem(dispatch, order_item) {
  dispatch({
    type: 'setOrderItem',
    data: order_item,
  });
}

export function setOrderItemValue(dispatch, name, value) {
  dispatch({
    type: 'setOrderItemValue',
    name: name,
    value: value,
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
