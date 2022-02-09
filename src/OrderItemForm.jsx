import React, { useEffect, useReducer } from 'react';
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap';
import { showOrderItem, createUpdateOrderItem, indexOrderItemStatuses, setOrderItemStatuses, setOrderItem, setOrderItemValue, setMenuItemOptions} from './services/orderItemServices';
import { ButtonBunch, ButtonRow, Heading } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { showToast } from './services/toastServices';
import { formatCentsAsDollars } from './utils/textUtils';
import { indexMenu } from './services/menuServices';  
import { setMenu } from './services/globalContextServices';
import orderItemReducer from './utils/orderItemReducer';
import PropTypes from 'prop-types';
import { setFormValidated, setFormValidation } from './services/orderServices';
import { capitalise } from './utils/textUtils';

const OrderItemForm = ({id, modalOnHide, modalOnSubmit}) => {

  const initialFormState = { 
    order_item : {
      menu_item_id: '',
      quantity: '',
      price_at_order: '',
      status: '',
      request: '',
    },
    order_item_statuses : {},
    menu_item_options: [],
    validation: {
      validated: false,
      order_item: {
        quantity: false,
        price: false,
      }
    }
  };
  
  const {store: globalStore, dispatch: globalDispatch} = useGlobalContext();
  const [ formState, formDispatch ] = useReducer(orderItemReducer, initialFormState);
  const {order_item} = formState;


  useEffect(() => {
    if (globalStore.menu.length) {
      setMenuItemOptions(formDispatch, globalStore.menu);
    } else {
      indexMenu()
        .then((menu) => {
          setMenu(globalDispatch, menu);
          setMenuItemOptions(formDispatch, menu);
        }) 
        .catch(error => {
          console.log(error);
          showToast(globalStore, globalDispatch, error.message, 'danger');
        });
    }
    indexOrderItemStatuses()
      .then((statuses) => {
        setOrderItemStatuses(formDispatch, statuses);
      })
      .catch(error => {
        console.log(error);
        showToast(globalStore, globalDispatch, error.message, 'danger');
      });
    showOrderItem(id)
      .then((order_item) => {
        setOrderItem(formDispatch, order_item);
      })
      .catch(error => {
        console.log(error);
        showToast(globalStore, globalDispatch, error.message, 'danger');
      });
  },[id]);

  const handleChange = (event) => {
    if (event.target.name === 'price_at_order') {
      setOrderItemValue(formDispatch, event.target.name, parseInt(event.target.value * 100));
    } else {
      setOrderItemValue(formDispatch, event.target.name, event.target.value);
    }
    setFormValidated(formDispatch, false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;

    ['quantity', 'price'].forEach((field) => {
      if (order_item[field] < 1) {
        setFormValidation(formDispatch, field, false );
        showToast(globalStore, globalDispatch, `${capitalise(field)} must be > 0`, 'danger' );
        valid=false;
      }
    });

    if (valid) {
      createUpdateOrderItem(order_item)
        .then(() => {
          setFormValidated(formDispatch, true);
          setFormValidation(formDispatch, 'quantity', true);
          setFormValidation(formDispatch, 'price', true);
          showToast(globalStore, globalDispatch, 'Order successfully updated', 'success');
          modalOnSubmit();
          modalOnHide();
        })
        .catch((error) => {
          console.error(error);
          showToast(globalStore, globalDispatch, error.message, 'danger');
        });
    }
  };

  const handleBackClick = () => {
    modalOnHide();
  };

  // console.log('formStateOrderItem', formState.order_item);
  // console.log('formStatuses;', Object.entries(formState.order_item_statuses));
  // console.log()
  
  return (
    <>
      <Heading>Edit Order Item</Heading>
      <Container className="my-5">
        <Form onSubmit={handleSubmit} >

          {/* MENU ITEM */}
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Menu Item" className='mb-3'>
              <Form.Select type="text" placeholder="Enter Menu Item " name="menu_item_id" onChange={handleChange} value={order_item.menu_item_id} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name}>
                {formState.menu_item_options.map(([menu_item_id, menu_item_name]) => {
                  return (<option key={menu_item_id} value={menu_item_id}>{menu_item_name}</option>);
                })}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          {/* QUANTITY */}
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Quantity" className='mb-3'>
              <Form.Control type="number" placeholder="Quantity " name="quantity" onChange={handleChange} value={order_item.quantity} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name} />
            </FloatingLabel>
          </Form.Group>

          {/* PRICE */}
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Price" className='mb-3'>
              <Form.Control type="text" placeholder="Price " name="price_at_order" onChange={handleChange} value={formatCentsAsDollars(order_item.price_at_order)} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name} />
            </FloatingLabel>
          </Form.Group>

          {/* STATUS */}
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Status" className='mb-3'>
              <Form.Select type="text" placeholder="Status" name="status" onChange={handleChange} value={order_item.status} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name}>
                {order_item.status && Object.entries(formState.order_item_statuses).map(([status, id]) => {
                  return (<option key={id} value={status}>{status}</option>);
                })}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          {/* REQUEST */}
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Any Requests?" className='mb-3'>
              <Form.Control as="textarea" rows={3} placeholder="Request a modification" name="request" onChange={handleChange} value={order_item.request} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupButtons">
            <ButtonRow>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="primary" type="submit">Submit</Button>
                <Button style={{minWidth: '6rem'}} variant="secondary" type="button" onClick={handleBackClick}>Back</Button>
              </ButtonBunch>
            </ButtonRow>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

OrderItemForm.propTypes = {
  id: PropTypes.number,
  modalOnHide: PropTypes.func,
  modalOnSubmit: PropTypes.func,
};

export default OrderItemForm;