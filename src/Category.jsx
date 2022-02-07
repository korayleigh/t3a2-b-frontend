import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import {useGlobalContext} from './utils/globalContext';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from './components/Heading';
import { destroyCategory, indexCategories } from './services/categoryServices';
import { setCategories } from './services/globalContextServices';
import { ButtonRow, ButtonBunch } from './styled/styled';

const Category = () => {

  const {store, dispatch} = useGlobalContext();
  const params = useParams();
  const navigate = useNavigate();

  const initialState = {
    messageGood: true,
    message: ''
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log('length:', store.categories.length);
    if (!store.categories.length) {
      console.log('no categories in state so get them');
      indexCategories()
        .then(categories => {
          setCategories(dispatch ,categories);
        })
        .catch(error => console.log(error));
    }
    
  },[]);

  const category = store.categories[params.id];


  const handleButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'delete') {
      destroyCategory(category.id)
        .then(() => {
          // setState({
          //   messageGood: true,
          //   message: `${category.name} successfully deleted`
          // });
          const newToast =  {
            message: `Category '${category.name}' successfully deleted`,
            variant: 'danger',
            show: true
          };
          dispatch({
            type: 'setToasts',
            data: [
              ...store.toasts,  
              newToast
            ]
          });
        })
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          setState({
            ...state,
            message: error.message
          });
        });
    } else if (event.target.name === 'edit') {
      navigate('edit', );
    } else if (event.target.name === 'back') {
      navigate(-1);
    }
  };
  
  return (
    <>
      <Heading>Show Category</Heading>
      <Container className="my-5">
        { category ?
          <>
            <Table striped bordered hover>
              <tbody>
                { Object.entries(category).map(([key, value]) => {
                  return (
                    <tr key={value}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ButtonRow>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="primary" name="edit" onClick={handleButtonClick}>Edit</Button>
                <Button style={{minWidth: '6rem'}} variant="secondary" name="back" onClick={handleButtonClick}>Back</Button>
              </ButtonBunch>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="danger" name="delete" onClick={handleButtonClick}>Delete</Button>
              </ButtonBunch>
            </ButtonRow>
            { state.message && <Alert variant={state.good ? 'success' : 'danger'}>{state.message}</Alert>}
          </>
          : 
          <>
            <Alert variant='danger'>Category not found</Alert>
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

export default Category;
