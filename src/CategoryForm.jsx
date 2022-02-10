import React, { useEffect, useState } from 'react';
import { Container, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { showCategory, createUpdateCategory } from './services/categoryServices';
import { ButtonBunch, ButtonRow, Heading, StyledButton } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { showToast } from './services/toastServices';
import { capitalise } from './utils/textUtils';

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
  const location = useLocation();

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
                ...category,
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
      <Heading>{`${capitalise(location.pathname.split('/').pop())} Category`}</Heading>
      <Container className="my-5">
        <Form onSubmit={handleSubmit} >

          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Category Name" className='mb-3'>
              <Form.Control type="text" placeholder="Enter Category Name" name="name" onChange={handleChange} value={category.name} isInvalid={formState.validation.validated && !formState.validation.category.name} isValid={formState.validation.validated && formState.validation.category.name} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupButtons">
            <ButtonRow>
              <ButtonBunch>
                <StyledButton variant="primary" type="submit">Submit</StyledButton>
                <StyledButton variant="secondary" type="button" onClick={handleBackClick}>Back</StyledButton>
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