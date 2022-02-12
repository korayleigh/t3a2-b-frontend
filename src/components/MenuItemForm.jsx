import React from 'react';
import {Form, FloatingLabel, Alert} from 'react-bootstrap';
import {useState} from 'react';
import { StyledButton } from '../styled/styled';
import { useNavigate } from 'react-router-dom';
import mexiquitoApi from '../config/api';


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

  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log('BEFORE:');
    console.log(formState);
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
    formData.append('image', formState.image);

    await mexiquitoApi.post('/menu_items', formData)
      .then(response => {
        console.log(response);
        navigate('/menu_items/');
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const handleImageChange = event => { 
    setFormState({ ...formState, image: event.target.files[0] });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate >
      <Form.Group className="mb-3" controlId="formBasicName">
        <FloatingLabel controlId='floatinginput' label="Name" className='mb-3'>
          <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleChange} value={formState.name} isInvalid={formState.validated && !formState.valid} isValid={formState.validated && formState.valid} />
        </FloatingLabel>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <FloatingLabel controlId='floatingPrice' label="Price" className='mb-3'>
          <Form.Control type="number" placeholder="Price" name="price" onChange={handleChange}  value={formState.price} isInvalid={formState.validated && !formState.valid}isValid={formState.validated && formState.valid}  />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <FloatingLabel controlId="floatingSelect" label="Category">
          <Form.Select aria-label="Default select example" name="category_id" onChange={handleChange}  value={formState.category_id}>
            <option>Select a category</option>
            <option value="1">Entrees</option>
            <option value="2">Tacos</option>
            <option value="3">Mains</option>
            <option value="4">Postres</option>
            <option value="5">Drinks</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <FloatingLabel controlId='floatingDescription' label="Description" className='mb-3'>
          <Form.Control as="textarea" placeholder="Description" name="description" onChange={handleChange}  value={formState.description} isInvalid={formState.validated && !formState.valid}isValid={formState.validated && formState.valid}  />
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formImage" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" accept='image/*' multiple={false} onChange={handleImageChange}/>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formButton">
        <StyledButton variant="primary" type="submit">Submit</StyledButton>
      </Form.Group>
      { (formState.validated && !formState.valid) && <Alert variant='danger'>Incorrect email or password</Alert> }

    </Form>
  );
};

export default MenuItemForm;