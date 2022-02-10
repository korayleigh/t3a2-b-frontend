import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ButtonBunch, ButtonRow, StyledButton } from './styled/styled';


const YesNoModal = ({prompt, onYes, onNo, yes_variant, no_variant, yes_text, no_text , ...restProps}) => {

  const handleYesClick = () => {
    onYes();
  };

  const handleNoClick = () => {
    onNo();
  };

  return (
    <Modal
      onHide={handleNoClick}
      {...restProps}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem 2rem',
          }}
        >
          <span>{prompt}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonRow>
          <ButtonBunch>
            <StyledButton name="no" variant={no_variant} onClick={handleNoClick}>{no_text}</StyledButton>
          </ButtonBunch>
          <ButtonBunch>
            <StyledButton name="yes" variant={yes_variant} onClick={handleYesClick}>{yes_text}</StyledButton>
          </ButtonBunch>
        </ButtonRow>
      </Modal.Footer>
    </Modal>
  );
};

YesNoModal.propTypes = {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  yes_text: PropTypes.string,
  no_text: PropTypes.string,
  yes_variant: PropTypes.string,
  no_variant: PropTypes.string,
  prompt: PropTypes.string
};

export default YesNoModal;