import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import mexiquitoApi from './config/api';


const Order = () => {
  const initialState = '';
  const [item, setItem] = useState(initialState);

  const getItem = async () => {
        
    const response = await mexiquitoApi.get('/menu/18');
    // const item = response.data['18']
    console.log(response);
    console.log(item);
    setItem(response.data);
    return response;
  };

  useEffect( ()=>{
    getItem();
  }, []);


  const test = item;

  return (
    <>
      <h1>Order PAGE GOES HERE</h1>
      <p>{test || 'NOTHING'}</p>
    </>

  );
};

export default Order;