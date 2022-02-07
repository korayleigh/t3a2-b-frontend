import React, { useEffect, useState } from 'react';
import { Container, Form, FloatingLabel, Alert, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { showCategory, createUpdateCategory } from './services/categoryServices';
import Heading from './components/Heading';
import { ButtonBunch, ButtonRow } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';

const CategoryForm = () => {

  const initialFormState = { 
    validated: false,
    valid: false,
    message: '',
    category: {
      name: ''
    }
  };
  
  const {store, dispatch} = useGlobalContext();
  const [ formState, setFormState ] = useState(initialFormState);
  const {category} = formState;
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      showCategory(params.id)
        .then((category) => {
          setFormState({
            ...formState,
            category: category
          });
        })
        .catch(error => console.log(error));
    }
  },[params.id]);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      validated: false,
      category: {
        ...formState.category,
        [event.target.name]: event.target.value
      }
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!category.name) {
      setFormState({
        ...formState,
        validated: true,
        valid: category.name ? true : false,
        message: !category.name && 'Category Name is Required'
      });
    } else {
      createUpdateCategory(category)
        .then(() => {
          const newToast =  {
            message: `Category '${category.name}' successfully ${category.id ? 'updated' : 'created'}`,
            variant: 'success',
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
          setFormState({
            ...formState,
            validated: true,
            valid: false,
            message: error.response.error
          });
        });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  console.log('name', category.name);
  console.log('message', formState.message);
  
  
  return (
    <>
      <Heading>{ category.id ? 'Edit Category' : 'New Category' }</Heading>
      <Container className="my-5">
        <Form onSubmit={handleSubmit} >

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId='floatinginput' label="Category Name" className='mb-3'>
              <Form.Control type="text" placeholder="Enter Category Name" name="name" onChange={handleChange} value={category.name} isInvalid={formState.validated && !formState.valid} isValid={formState.validated && formState.valid} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formButton">
            <ButtonRow>
              <ButtonBunch>
                <Button style={{minWidth: '6rem'}} variant="primary" type="submit">Submit</Button>
                <Button style={{minWidth: '6rem'}} variant="secondary" type="button" onClick={handleBackClick}>Back</Button>
              </ButtonBunch>
            </ButtonRow>
          </Form.Group>
          { (formState.validated) && <Alert variant={formState.valid ? 'success' : 'danger'}>{formState.message}</Alert> }
        </Form>
      </Container>
    </>
  );
};

// CategoryForm.propTypes = {
//   mode: PropTypes.string
// };

export default CategoryForm;