import React from 'react';
import PropTypes from 'prop-types';
import { Container , Button, Table, Form, Navbar } from 'react-bootstrap';

const childrenPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export const ButtonRow = ({children}) => {
  return (
    <Container className="p-0 d-flex flex-column flex-sm-row justify-content-between"
      style={{
        gap: '1rem',
      }}>
      {children}
    </Container>
  );
};


ButtonRow.propTypes = childrenPropTypes;

export const ButtonBunch = ({children}) => {
  return (
    <Container className="m-0 p-0 d-flex flex-column flex-sm-row"
      style={{
        gap: '1rem',
        width: 'unset',
      }}>
      {children}
    </Container>
  );
};

ButtonBunch.propTypes = childrenPropTypes;

export const StyledButton = (props) => {
  return (
    <Button
      style={{
        minWidth: '6rem',
        color: 'white',
      }}
      {...props}
    />
  );
};

StyledButton.propTypes = childrenPropTypes;

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

export const StyledTable = (props) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
      }}
    >

      <Table
        {...props}
        style={{
          margin: '0',
        }}
      />
    </div>
  );
};

export const StyledFormControl = (props) => {
  return (
    <Form.Control
      style={{
        backgroundColor: 'white',
      }}
      {...props}
    />
  );
};

export const StyledFormSelect = (props) => {
  return (
    <Form.Select
      style={{
        backgroundColor: 'white',
      }}
      {...props}
    />
  );
};

export const Footer = () => {
  return (
    <div
      className="fixed-bottom"
      // style={{
      //   borderTop: '5px',
      //   borderTopStyle: 'solid',
      //   borderTopColor: '#6689a8',
      //   backgroundColor: '#66a878',
      //   color: 'white',
      // }}
    >  
      <Navbar
        bg="primary" variant="dark"
        style={{
          borderTop: '5px',
          borderTopStyle: 'solid',
          borderTopColor: '#6689a8',
          height: '3rem',
        }}
      >
        <Container>
          <span
            style={{
              color: 'white',
              fontSize:'smaller',
            }}
          >Taco icon copyright 2020 Twitter, Inc and other contributors, licensed under CC-BY 4.0</span>
          {/* <NavbarBrand className="dark"
          >Taco icon copyright 2020 Twitter, Inc and other contributors, licensed under CC-BY 4.0</NavbarBrand> */}
        </Container>
      </Navbar>
    </div>
  );
};


export const PageContainer = (props) => {
  return (
    <Container className="my-5"
      style={{
        padding: '3rem 0',
      }}
      {...props}
    />
  );
};