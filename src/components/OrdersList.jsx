import React from 'react';
import { useEffect, useReducer } from 'react';
import ordersReducer from '../utils/ordersReducer';
import { getOrders, setOrders } from '../services/ordersServices';

const OrdersList = () => {

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
      <table>
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
              <tr key={order.id}>
                <td>{order.created}</td>
                <td>{order.table}</td>
                <td>{order.name}</td>
                <td>{order.total/100.0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};


export default OrdersList;
