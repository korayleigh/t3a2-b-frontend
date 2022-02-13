import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import mexiquitoApi from './config/api';
import { indexTables } from './services/orderServices';
import { showToast } from './services/toastServices';
import { PageContainer, StyledButton, StyledFormControl, StyledFormSelect } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { formatCentsAsDollars } from './utils/textUtils';


function Checkout() {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart
  } = useCart();
  
  const navigate = useNavigate();
  
  const initialFormState = {
    name: '',
    email: '',
    table: 0,
    validated: false,
    valid: false
  };
  
  const {globalStore, globalDispatch} = useGlobalContext();
  const [formState, setFormState] = useState(initialFormState);
  const [tables, setTables] = useState();

  const handleChange = (event) => {
    setFormState({
      ...formState,
      validated: false,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({
      ...formState,
      validated: true,
    });
    if (!formState.name || !formState.email) {
      if (!formState.name) {
        showToast(globalStore, globalDispatch, 'Order Name is Required', 'danger' );
      }
      if (!formState.email) {
        showToast(globalStore, globalDispatch, 'Order Email is Required', 'danger' );
      }
    } else {
        
      const itemAttributes = items.map(item => {
        return {menu_item_id: item.id, quantity: item.quantity};
      });

      const formData = {
        order: {
          name: formState.name,
          email: formState.email,
          table: formState.table,
          order_items_attributes: itemAttributes
        }     
      };


      await mexiquitoApi.post('/orders', formData)
        .then(response => {
          // navigate('/orders/'+response.data.id);
          emptyCart();
          showToast(globalStore, globalDispatch, 'Order confirmed!', 'success');
          navigate(`/orderstatus?id=${response.data.id}&email=${response.data.email}`);
        })
        .catch(error => {
          console.log(error);
          globalStore.globalErrorHandler(error);
        });
    }
  };
  
  useEffect(() => {
    indexTables()
      .then((tables) => {
        setTables(tables);
      })
      .catch(error => {
        console.log(error);
        showToast(globalStore, globalDispatch, error.message, 'danger');
      });
  },[]);

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <PageContainer>
      <div style={{'display': 'flex', 'justifyContent':'space-between'}}>
        <h1>Checkout</h1>
        <h1>Total: ${formatCentsAsDollars(cartTotal)}</h1>
      </div>
      <br />
      <Form onSubmit={handleSubmit} noValidate >
        <Row xs={1} md={4}>
          <Form.Group column={true} className='mb-3' controlId='formBasicName'>
            <FloatingLabel controlId='floatinginput' label='Name' className='mb-3'>
              <StyledFormControl type='text' variant='light' placeholder='Enter name' name='name' onChange={handleChange} value={formState.name} />
            </FloatingLabel>
          </Form.Group>
          
          <Form.Group column={true} className='mb-3' controlId='formEmail'>
            <FloatingLabel controlId='floatingEmail' label='Email' className='mb-3'>
              <StyledFormControl type='text' placeholder='Email' name='email' onChange={handleChange}  value={formState.email} />
            </FloatingLabel>
          </Form.Group>
          
          <Form.Group column={true} className="mb-3" controlId="formGroupTable">
            <FloatingLabel controlId='floatinginput' label="Order Table" className='mb-3'>
              <StyledFormSelect name="table" onChange={handleChange} value={formState.table} >
                { tables ? Object.entries(tables).map(([key,], index) => {
                  return (<option key={index} value={key}>{key}</option>);
                }) : null };
              </StyledFormSelect>
            </FloatingLabel>
          </Form.Group>
          
          <Form.Group column={true} className='mb-3' controlId='formButton'>
            <StyledButton variant='primary' type='submit'>Confirm Order</StyledButton>
          </Form.Group>
        </Row>
      </Form>

      <div style={{'display': 'flex', 'justifyContent':'space-between'}}>
      </div>
      <p>You will need your email to check your order status.</p>
      <br />
      <Table variant='light' striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return(
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <ButtonToolbar className='gap-2'>
                    <ButtonGroup size={'sm'}>
                      <Button size={'sm'} onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</Button>
                      <Button size={'sm'} disabled variant='light'>{item.quantity}</Button>
                      <Button size={'sm'} onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
                    </ButtonGroup>

                    <Button size={'sm'} variant='danger' onClick={() => removeItem(item.id)}>&times;</Button>
                  </ButtonToolbar>
                </td>
                <td>${formatCentsAsDollars(item.price)}</td>
                <td style={{'fontWeight':'bold'}}>${formatCentsAsDollars(item.price * item.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      
    </PageContainer>
  );
}

export default Checkout;