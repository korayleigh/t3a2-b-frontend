import React, { useEffect } from 'react';
import './App.scss';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';
import OrderStatus from './OrderStatus';
import Login from './Login';
import CreateMenuItem from './CreateMenuItem';
import Default from './Default';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useReducer } from 'react';
import { GlobalContext } from './utils/globalContext';
import globalReducer from './utils/globalReducer';
import Categories from './Categories';
import Category from './Category';
import CategoryForm from './CategoryForm';
import Orders from './Orders';
import Order from './Order';
import OrderForm from './OrderForm';
import { getUserRole } from './services/authServices';
import { setRole } from './services/globalContextServices';

function App() {
  
  const initialState = {
    toasts: [],
    categories: {},
    menu: [],
    user: {
      email: sessionStorage.getItem('email') || null,
      role: null,
      jwt: sessionStorage.getItem('jwt') || null,
    }
  };
  const [globalStore, globalDispatch] = useReducer(globalReducer,initialState);
  const {user} = globalStore;

  useEffect(() => {
    if (globalStore.user.email && !globalStore.user.role) {
      getUserRole()
        .then((role) => {
          setRole(globalDispatch, role);
        });
    }
  }),[user.jwt];

  return (
    <div >
      <GlobalContext.Provider value={{globalStore,globalDispatch}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="orderstatus" element={<OrderStatus />} />
              <Route path="login" element={<Login />} />
              { user && user.role == 'Admin' && 
              <>
                <Route path="createmenuitem" element={<CreateMenuItem />} />
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
              </>
              }
              <Route path="*" element={<Default />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>      
    </div>
  );
}

export default App;
