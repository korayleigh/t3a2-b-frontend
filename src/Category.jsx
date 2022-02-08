import React, { useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import {useGlobalContext} from './utils/globalContext';
import { useNavigate, useParams } from 'react-router-dom';
import { destroyCategory, indexCategories } from './services/categoryServices';
import { setCategories } from './services/globalContextServices';
import { ButtonRow, ButtonBunch, Heading } from './styled/styled';
import { showToast } from './services/toastServices';

const Category = () => {

  const {store, dispatch} = useGlobalContext();
  const params = useParams();
  const navigate = useNavigate();

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
          showToast(store, dispatch,`Category '${category.name}' successfully deleted`, 'warning' );
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
