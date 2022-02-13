import React, { useEffect, useReducer, useState } from 'react';
import { Container, Form, FloatingLabel } from 'react-bootstrap';
import { showOrderItem, createUpdateOrderItem, indexOrderItemStatuses, setOrderItemStatuses, setOrderItem, setOrderItemValue, setMenuItemOptions, destroyOrderItem} from './services/orderItemServices';
import { ButtonBunch, ButtonRow, Heading, StyledButton, StyledFormControl, StyledFormSelect } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { showToast } from './services/toastServices';
import { formatCentsAsDollars, formatDollarsAsCents} from './utils/textUtils';
import { indexMenu } from './services/menuServices';  
import { setMenu } from './services/globalContextServices';
import orderItemReducer from './utils/orderItemReducer';
import PropTypes from 'prop-types';
import { setFormValidated, setFormValidation } from './services/orderServices';
import { capitalCase } from 'change-case';
import YesNoModal from './YesNoModal';

const OrderItemForm = ({order_item_id, order_id, modalOnHide, modalOnSubmit}) => {

  const initialFormState = { 
    order_item : {
      order_id: null,
      menu_item_id: 0,
      quantity: '1',
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
  
  const {globalStore, globalDispatch} = useGlobalContext();
  const [ formState, formDispatch ] = useReducer(orderItemReducer, initialFormState);
  const {order_item} = formState;
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    if (globalStore.menu.length) {
      setupMenuOptions(globalStore.menu);
    } else {
      indexMenu()
        .then((menu) => {
          setMenu(globalDispatch, menu);
          return menu;
        })
        .then((menu) => {
          setupMenuOptions(menu);
        }) 
        .catch(error => {
          globalStore.globalErrorHandler(error);
        });
    }
    indexOrderItemStatuses()
      .then((statuses) => {
        setOrderItemStatuses(formDispatch, statuses);
      })
      .catch(error => {
        globalStore.globalErrorHandler(error);
      });
    if (order_item_id) {
      showOrderItem(order_item_id)
        .then((order_item) => {
          setOrderItem(formDispatch, order_item);
        })
        .catch(error => {
          globalStore.globalErrorHandler(error);
        });
    } else {
      setOrderItemValue(formDispatch, 'order_id', order_id);
    }
  },[order_item_id]);

  const setupMenuOptions = (menu) => {
    // Build the array of options for the menu item select box
    setMenuItemOptions(formDispatch, menu);
    // set the value of the menu_item_id in form state to the first item in the options.
    setOrderItemValue(formDispatch, 'menu_item_id', menu[0].id);
  };

  const handleChange = (event) => {
    if (event.target.name === 'price_at_order') {
      setOrderItemValue(formDispatch, event.target.name, formatDollarsAsCents(event.target.value));
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
        showToast(globalStore, globalDispatch, `${capitalCase(field)} must be > 0`, 'danger' );
        valid=false;
      }
    });

    if (valid) {
      createUpdateOrderItem(order_item)
        .then((order_item) => {
          console.log(order_item);
          setFormValidated(formDispatch, true);
          setFormValidation(formDispatch, 'quantity', true);
          setFormValidation(formDispatch, 'price', true);
          showToast(globalStore, globalDispatch, 'Order successfully updated', 'success');
          modalOnSubmit();
          modalOnHide();
        })
        .catch((error) => {
          globalStore.globalErrorHandler(error);
        });
    }
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    setDeleteModalShow(true);
  };


  const handleBackClick = () => {
    modalOnHide();
  };

  const handleDeleteModalConfirm = () => {
    destroyOrderItem(order_item.id)
      .then(() => {
        modalOnSubmit();
        modalOnHide();
      })
      .catch((error) => {
        globalStore.globalErrorHandler(error);
      });
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalShow(false);
  };


  return (
    <>
      <Heading>{ order_item.id ? 'Edit' : 'Add'} Order Item</Heading>
      <Container className="my-5">
        <Form onSubmit={handleSubmit} >

          {/* MENU ITEM */}
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Menu Item" className='mb-3'>
              <StyledFormSelect type="text" placeholder="Enter Menu Item " name="menu_item_id" onChange={handleChange} value={order_item.menu_item_id} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name}>
                {formState.menu_item_options.map(([menu_item_id, menu_item_name]) => {
                  return (<option key={menu_item_id} value={menu_item_id}>{menu_item_name}</option>);
                })}
              </StyledFormSelect>
            </FloatingLabel>
          </Form.Group>

          {/* QUANTITY */}
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Quantity" className='mb-3'>
              <StyledFormControl type="number" placeholder="Quantity " name="quantity" onChange={handleChange} value={order_item.quantity} min={1} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name} />
            </FloatingLabel>
          </Form.Group>

          {/* PRICE */}
          {  order_item.id && 
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Price" className='mb-3'>
              <StyledFormControl type="text" placeholder="Price " name="price_at_order" onChange={handleChange} value={formatCentsAsDollars(order_item.price_at_order)} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name} />
            </FloatingLabel>
          </Form.Group>
          }

          {/* STATUS */}
          {  order_item.id && 
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Status" className='mb-3'>
              <StyledFormSelect type="text" placeholder="Status" name="status" onChange={handleChange} value={order_item.status} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name}>
                {order_item.status && Object.entries(formState.order_item_statuses).map(([status, id]) => {
                  return (<option key={id} value={status}>{status}</option>);
                })}
              </StyledFormSelect>
            </FloatingLabel>
          </Form.Group>
          }

          {/* REQUEST */}
          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Any Requests?" className='mb-3'>
              <StyledFormControl as="textarea" rows={3} placeholder="Request a modification" name="request" onChange={handleChange} value={order_item.request} isInvalid={formState.validation.validated && !formState.validation.order_item.name} isValid={formState.validation.validated && formState.validation.order_item.name} />
            </FloatingLabel>
          </Form.Group>

          {/* BUTTONS */}
          <Form.Group className="mb-3" controlId="formGroupButtons">
            <ButtonRow>
              <ButtonBunch>
                <StyledButton variant="primary" type="submit">Submit</StyledButton>
                <StyledButton variant="secondary" type="button" name="back" onClick={handleBackClick}>Back</StyledButton>
              </ButtonBunch>
              <ButtonBunch>
                { order_item.id && <StyledButton variant="danger" type="button" name="delete" onClick={handleDeleteClick}>Delete</StyledButton> }
              </ButtonBunch>
            </ButtonRow>
          </Form.Group>
        </Form>
        <YesNoModal show={deleteModalShow} prompt="Are you sure?" onYes={handleDeleteModalConfirm} onNo={handleDeleteModalCancel} yes_text="Delete" no_text="Cancel" yes_variant="danger" no_variant="secondary" />
      </Container>
      
    </>
  );
};

OrderItemForm.propTypes = {
  order_item_id: PropTypes.number,
  modalOnHide: PropTypes.func,
  modalOnSubmit: PropTypes.func,
  order_id: PropTypes.number,
};

export default OrderItemForm;