import React, { useEffect, useState } from 'react';
import { ButtonRow, ButtonBunch, StyledButton, Heading, SubHeading } from './styled/styled';
import { Container } from 'react-bootstrap';
import {useGlobalContext} from './utils/globalContext';
import { useParams, useNavigate } from 'react-router-dom';
import { showOrder, transformOrder } from './services/orderServices';
import { destroyOrder } from './services/orderServices';
import { transformOrderItems } from './services/orderItemServices';
import { showToast } from './services/toastServices';
import ShowTable from './components/ShowTable';
import IndexTable from './components/IndexTable';
import OrderItemModal from './OrderItemModal';
import YesNoModal from './YesNoModal';

const Order = () => {

  const {globalStore, globalDispatch} = useGlobalContext();
  const [order, setOrder] = useState(null);
  const [orderItemModalShow, setOrderItemModalShow] = useState(false);
  const [orderItemModalId, setOrderItemModalId] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
    
  useEffect(() => {
    showOrder(params.id)
      .then((order) => {
        setOrder(order);
      })
      .catch((error) => {
        globalStore.globalErrorHandler(error);
      });
  },[]);

  const transformed_order = transformOrder(order);

  
  const handleButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'delete') {
      setDeleteModalShow(true);
    } else if (event.target.name === 'edit') {
      navigate('edit', );
    } else if (event.target.name === 'newOrderItem') {
      setOrderItemModalId(null);
      setOrderItemModalShow(true);
    } else if (event.target.name === 'back') {
      navigate(-1);
    }
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
    Footer: transformed_order?.total
  }];

  const handleRowClick = (id) => {
    setOrderItemModalId(id);
    setOrderItemModalShow(true);
  };

  const handleOrderItemModalOnHide = () => {
    setOrderItemModalShow(false);
  };

  const handleOrderItemModalSubmit = () => {
    showOrder(params.id)
      .then((order) => {
        setOrder(order);
      });
  };

  const handleDeleteModalConfirm = () => {
    destroyOrder(params.id)
      .then(() => {
        showToast(globalStore, globalDispatch,`Order '${transformed_order.name}' successfully deleted`, 'warning' );
      })
      .then(() => {
        navigate(-1);
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
      <Heading>Order Details</Heading>
      <ShowTable item={transformed_order} model={{singular: 'order', plural:'orders'}}>
        <Container className="my-5 px-0">
          <SubHeading>Order Items</SubHeading>
          <IndexTable data={transformOrderItems(order?.order_items)} columns={order_items_columns} showFooter={true} onRowClick={handleRowClick}
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
      <ButtonRow>
        <ButtonBunch>
          { order && 
          <>
            <StyledButton variant="primary" name="edit" onClick={handleButtonClick}>Edit Order</StyledButton>
            <StyledButton variant="primary" name="newOrderItem" onClick={handleButtonClick}>Add Item</StyledButton>
          </>
          }
          <StyledButton variant="secondary" name="back" onClick={handleButtonClick}>Back</StyledButton>
        </ButtonBunch>
        <ButtonBunch>
          <StyledButton variant="danger" name="delete" onClick={handleButtonClick}>Delete Order</StyledButton>
        </ButtonBunch>
      </ButtonRow>
      { order && <OrderItemModal order_item_id={orderItemModalId} order_id={order?.id} show={orderItemModalShow} onHide={handleOrderItemModalOnHide} onSubmit={handleOrderItemModalSubmit} /> }
      <YesNoModal show={deleteModalShow} prompt="Are you sure?" onYes={handleDeleteModalConfirm} onNo={handleDeleteModalCancel} yes_text="Delete" no_text="Cancel" yes_variant="danger" no_variant="secondary" />
    </>
  );
};

export default Order;