import React, { useEffect } from 'react';
import {Form, FloatingLabel, Alert} from 'react-bootstrap';
import {useState} from 'react';
import { ButtonBunch, ButtonRow, StyledButton, StyledFormControl, StyledFormSelect } from '../styled/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../utils/globalContext';
import { createUpdateMenuItem, showMenuItem } from '../services/menuServices';
import { showToast } from '../services/toastServices';
import { indexCategories } from '../services/categoryServices';


const MenuItemForm = () => {

  const initialFormState = {
    name: '',
    price: '',
    description: '',
    category_id: '',
    image: null,
    validated: false,
    valid: false
  };

  const {globalStore, globalDispatch} = useGlobalContext();
  const [formState, setFormState] = useState(initialFormState);
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    indexCategories()
      .then(categories => {
        setCategories(categories);
      })
      .then(() => {
        if (params.id) {
          return showMenuItem(params.id);
        }
        return initialFormState;
      })
      .then(menuItem => {
        if(params.id){
          delete menuItem.image;
        }

        console.log(menuItem);
        setFormState(menuItem);
      })
      .catch(error => {
        console.log(error);
        showToast(globalStore, globalDispatch, error.message, 'danger');
      });
  }, []);
  
  const handleButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'back') {
      navigate(-1);
    }
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      validated: false,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('price', formState.price);
    formData.append('description', formState.description);
    formData.append('category_id', formState.category_id);
    console.log("FORMSTATE HAS IMAGE? before send")
    console.log(formState.image !== null ? 'TRUE' : 'FALSE')
    console.log(formState.image)
    
    if (formState.image){
      formData.append('image', formState.image);
    }
    if (params.id) {
      formData.append('id', params.id);
    }

    createUpdateMenuItem(formData);
    showToast(globalStore, globalDispatch, `Menu Item successfully ${formData.get('id') ? 'updated' : 'created'}`, 'success');
    navigate('/menuitems');
  };
  
  const handleImageChange = event => { 
    setFormState({ ...formState, image: event.target.files[0] });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate >
      <Form.Group className="mb-3" controlId="formBasicName">
        <FloatingLabel controlId='floatinginput' label="Name" className='mb-3'>
          <StyledFormControl type="text" placeholder="Enter name" name="name" onChange={handleChange} value={formState.name} isInvalid={formState.validated && !formState.valid} isValid={formState.validated && formState.valid} />
        </FloatingLabel>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <FloatingLabel controlId='floatingPrice' label="Price" className='mb-3'>
          <StyledFormControl type="number" placeholder="Price" name="price" onChange={handleChange}  value={formState.price} isInvalid={formState.validated && !formState.valid}isValid={formState.validated && formState.valid}  />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <FloatingLabel controlId="floatingSelect" label="Category">
          <StyledFormSelect aria-label="Default select example" name="category_id" onChange={handleChange}  value={formState.category_id}>
            { categories ? Object.entries(categories).map(([key,value], index) => {
              return (<option key={index} value={key}>{value.name}</option>);
            }) : null };
          </StyledFormSelect>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <FloatingLabel controlId='floatingDescription' label="Description" className='mb-3'>
          <StyledFormControl as="textarea" placeholder="Description" name="description" onChange={handleChange}  value={formState.description} isInvalid={formState.validated && !formState.valid}isValid={formState.validated && formState.valid}  />
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formImage" className="mb-3">
        <Form.Label>Image</Form.Label>
        <StyledFormControl type="file" accept='image/*' multiple={false} onChange={handleImageChange}/>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formButton">
        <ButtonRow>
          <ButtonBunch>
            <StyledButton variant="secondary" name="back" onClick={handleButtonClick}>Back</StyledButton>
            <StyledButton variant="primary" type="submit">Submit</StyledButton>
          </ButtonBunch>
        </ButtonRow>
      </Form.Group>
      { (formState.validated && !formState.valid) && <Alert variant='danger'>Incorrect email or password</Alert> }

    </Form>
  );
};

export default MenuItemForm;