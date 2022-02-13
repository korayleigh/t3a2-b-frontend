import React, {useEffect, useReducer, useState} from 'react';
import { Container, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import { useNavigate , useSearchParams} from 'react-router-dom';
import { Heading, StyledFormControl, ButtonRow, ButtonBunch, StyledButton, SubHeading, PageContainer } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { setOrderValue, setFormValidated, setFormValidation, showOrderStatus, transformOrderStatus } from './services/orderServices';
import { transformOrderItems } from './services/orderItemServices';
import orderReducer from './utils/orderReducer';
import { showToast } from './services/toastServices';
import ShowTable from './components/ShowTable';
import IndexTable from './components/IndexTable';

const OrderStatus = () => {


  const [search_params, ] = useSearchParams();

  const initialFormState = { 
    order: {
      id: search_params.get('id') || '',
      email: search_params.get('email')|| '',
    },
    validation: {
      validated: false,
      order: {
        id: false,
        email: false,
      }
    }
  };

  const [formState, formDispatch] = useReducer(orderReducer, initialFormState);
  const {globalStore, globalDispatch} = useGlobalContext();
  const [order, setOrder] = useState(null);
  const [transformedOrderStatus, setTransformedOrderStatus ]= useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (formState.order.id && formState.order.email) {
      submitForm();
    }
  },[]);
    
  const handleChange = (event) => {
    setOrderValue(formDispatch, event.target.name, event.target.value);
    setFormValidated(formDispatch, false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm();
  };

  const submitForm = () => {
    if (!formState.order.id || !formState.order.email) {
      setFormValidated(formDispatch, true);
      if (!formState.order.id) {
        setFormValidation(formDispatch, 'id', false);
        showToast(globalStore, globalDispatch, 'Order Number is Required', 'danger' );
      }
      if (!formState.order.email) {
        setFormValidation(formDispatch, 'email', false);
        showToast(globalStore, globalDispatch, 'Order Email is Required', 'danger' );
      }
    } else {
      showOrderStatus(formState.order.id, formState.order.email)
        .then((order) => {
          setOrder(order);
          setTransformedOrderStatus(transformOrderStatus(order));
          setFormValidated(formDispatch, true);
          setFormValidation(formDispatch, 'id', true);
          setFormValidation(formDispatch, 'email', true);
        })
        .catch((error) => {
          globalStore.globalErrorHandler(error);
        });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };


  const order_items_columns = [{
    Header: 'id',
    accessor: 'id',
    sortType: 'basic',
    rowAlign: 'right',
  },{
    Header: 'Menu Item',
    accessor: 'menu_item',
    sortType: 'alphanumeric',
    rowAlign: 'left',
  },{
    Header: 'Status',
    accessor: 'status',
    sortType: 'alphanumeric',
    rowAlign: 'center',
  },{
    Header: 'Price',
    accessor: 'price_at_order',
    sortType: 'basic',
    rowAlign: 'right',
  },{
    Header: 'Quantity',
    accessor: 'quantity',
    sortType: 'basic',
    rowAlign: 'right',
  },{
    Header: 'Total',
    accessor: 'total',
    sortType: 'basic',
    rowAlign: 'right',
    footerAlign: 'right',
    Footer: transformedOrderStatus?.total
  }];

  return (
    <PageContainer>
      <Heading>Order Status</Heading>
      <span>Enter your order number and email</span>
      <Form className="mt-4" onSubmit={handleSubmit} >

        <Row xs={1} md={2}>
          <Col>
            <Form.Group className="mb-3" controlId="formGroupOrderNo">
              <FloatingLabel controlId='floatinginput' label="Order Number" className='mb-3'>
                <StyledFormControl type="text" placeholder="Enter Order Number" name="id" onChange={handleChange} value={formState.order.id} isInvalid={formState.validation.validated && !formState.validation.category.name} isValid={formState.validation.validated && formState.validation.category.name} />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <FloatingLabel controlId='floatinginput' label="Email" className='mb-3'>
                <StyledFormControl type="text" placeholder="Enter Email" name="email" onChange={handleChange} value={formState.order.email} isInvalid={formState.validation.validated && !formState.validation.category.name} isValid={formState.validation.validated && formState.validation.category.name} />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3 px-0" controlId="formGroupButtons">
          <ButtonRow>
            <ButtonBunch>
              <StyledButton variant="primary" type="submit">{order ? 'Update' : 'Submit'}</StyledButton>
              <StyledButton variant="secondary" type="button" onClick={handleBackClick}>Back</StyledButton>
            </ButtonBunch>
          </ButtonRow>
        </Form.Group>
      </Form>


      { order && <ShowTable item={transformedOrderStatus} model={{singular: 'order', plural:'orders'}}>
        <Container className="my-5 px-0">
          <SubHeading>Order Items</SubHeading>
          <IndexTable data={transformOrderItems(order?.order_items)} columns={order_items_columns} showFooter={true}
            getHeaderProps={() => {
              return { style: { textAlign: 'center' } };
            }}
            getCellProps={(cellInfo) => {
              return { style: { textAlign: cellInfo.column.rowAlign } };
            }}
            getFooterProps={(column) => {
              return { style: { textAlign: column.footerAlign } };
            }}
          /> 
        </Container>
      </ShowTable>
      }
    </PageContainer>
  );
};

export default OrderStatus;