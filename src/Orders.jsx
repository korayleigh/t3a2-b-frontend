import React, { useEffect, useState  } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { indexOrders, transformOrder } from './services/orderServices';
import IndexTable from './components/IndexTable';
import { showToast } from './services/toastServices';
import { useGlobalContext } from './utils/globalContext';
import { ButtonRow, ButtonBunch, StyledButton, Heading } from './styled/styled';

const Orders = () => {

  const initialState = {
    orders: {}
  };

  // const [store, dispatch] = useReducer(ordersReducer, initialState);
  const [state, setState] = useState(initialState);
  const {orders} = state;
  const [loaded, setLoaded] = useState(false);
  const {store, dispatch} = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    indexOrders()
      .then(orders => {
        setState({
          ...state,
          orders: Object.values(orders)
        });
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
        showToast(store, dispatch, error.message, 'danger');
      });
  },[]);


  const handleRowClick = (row_id) => {
    navigate(String(row_id));
  };


  
  const handleButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'new') {
      navigate('new');
    } else if (event.target.name === 'back') {
      navigate(-1);
    }
  };



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

  const transformed_orders=Object.values(orders).map(order => {
    return transformOrder(order);  
  });

  return (
    orders.length ? 
      <>
        <Heading>Orders</Heading>
        <IndexTable data={transformed_orders} columns={columns} onRowClick={handleRowClick}
          getHeaderProps={() => {
            return { style: { textAlign: 'center' } };
          }}
          getCellProps={(cellInfo) => {
            return { style: { textAlign: cellInfo.column.rowAlign } };
          }}
        />
        <ButtonRow>
          <ButtonBunch>
            <StyledButton variant="primary" name="new" onClick={handleButtonClick}>New Order</StyledButton>
            <StyledButton variant="secondary" name="back" onClick={handleButtonClick}>Back</StyledButton>
          </ButtonBunch>
        </ButtonRow>
      </>
      :
      loaded && <Alert variant='info'>No Categories!</Alert>
  );
};

export default Orders;