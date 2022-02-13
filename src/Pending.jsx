import React, {  useEffect, useMemo, useState } from 'react';
import IndexTable from './components/IndexTable';
import { indexPendingOrderItems, advancePendingOrderItem } from './services/orderItemServices';
import {Heading, PageContainer} from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { formatDate } from './utils/textUtils';
import { Alert } from 'react-bootstrap';

const Pending = () => {


  const [pendingItems, setPendingItems] = useState([]);
  const {globalStore} = useGlobalContext();

  const transformPendingItems = (pending_item) => {
    return {
      ...pending_item,
      created_at: formatDate(pending_item.created_at, 'short'),
      updated_at: formatDate(pending_item.updated_at, 'short'),
    };
  };

  useEffect(() => {
    indexPendingOrderItems()
      .then((pending_items) => {
        setPendingItems(Object.values(pending_items).map((pending_item) => {
          return transformPendingItems(pending_item);
        }));
      })
      .catch((error) => {
        globalStore.globalErrorHandler(error);
      });
  },[]);

  const pending_items_columns = useMemo(() => {
    return [{
      Header: 'Created',
      accessor: 'created_at',
      sortType: 'alphanumeric',
    },{
      Header: 'id',
      accessor: 'id',
      sortType: 'basic'
    },{
      Header: 'Order',
      accessor: 'order_id',
      sortType: 'basic',
    },{
      Header: 'Item',
      accessor: 'menu_item',
      sortType: 'alphanumeric',
    },{
      Header: 'Qty',
      accessor: 'quantity',
      sortType: 'alphanumeric',
    },{
      Header: 'Status',
      accessor: 'status',
      sortType: 'alphanumeric',
    },];
  },[pendingItems]);

  const handleRowClick = (row) => {
    advancePendingOrderItem(row)
      .then((pending_items) => {
        setPendingItems(Object.values(pending_items).map((pending_item) => {
          return transformPendingItems(pending_item);
        }));
      })
      .catch((error) => {
        globalStore.globalErrorHandler(error);
      });
  };

  return (
    <PageContainer>
      <Heading>Pending Items</Heading>
      <IndexTable data={pendingItems} columns={pending_items_columns} showFooter={false} onRowClick={handleRowClick} />
      { pendingItems.length ? <Alert variant='info'>Click a row to advance status</Alert> : null}
    </PageContainer>
  );

};

export default Pending;