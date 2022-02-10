import React, { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { indexCategories } from './services/categoryServices';
import { setCategories } from './services/globalContextServices';
import {useGlobalContext} from './utils/globalContext';
import { useNavigate } from 'react-router-dom';
import { ButtonBunch, ButtonRow, Heading, StyledButton } from './styled/styled';
import { showToast } from './services/toastServices';
import IndexTable from './components/IndexTable';

const Categories = () => {

  const {store, dispatch} = useGlobalContext();
  const {categories} = store;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    indexCategories()
      .then(categories => {
        setCategories(dispatch ,categories);
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
        showToast(store, dispatch, error.message, 'danger');
      });
  },[]);

  const navigate = useNavigate();

  const handleRowClick = (row_id) => {
    navigate(String(row_id));
  };



  
  const handleButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name === 'new') {
      navigate('new');
    } else if (event.target.name === 'back') {
      navigate(-1);
    }
  };



  const categories_data = useMemo(() => Object.values(categories), [categories]);
  const categories_columns = useMemo(() => {
    return [{
      Header: 'id',
      accessor: 'id',
      sortType: 'basic'
    },{
      Header: 'Name',
      accessor: 'name',
      sortType: 'alphanumeric',
    }];
  },[categories]);

  return (
    Object.values(categories).length ? 
      <>
        <Heading>Categories</Heading>
        <IndexTable data={categories_data} columns={categories_columns} showFooter={false} onRowClick={handleRowClick} />
        <ButtonRow>
          <ButtonBunch>
            <StyledButton variant="primary" name="edit" onClick={handleButtonClick}>New Category</StyledButton>
            <StyledButton variant="secondary" name="back" onClick={handleButtonClick}>Back</StyledButton>
          </ButtonBunch>
        </ButtonRow>
      </>
      :
      loaded && <Alert variant='info'>No Categories!</Alert>
  
  );

};

export default Categories;