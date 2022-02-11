import React from 'react';
import { useEffect, useState } from 'react';
import { setMenu } from './services/globalContextServices';
import { indexMenu } from './services/menuServices';
import { showToast } from './services/toastServices';
import { useGlobalContext } from './utils/globalContext';
import MenuItemCard from './components/MenuItemCard';
import { Row } from 'react-bootstrap';
import MenuItemModal from './MenuItemModal';
import { useCart } from 'react-use-cart';


const Menu = () => {

  const {store, dispatch} = useGlobalContext();
  const {menu} = store;
  const [modalShow, setModalShow] = useState(false);
  const [modalId, setModalId] = useState(null);
  const { inCart, addItem, getItem, items, updateItemQuantity } = useCart();

  console.log(items);
  console.log(inCart(15) ? items.find(item => item.id === 15).quantity : 0);

  useEffect( ()=>{
    indexMenu()
      .then(menu => {
        console.log(menu);
        setMenu(dispatch, menu);
      })
      .catch(error => {
        console.log(error);
        showToast(store, dispatch, error.message, 'danger');
      });
  }, []);

  const handleViewButtonClick = (id) => {
    setModalId(id);
    setModalShow(true);
  };

  const handleModalOnHide = () => {
    setModalShow(false);
  };

  const increaseCartQuantity = (menuItem) => {
    addItem(menuItem);
  };
  
  const decreaseCartQuantity = menuItemId => {
    const item = items.find(item => item.id === menuItemId);
    updateItemQuantity(item.id, item.quantity - 1);
  };
    
  return (
    <>
      <h1>MENU PAGE GOES HERE</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {menu.length > 0 ? menu.map((item) => {
          return <MenuItemCard key={item.id} menuItem={item} handleViewButtonClick={handleViewButtonClick}
            increaseCartQuantity={increaseCartQuantity} decreaseCartQuantity={decreaseCartQuantity}/>;
        })
          : <p>Loading...</p>}
      </Row>
      <MenuItemModal show={modalShow} onHide={handleModalOnHide} menuItemId={modalId}></MenuItemModal>
    </>
  );
};

export default Menu;