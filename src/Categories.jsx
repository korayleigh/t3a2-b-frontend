import React, { useEffect } from 'react';
import { getCategories } from './services/categoriesServices';
import { setCategories } from './services/globalContextServices';
import {useGlobalContext} from './utils/globalContext';

const Categories = () => {

  const {store, dispatch} = useGlobalContext();
  const {categories} = store;

  useEffect(() => {
    getCategories()
      .then(categories => {
        setCategories(dispatch ,categories);
      })
      .catch(error => console.log(error));
  },[]);
  return (
    <>
      { categories ? 
        <div>
          <ul>
            {Object.values(categories).map((category,index) => {
              return (
                <li key={index}>
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>
        : null
      }
    </>
  );

};

export default Categories;