import React, { useEffect, useState } from 'react';
// import { Container, Table, Button, Alert } from 'react-bootstrap';
import {useGlobalContext} from './utils/globalContext';
import {  useParams, useNavigate } from 'react-router-dom';
import { showCategory, destroyCategory } from './services/categoryServices';
import { ButtonRow, ButtonBunch, Heading, StyledButton } from './styled/styled';
import { showToast } from './services/toastServices';
import ShowTable from './components/ShowTable';
import YesNoModal from './YesNoModal';

const Category = () => {


  const {globalStore, globalDispatch} = useGlobalContext();
  const [category, setCategory] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
    
  useEffect(() => {
    showCategory(params.id)
      .then((category) => {
        setCategory(category);
      })
      .catch((error) => {
        globalStore.globalErrorHandler(error);
      });
  },[]);

  
  const handleButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'delete') {
      setDeleteModalShow(true);
    } else if (event.target.name === 'edit') {
      navigate('edit');
    } else if (event.target.name === 'newOrderItem') {
      navigate('new');
    } else if (event.target.name === 'back') {
      navigate(-1, {replace: false});
    }
  };


  const handleDeleteModalConfirm = () => {
    destroyCategory(params.id)
      .then(() => {
        showToast(globalStore, globalDispatch,`Category '${category.name}' successfully deleted`, 'warning' );
      })
      .then(() => {
        setDeleteModalShow(false);
        navigate(-1);
      })
      .catch((error) => {
        globalStore.globalErrorHandler(error);
      });
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalShow(false);
  };

  console.dir(category);

  return (
    <>
      <Heading>Category Details</Heading>
      <ShowTable item={category} />
      <ButtonRow>
        <ButtonBunch>
          { category && 
            <StyledButton variant="primary" name="edit" onClick={handleButtonClick}>Edit Category</StyledButton>
          }
          <StyledButton variant="secondary" name="back" onClick={handleButtonClick}>Back</StyledButton>
        </ButtonBunch>
        <ButtonBunch>
          { category?.menu_items_count === 0 && <StyledButton variant='danger' name="delete" onClick={handleButtonClick}>Delete</StyledButton> }
        </ButtonBunch>
      </ButtonRow>
      <YesNoModal show={deleteModalShow} prompt="Are you sure?" onYes={handleDeleteModalConfirm} onNo={handleDeleteModalCancel} yes_text="Delete" no_text="Cancel" yes_variant="danger" no_variant="secondary" />
    </>

  );

};

export default Category;
