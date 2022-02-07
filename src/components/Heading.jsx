import React from 'react';
import PropTypes from 'prop-types';

const Heading = (props) => {
  const {children} = props;
  return (
    <h1>{children}</h1>
  );

};

Heading.propTypes = {
  children: PropTypes.string
};

export default Heading;
