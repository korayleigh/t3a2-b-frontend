import React from 'react';
import {useGlobalContext} from '../utils/globalContext';
import { useNavigate } from 'react-router-dom';
import {ButtonRow, ButtonBunch, Heading} from '../styled/styled';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import { showToast } from '../services/toastServices';
import PropTypes from 'prop-types';
import { titleise } from '../utils/textUtils';

const ShowTable = ({item, showDestroyButton, destroyCallback, model, children}) => {

  const {store, dispatch} = useGlobalContext();
  const navigate = useNavigate();
  
  const handleButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'delete') {
      destroyCallback(item.id)
        .then(() => {
          showToast(store, dispatch,`Order '${item.name}' successfully deleted`, 'warning' );
        })
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          showToast(store, dispatch, error.message, 'danger');
        });
    } else if (event.target.name === 'edit') {
      navigate('edit', );
    } else if (event.target.name === 'back') {
      navigate(-1);
    }
  };

  
  // strip any properties of item which are sub objects or sub arrays.  Only first level scalars are allowed through the filter.
  // Object.entries returns an array of [key,value] array pairs, which can then be passed to filter and map.

  let strippedItem = null;

  if (item) {
    strippedItem = Object.entries(item).filter(([,value]) => {
      return typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'undefined' && typeof value !== 'symbol';
    });
  }


  return (
    <>
      <Heading>{`${titleise(model.singular)} Details`}</Heading>
      <Container className="my-5">
        { strippedItem ?
          <>
            <Table striped bordered hover>
              <tbody>
                {/* Split the object into key value pairs, and then filter out the values that are
                objects, functions, undefined, or symbols */}
                { strippedItem.map(([key, value]) => {
                  return (
                    <tr key={value}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {children}
            <ButtonRow>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="primary" name="edit" onClick={handleButtonClick}>{`Edit ${titleise(model.singular)}`}</Button>
                <Button style={{minWidth: '6rem'}} variant="secondary" name="back" onClick={handleButtonClick}>Back</Button>
              </ButtonBunch>
              <ButtonBunch>
                { showDestroyButton && <Button style={{minWidth: '6rem'}} variant="danger" name="delete" onClick={handleButtonClick}>{`Delete ${titleise(model.singular)}`}</Button> }
              </ButtonBunch>
            </ButtonRow>
          </>
          : 
          <>
            <Alert variant='info'>Loading...</Alert>
            <ButtonRow>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="secondary" name="back" onClick={handleButtonClick}>Back</Button> 
              </ButtonBunch>
            </ButtonRow>
          </>
        }
      </Container>
    </>
  );

};

ShowTable.propTypes = {
  item: PropTypes.object,
  showDestroyButton: PropTypes.bool,
  destroyCallback: PropTypes.func,
  model: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]) 
};

export default ShowTable;