import { formatCentsAsDollars } from '../utils/textUtils';

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
