import React, { useEffect, useReducer } from 'react';
import { Container, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { showCategory, createUpdateCategory, setCategory, setCategoryValue, setFormValidated, setFormValidation } from './services/categoryServices';
import { ButtonBunch, ButtonRow, Heading, StyledButton, StyledFormControl } from './styled/styled';
import { useGlobalContext } from './utils/globalContext';
import { showToast } from './services/toastServices';
import { capitalCase } from 'change-case';
import categoryReducer from './utils/categoryReducer';


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
  
  const {globalStore, globalDispatch} = useGlobalContext();
  const [ formState, formDispatch ] = useReducer(categoryReducer, initialFormState);
  const {category} = formState;
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (params.id) {
      showCategory(params.id)
        .then((category) => {
          setCategory(formDispatch, category);
        })
        .catch(error => console.log(error));
    }
  },[params.id]);

  const handleChange = (event) => {
    setCategoryValue(formDispatch, event.target.name, event.target.value);
    setFormValidated(formDispatch, false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setFormValidated(formDispatch, true);
    if (!category.name) {
      setFormValidation(formDispatch, 'name', false);
      showToast(globalStore, globalDispatch, 'Category Name is Required', 'danger' );
    } else {
      createUpdateCategory(category)
        .then(() => {
          setFormValidation(formDispatch, 'name', true);
          showToast(globalStore, globalDispatch, `Category '${category.name} 'successfully ${category.id ? 'updated' : 'created'}`, 'success');
        })
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          showToast(globalStore, globalDispatch, error.message, 'danger');
        });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <>
      <Heading>{`${capitalCase(location.pathname.split('/').pop())} Category`}</Heading>
      <Container className="my-5">
        <Form onSubmit={handleSubmit} >

          <Form.Group className="mb-3" controlId="formGroupName">
            <FloatingLabel controlId='floatinginput' label="Category Name" className='mb-3'>
              <StyledFormControl type="text" placeholder="Enter Category Name" name="name" onChange={handleChange} value={category.name} isInvalid={formState.validation.validated && !formState.validation.category.name} isValid={formState.validation.validated && formState.validation.category.name} />
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

export default CategoryForm;