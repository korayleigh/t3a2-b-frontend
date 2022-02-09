import React from 'react';
import { useEffect } from 'react';
import { setMenu } from './services/globalContextServices';
import { indexMenu } from './services/menuServices';
import { showToast } from './services/toastServices';
import { useGlobalContext } from './utils/globalContext';
import MenuItemCard from './components/MenuItemCard';
import { Row } from 'react-bootstrap';



const Menu = () => {

  const {store, dispatch} = useGlobalContext();
  const {menu} = store;

  useEffect( ()=>{
    indexMenu()
      .then(menu => {
        console.log(menu);
        console.log(menu[16].image.imagePath);
        setMenu(dispatch, menu);
      })
      .catch(error => {
        console.log(error);
        showToast(store, dispatch, error.message, 'danger');
      });
  }, []);
  
  return (
    <>
      <h1>MENU PAGE GOES HERE</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {menu.length > 0 ? menu.map((item) => {
          return <MenuItemCard key={item.id} menuItem={item}/>;
        })
          : <p>Loading...</p>}
      </Row>
      
    </>

  );
};

export default Menu;