import React from 'react';
import {  Container, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { StyledTable } from '../styled/styled';
import { capitalCase } from 'change-case';

const ShowTable = ({item, children}) => {

  
  // strip any properties of item which are sub objects or sub arrays.  Only first level scalars are allowed through the filter.
  // Object.entries returns an array of [key,value] array pairs, which can then be passed to filter and map.

  let itemTopLevelProperties = null;

  if (item) {
    itemTopLevelProperties = Object.entries(item).filter(([,value]) => {
      return typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'undefined' && typeof value !== 'symbol';
    });
  }


  return (
    <>
      <Container className="my-5">
        { itemTopLevelProperties ?
          <>
            <StyledTable striped bordered hover>
              <tbody>
                {/* Split the object into key value pairs, and then filter out the values that are
                objects, functions, undefined, or symbols */}
                { itemTopLevelProperties.map(([key, value]) => {
                  return (
                    <tr key={value}>
                      <th>{capitalCase(key)}</th>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
            {children}
          </>
          : 
          <>
            <Alert variant='info'>Loading...</Alert>
          </>
        }
      </Container>
    </>
  );

};

ShowTable.propTypes = {
  item: PropTypes.object,
  model: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]) 
};

export default ShowTable;