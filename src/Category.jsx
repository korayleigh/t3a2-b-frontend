import React, { useEffect, useState } from 'react';
// import { Container, Table, Button, Alert } from 'react-bootstrap';
import {useGlobalContext} from './utils/globalContext';
import {  useParams } from 'react-router-dom';
import { showCategory, destroyCategory } from './services/categoryServices';
// import { ButtonRow, ButtonBunch, Heading } from './styled/styled';
import { showToast } from './services/toastServices';
import ShowTable from './components/ShowTable';

const Category = () => {


  const {store, dispatch} = useGlobalContext();
  const [category, setCategory] = useState(null);
  const params = useParams();
    
  useEffect(() => {
    showCategory(params.id)
      .then((category) => {
        setCategory(category);
      })
      .catch((error) => {
        console.log(error);
        showToast(store, dispatch, error.message, 'danger');
      });
  },[]);

  console.log('category', category);

  return (
    <ShowTable item={category} showDestroyButton={true} destroyCallback={destroyCategory} model={{singular: 'category', plural: 'categories'}} />
  );

};

export default Category;
