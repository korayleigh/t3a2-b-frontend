import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {useGlobalContext} from './utils/globalContext';
import { useParams } from 'react-router-dom';
import { showOrder, destroyOrder, transformOrder } from './services/orderServices';
import { transformOrderItems } from './services/orderItemServices';
import { showToast } from './services/toastServices';
import ShowTable from './components/ShowTable';
import IndexTable from './components/IndexTable';
import OrderItemModal from './OrderItemModal';

const Order = () => {

  const {store, dispatch} = useGlobalContext();
  const [order, setOrder] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalId, setModalId] = useState(null);
  const params = useParams();
    
  useEffect(() => {
    showOrder(params.id)
      .then((order) => {
        setOrder(order);
      })
      .catch((error) => {
        console.log(error);
        showToast(store, dispatch, error.message, 'danger');
      });
    console.log('refresh!');
  },[]);

  const transformed_order = transformOrder(order);

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
    setModalId(id);
    setModalShow(true);
  };

  const handleModalOnHide = () => {
    setModalShow(false);
  };

  const handleModalSubmit = () => {
    showOrder(params.id)
      .then((order) => {
        setOrder(order);
      });
  };

  return (
    <>
      <ShowTable item={transformed_order} showDestroyButton={true} destroyCallback={destroyOrder} model={{singular: 'order', plural:'orders'}}>
        <Container className="my-5 px-0">
          <IndexTable data={transformOrderItems(order?.order_items)} columns={order_items_columns} model={{singular: 'order item', plural:'order items'}} showNewButton={false} showFooter={true} allowRowClick={true} onRowClick={handleRowClick} subHeading={true}
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
      <OrderItemModal id={modalId} show={modalShow} onHide={handleModalOnHide} onSubmit={handleModalSubmit} />
    </>
  );
};

export default Order;