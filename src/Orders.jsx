import React from 'react';
import { useEffect, useReducer } from 'react';
import ordersReducer from './utils/ordersReducer';
import { indexOrders, setOrders } from './services/orderServices';
import IndexTable from './components/IndexTable';

const Orders = () => {

  const initialState = {
    orders: {}
  };

  const [store, dispatch] = useReducer(ordersReducer, initialState);

  useEffect(() => {
    indexOrders()
      .then(orders => {
        setOrders(dispatch, orders);
      })
      .catch(error => console.log(error));
  },[]);

  const columns = [{
    Header: 'id',
    accessor: 'id',
    sortType: 'basic'
  },{
    Header: 'Name',
    accessor: 'name',
    sortType: 'alphanumeric',
  }];

  return (
    <div>
      <h1>Orders</h1>
      <IndexTable data={store.orders} columns={columns}  />
    </div>
  );
};

export default Orders;