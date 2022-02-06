import React from 'react';
import PropTypes from 'prop-types';

const OrdersTableRow = ({order}) => {

  return (
    <tr key={order.id}>
      <td>{order.created}</td>
      <td>{order.table}</td>
      <td>{order.name}</td>
      <td>{order.total}</td>
    </tr>
  );
};

OrdersTableRow.propTypes = {
  order: PropTypes.object
};

export default OrdersTableRow;