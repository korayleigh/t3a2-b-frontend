import React from 'react';
import { useEffect, useReducer } from 'react';
import ordersReducer from '../utils/ordersReducer';
import { getOrders } from '../services/ordersServices';
import { setOrders } from '../services/globalContextServices';
import {Table} from 'react-bootstrap';
import OrdersTableRow from './OrdersTableRow';

const OrdersTable = () => {

  const initialState = {
    orders: {}
  };

  const [store, dispatch] = useReducer(ordersReducer, initialState);

  useEffect(() => {
    getOrders()
      .then(orders => {
        setOrders(dispatch, orders);
      })
      .catch(error => console.log(error));
  },[]);


  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Created</th>
            <th>Table</th>
            <th>Name</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(store.orders).map(order => {
            return (
              <OrdersTableRow key={order.id} order={order} />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};


export default OrdersTable;
