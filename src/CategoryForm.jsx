import React, { useEffect, useState } from 'react';
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { showCategory, createUpdateCategory } from './services/categoryServices';
import { ButtonBunch, ButtonRow, Heading } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { showToast } from './services/toastServices';

const CategoryForm = () => {

  const initialFormState = { 
    category: {
      name: ''
    },
    validation: {
      validated: false,
      category: {
        name: false,
      }
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
      category: {
        ...formState.category,
        [event.target.name]: event.target.value
      },
      validation: {
        ...formState.validation,
        validated: false
      }
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!category.name) {
      setFormState({
        ...formState,
        validation: {
          ...formState.validation,
          validated: true,
          category: {
            name: false
          },
        }
      });
      showToast(store, dispatch, 'Category Name is Required', 'danger' );
    } else {
      createUpdateCategory(category)
        .then(() => {
          setFormState({
            ...formState,
            validation: {
              ...formState.validation,
              validated: true,
              category: {
                name: false
              },
            },
          });
          showToast(store, dispatch, `Category '${category.name}' successfully ${category.id ? 'updated' : 'created'}`, 'success');
        })
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          showToast(store, dispatch, error.message, 'danger');
        });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <>
      <Heading>{ category.id ? 'Edit Category' : 'New Category' }</Heading>
      <Container className="my-5">
        <Form onSubmit={handleSubmit} >

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel controlId='floatinginput' label="Category Name" className='mb-3'>
              <Form.Control type="text" placeholder="Enter Category Name" name="name" onChange={handleChange} value={category.name} isInvalid={formState.validation.validated && !formState.validation.category.name} isValid={formState.validation.validated && formState.validation.category.name} />
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
        </Form>
      </Container>
    </>
  );
};

// CategoryForm.propTypes = {
//   mode: PropTypes.string
// };

export default CategoryForm;