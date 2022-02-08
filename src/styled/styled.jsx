import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const childrenPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export const ButtonRow = ({children}) => {
  return (
    <Container className="my-5 px-0 d-flex justify-content-between">
      {children}
    </Container>
  );
};


ButtonRow.propTypes = childrenPropTypes;

export const ButtonBunch = ({children}) => {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
    }}>
      {children}
    </div>
  );
};

ButtonBunch.propTypes = childrenPropTypes;

export const MyToast = (({message, visible }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transitionProperty: 'visibility, opacity',
        transitionDuration: '0.2s',
        visibility: `${ visible ? 'visible' : 'hidden'}`,
        opacity: `${ visible ? '1' : '0'}`,
      }}>
      <div style={{
        borderRadius: '10px',
        borderWidth: '2px',
        borderColor: 'red',
        backgroundColor: 'green',
        color: 'blue',
        height: '10rem',
        width: '20rem',
      }} >
        <span style={{
          color: 'black',
          margin: '2rem',
        }}>
          {message}
        </span>
      </div>
    </div>
  );
});

MyToast.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
  visible: PropTypes.bool
};

export const Heading = ({children}) => {
  return (
    <h1>{children}</h1>
  );

};

Heading.propTypes = childrenPropTypes;

export const SubHeading = ({children}) => {
  return (
    <h3>{children}</h3>
  );

};

SubHeading.propTypes = childrenPropTypes;