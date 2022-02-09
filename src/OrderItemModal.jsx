import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OrderItemForm from './OrderItemForm';


const OrderItemModal = (props) => {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OrderItemForm id={props.id} modalOnHide={props.onHide} modalOnSubmit={props.onSubmit} />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

OrderItemModal.propTypes = {
  id: PropTypes.number,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func
};

export default OrderItemModal;