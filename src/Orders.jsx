import React from 'react';
import { useEffect, useState  } from 'react';
import { indexOrders, transformOrder } from './services/orderServices';
import IndexTable from './components/IndexTable';
import { showToast } from './services/toastServices';
import { useGlobalContext } from './utils/globalContext';

const Orders = () => {

  const initialState = {
    orders: []
  };

  // const [store, dispatch] = useReducer(ordersReducer, initialState);
  const [state, setState] = useState(initialState);
  const {store, dispatch} = useGlobalContext();

  useEffect(() => {
    indexOrders()
      .then(orders => {
        setState({
          ...state,
          orders: Object.values(orders)
        });
      })
      .catch(error => {
        console.log(error);
        showToast(store, dispatch, error.message, 'danger');
      });
  },[]);

  const columns = [{
    Header: 'id',
    accessor: 'id',
    sortType: 'basic',
    rowAlign: 'left',
  },{
    Header: 'Name',
    accessor: 'name',
    sortType: 'alphanumeric',
    rowAlign: 'left',
  },{
    Header: 'Email',
    accessor: 'email',
    sortType: 'alphanumeric',
    rowAlign: 'left',
  },{
    Header: 'Table',
    accessor: 'table',
    sortType: 'alphanumeric',
    rowAlign: 'left',
  },{
    Header: 'Items',
    accessor: 'items',
    sortType: 'basic',
    rowAlign: 'right',
  },{
    Header: 'Total',
    accessor: 'total',
    sortType: 'basic',
    rowAlign: 'right',
  }];

  const transformed_orders=Object.values(state.orders).map(order => {
    return transformOrder(order);  
  });

  return (
    <div>
      <IndexTable data={transformed_orders} columns={columns} model={{singular: 'order', plural: 'orders'}} showNewButton={false} allowRowClick={true}
        getHeaderProps={() => {
          return { style: { textAlign: 'center' } };
        }}
        getCellProps={(cellInfo) => {
          return { style: { textAlign: cellInfo.column.rowAlign } };
        }}
      />
    </div>
  );
};

export default Orders;