import React, { useEffect, useReducer } from 'react';
import { Container, Form, FloatingLabel } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { showOrder, createUpdateOrder, indexTables, setFormValidation, setFormValidated } from './services/orderServices';
import { ButtonBunch, ButtonRow, Heading, StyledButton, StyledFormControl, StyledFormSelect, PageContainer } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { showToast } from './services/toastServices';
import { capitalCase } from 'change-case';
import {setTables, setOrder, setOrderValue } from './services/orderServices';
import orderReducer from './utils/orderReducer';

const OrderForm = () => {

  const initialFormState = { 
    order: {
      email: '',
      name: '',
      table: ''
    },
    validation: {
      validated: false,
      order: {
        name: false,
        email: false,
        table: false
      }
    },
    tables: {}
  };

  
  const {globalStore, globalDispatch} = useGlobalContext();
  const [ formState, formDispatch ] = useReducer(orderReducer, initialFormState);
  const {order} = formState;
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (params.id) {
      indexTables()
        .then((tables) => {
          setTables(formDispatch, tables);
        })
        .then(() => {
          return showOrder(params.id);
        })
        .then((order) => {
          setOrder(formDispatch, order);
        })
        .catch(error => {
          globalStore.globalErrorHandler(error);
        });
    }
  },[params.id]);

  const handleChange = (event) => {
    setOrderValue(formDispatch, event.target.name, event.target.value);
    setFormValidated(formDispatch, false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setFormValidated(formDispatch, true);
    if (!order.name || !order.email) {
      if (!order.name) {
        setFormValidation(formDispatch, 'name', false);
        showToast(globalStore, globalDispatch, 'Order Name is Required', 'danger' );
      }
      if (!order.email) {
        setFormValidation(formDispatch, 'email', false);
        showToast(globalStore, globalDispatch, 'Order Email is Required', 'danger' );
      }
    } else {
      createUpdateOrder(order)
        .then(() => {
          setFormValidation(formDispatch, 'name', true);
          setFormValidation(formDispatch, 'email', true);
          setFormValidation(formDispatch, 'table', true);
          showToast(globalStore, globalDispatch, `Order successfully ${order.id ? 'updated' : 'created'}`, 'success');
        })
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          globalStore.globalErrorHandler(error);
        });
      
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  
  return (
    <PageContainer>
      <Heading>{`${capitalCase(location.pathname.split('/').pop())} Order`}</Heading>
      <Container className="my-5">
        <Form onSubmit={handleSubmit} >

          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Order Name" className='mb-3'>
              <StyledFormControl type="text" placeholder="Enter Order Name" name="name" onChange={handleChange} value={order.name} isInvalid={formState.validation.validated && !formState.validation.order.name} isValid={formState.validation.validated && formState.validation.order.name} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <FloatingLabel controlId='floatinginput' label="Order Email" className='mb-3'>
              <StyledFormControl type="email" placeholder="Enter Order Email" name="email" onChange={handleChange} value={order.email} isInvalid={formState.validation.validated && !formState.validation.order.email} isValid={formState.validation.validated && formState.validation.order.email} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupTable">
            <FloatingLabel controlId='floatinginput' label="Order Table" className='mb-3'>
              <StyledFormSelect name="table" onChange={handleChange} value={order.table} isInvalid={formState.validation.validated && !formState.validation.order.table} isValid={formState.validation.validated && formState.validation.order.table}>
                { Object.entries(formState.tables).map(([key,], index) => {
                  return (<option key={index} value={key}>{key}</option>);
                })};
              </StyledFormSelect>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupButtons">
            <ButtonRow>
              <ButtonBunch>
                <StyledButton variant="primary" type="submit">Submit</StyledButton>
                <StyledButton variant="secondary" type="button" onClick={handleBackClick}>Back</StyledButton>
              </ButtonBunch>
            </ButtonRow>
          </Form.Group>
        </Form>
      </Container>
    </PageContainer>
  );
};

// OrderForm.propTypes = {
//   mode: PropTypes.string
// };

export default OrderForm;