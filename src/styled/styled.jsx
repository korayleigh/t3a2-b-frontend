import React from 'react';
import PropTypes from 'prop-types';

const nodePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export const ButtonRow = ({children}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      {children}
    </div>
  );
};


ButtonRow.propTypes = nodePropTypes;

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

ButtonBunch.propTypes = nodePropTypes;

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