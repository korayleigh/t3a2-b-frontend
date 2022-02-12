import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, FloatingLabel, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import mexiquitoApi from './config/api';
import { indexTables } from './services/orderServices';
import { showToast } from './services/toastServices';
import { StyledButton } from './styled/styled';
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
    table: '',
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

    console.log(`DATA: ${itemAttributes}`);

    await mexiquitoApi.post('/orders', formData)
      .then(response => {
        navigate('/orders/'+response.data.id);
        emptyCart();
        showToast(globalStore, globalDispatch, 'Order confirmed!', 'success');
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    indexTables()
      .then((tables) => {
        console.log(tables);
        setTables(tables);
      })
      .catch(error => {
        console.log(error);
        showToast(globalStore, globalDispatch, error.message, 'danger');
      });
  },[]);

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <>
      <div style={{'display': 'flex', 'justifyContent':'space-between'}}>
        <h1>Checkout</h1>
        <h1>Total: ${formatCentsAsDollars(cartTotal)}</h1>
      </div>
      <br />
      <div style={{'display': 'flex', 'justifyContent':'space-between'}}>
        <Form onSubmit={handleSubmit} noValidate >
          <Form.Group className='mb-3' controlId='formBasicName'>
            <FloatingLabel controlId='floatinginput' label='Name' className='mb-3'>
              <Form.Control type='text' variant='light' placeholder='Enter name' name='name' onChange={handleChange} value={formState.name} />
            </FloatingLabel>
          </Form.Group>
          
          <Form.Group className='mb-3' controlId='formEmail'>
            <FloatingLabel controlId='floatingEmail' label='Email' className='mb-3'>
              <Form.Control type='text' placeholder='Email' name='email' onChange={handleChange}  value={formState.email} />
            </FloatingLabel>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formGroupTable">
            <FloatingLabel controlId='floatinginput' label="Order Table" className='mb-3'>
              <Form.Select name="table" onChange={handleChange} value={formState.table} >
                { tables ? Object.entries(tables).map(([key,], index) => {
                  return (<option key={index} value={key}>{key}</option>);
                }) : null };
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          
          <Form.Group className='mb-3' controlId='formButton'>
            <StyledButton variant='primary' type='submit'>Confirm Order</StyledButton>
          </Form.Group>
        </Form>
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
      
    </>
  );
}

export default Checkout;