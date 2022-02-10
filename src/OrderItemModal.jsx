import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OrderItemForm from './OrderItemForm';


const OrderItemModal = ({order_item_id, order_id, onHide, onSubmit, ...restProps}) => {

  return (
    <Modal
      onHide={onHide}
      {...restProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OrderItemForm order_item_id={order_item_id} order_id={order_id} modalOnHide={onHide} modalOnSubmit={onSubmit} />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</StyledButton>
      </Modal.Footer> */}
    </Modal>
  );
};

OrderItemModal.propTypes = {
  order_item_id: PropTypes.number,
  order_id: PropTypes.number,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func
};

export default OrderItemModal;