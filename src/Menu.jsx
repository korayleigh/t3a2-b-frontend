import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import { setMenu } from './services/globalContextServices';
import { indexMenu, setCategoryFilter, setSearchText } from './services/menuServices';
import { useGlobalContext } from './utils/globalContext';
import MenuItemCard from './components/MenuItemCard';
import { Row, Col } from 'react-bootstrap';
import MenuItemModal from './MenuItemModal';
import { useCart } from 'react-use-cart';
import { FloatingLabel} from 'react-bootstrap';
import { Heading, StyledFormControl, StyledFormSelect } from './styled/styled';
import menuReducer from './utils/menuReducer';
import { indexCategories } from './services/categoryServices';
import { setCategories } from './services/globalContextServices';
import PropTypes from 'prop-types';

const Menu = (props) => {

  const initialFormState = {
    search: '',
    category_id: 0,
  };

  const [modalShow, setModalShow] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [formState, formDispatch] = useReducer(menuReducer, initialFormState);
  const { addItem, items, updateItemQuantity } = useCart();
  const {globalStore, globalDispatch} = useGlobalContext();
  const {menu} = globalStore;

  useEffect( ()=>{
    indexMenu()
      .then(menu => {
        console.log(menu);
        setMenu(globalDispatch, menu);
      })
      .catch(error => {
        globalStore.globalErrorHandler(error);
      });
    console.log('globalStore.categories.length:',globalStore.categories.length);
    if (!globalStore.categories.length) {
      indexCategories()
        .then((categories) => {
          setCategories(globalDispatch ,categories);
        })
        .catch((error) => {
          globalStore.globalErrorHandler(error);
        });
    }
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

  const handleMenuSearchChange = (event) => {
    setSearchText(formDispatch, event.target.value);
  };

  const handleMenuFilterChange = (event) => {
    setCategoryFilter(formDispatch, event.target.value);
  };
    
  console.log('formState:',formState);
  console.log('categories', globalStore.categories);

  return (
    <>
      {props.hideHeading ? null : <Heading>Menu</Heading>}
      <Row xs={1} md={2}>
        <Col>
          <FloatingLabel controlId='floatinginput' label="Search" className='mb-3'>
            <StyledFormControl type="text" placeholder="Search" name="search" onChange={handleMenuSearchChange} value={formState.search} />
          </FloatingLabel>
        </Col>
        <FloatingLabel controlId='floatinginput' label="Category" className='mb-3'>
          <StyledFormSelect type="text" placeholder="Category" name="category" onChange={handleMenuFilterChange} value={formState.category_id} >
            { [{id:0,name:'All'}].concat(Object.values(globalStore.categories)).map((category) => {
              return (<option key={category.id} value={category.id}>{category.name}</option>);
            })
            }
          </StyledFormSelect>
        </FloatingLabel>
        <Col>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {menu.length > 0 ? menu
          .filter((item) => {
            return item.name.toLowerCase().includes(formState.search.toLowerCase());
          })
          .filter((item) => {
            // console.log('item', item.category_id);
            // console.log('filter', parseInt(formState.category_id));
            if (parseInt(formState.category_id) === 0) {
              return true;
            } else {
              return item.category_id === parseInt(formState.category_id);
            }
          })
          .map((item) => {
            return <MenuItemCard key={item.id} variant={props.variant} menuItem={item} handleViewButtonClick={handleViewButtonClick}
              increaseCartQuantity={increaseCartQuantity} decreaseCartQuantity={decreaseCartQuantity}/>;
          })
          : <p>Loading...</p>}
      </Row>
      <MenuItemModal show={modalShow} onHide={handleModalOnHide} menuItemId={modalId}></MenuItemModal>
    </>
  );
};

Menu.propTypes = {
  hideHeading: PropTypes.string,
  variant: PropTypes.string
};

export default Menu;