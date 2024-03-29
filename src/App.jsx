import React from 'react';
import './App.scss';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';
import OrderStatus from './OrderStatus';
import Login from './Login';
import CreateMenuItem from './CreateMenuItem';
import { Route, Routes} from 'react-router-dom';
import { useReducer } from 'react';
import { GlobalContext } from './utils/globalContext';
import globalReducer from './utils/globalReducer';
import Categories from './Categories';
import Category from './Category';
import CategoryForm from './CategoryForm';
import Orders from './Orders';
import Order from './Order';
import OrderForm from './OrderForm';
import Checkout from './Checkout';
import Pending from './Pending';
import { showToast } from './services/toastServices';
import { clearLoginCredentials } from './services/globalContextServices';
import { useNavigate } from 'react-router-dom';
import EditMenu from './EditMenu';
import EditMenuItem from './EditMenuItem';

function App() {

  const navigate = useNavigate();
    
  const globalErrorHandler = (error) => {
    if (error.response) {
      if (error.response.data.error) {
        showToast(globalStore, globalDispatch, error.response.data.error, 'danger');
        // Login expired
        if (error.response.status === 401 ) {
          sessionStorage.clear();
          clearLoginCredentials(globalDispatch);
          navigate('/');
        }
      } else {
        showToast(globalStore, globalDispatch, error.response.statusText, 'danger');
      }
    } else if (error.message) {
      showToast(globalStore, globalDispatch, error.message, 'danger');
    } else {
      showToast(globalStore, globalDispatch, 'Unkown error', 'danger');
    }
  };

  const initialState = {
    toasts: [],
    categories: {},
    menu: [],
    user: {
      email: sessionStorage.getItem('email') || null,
      role: null,
      jwt: sessionStorage.getItem('jwt') || null,
    },
    globalErrorHandler,
  };
  const [globalStore, globalDispatch] = useReducer(globalReducer,initialState);
  const {user} = globalStore;


  return (
    <div >
      <GlobalContext.Provider value={{globalStore,globalDispatch}}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="orderstatus" element={<OrderStatus />} />
            <Route path="login" element={<Login />} />
            <Route path="checkout" element={<Checkout />} />
            { user && user.role == 'Admin' && 
            <>
              <Route path="menuitems">
                <Route index element={<EditMenu />} />
                <Route path="new" element={<CreateMenuItem />} />
                <Route path=":id/edit" element={<EditMenuItem />} />
              </Route>
              <Route path="categories">
                <Route index element={<Categories />} />
                <Route path="new" element={<CategoryForm />} />
                <Route path=":id/edit" element={<CategoryForm />} />
                <Route path=":id" element={<Category />} />
              </Route>
              <Route path="orders">
                <Route index element={<Orders />} />
                <Route path=":id/edit" element={<OrderForm />} />
                <Route path=":id" element={<Order />} />
              </Route>
              <Route path="pending" element={<Pending />} />
            </>
            }
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </GlobalContext.Provider>      
    </div>
  );
}

export default App;
