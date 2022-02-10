import React from 'react';
import { useEffect } from 'react';
import { setMenu } from './services/globalContextServices';
import { indexMenu } from './services/menuServices';
import { showToast } from './services/toastServices';
import { useGlobalContext } from './utils/globalContext';
import MenuItemCard from './components/MenuItemCard';
import { Row } from 'react-bootstrap';



const Menu = () => {

  const {globalStore, globalDispatch} = useGlobalContext();
  const {menu} = globalStore;

  useEffect( ()=>{
    indexMenu()
      .then(menu => {
        console.log(menu);
        setMenu(globalDispatch, menu);
      })
      .catch(error => {
        console.log(error);
        showToast(globalStore, globalDispatch, error.message, 'danger');
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