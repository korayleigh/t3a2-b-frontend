import React, { useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import {useGlobalContext} from './utils/globalContext';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from './components/Heading';
import { destroyOrder, indexOrders } from './services/orderServices';
import { setOrders } from './services/globalContextServices';
import { ButtonRow, ButtonBunch } from './styled/styled';
import { showToast } from './services/toastServices';

const Order = () => {

  const {store, dispatch} = useGlobalContext();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('length:', store.orders.length);
    if (!store.orders.length) {
      console.log('no orders in state so get them');
      indexOrders()
        .then(orders => {
          setOrders(dispatch ,orders);
        })
        .catch(error => console.log(error));
    }

  },[]);

  const order = store.orders[params.id];


  const handleButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'delete') {
      destroyOrder(order.id)
        .then(() => {
          showToast(store, dispatch,`Order '${order.name}' successfully deleted`, 'warning' );
        })
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          showToast(store, dispatch, error.message, 'danger');
        });
    } else if (event.target.name === 'edit') {
      navigate('edit', );
    } else if (event.target.name === 'back') {
      navigate(-1);
    }
  };

  return (
    <>
      <Heading>Show Order</Heading>
      <Container className="my-5">
        { order ?
          <>
            <Table striped bordered hover>
              <tbody>
                { Object.entries(order).map(([key, value]) => {
                  return (
                    <tr key={value}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ButtonRow>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="primary" name="edit" onClick={handleButtonClick}>Edit</Button>
                <Button style={{minWidth: '6rem'}} variant="secondary" name="back" onClick={handleButtonClick}>Back</Button>
              </ButtonBunch>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="danger" name="delete" onClick={handleButtonClick}>Delete</Button>
              </ButtonBunch>
            </ButtonRow>
          </>
          : 
          <>
            <Alert variant='danger'>Order not found</Alert>
            <ButtonRow>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="secondary" name="back" onClick={handleButtonClick}>Back</Button>
              </ButtonBunch>
            </ButtonRow>
          </>
        }
      </Container>
    </>
  );

};

export default Order;