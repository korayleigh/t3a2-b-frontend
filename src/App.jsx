import React from 'react';
import './App.scss';
import Header from './Header';
import Home from './Home';
import Order from './Order';
import OrderStatus from './OrderStatus';
import Login from './Login';
import Default from './Default';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useReducer } from 'react';
import { GlobalContext } from './utils/globalContext';
import globalReducer from './utils/globalReducer';
import Orders from './Orders';

function App() {
  
  const initialState = {
    menuCategories: [],
    loggedInUser: sessionStorage.getItem('email') || null,
    auth: {jwt: sessionStorage.getItem('jwt') || null}
  };
  const [store, dispatch] = useReducer(globalReducer,initialState);

  return (
    <div>
      <GlobalContext.Provider value={{store,dispatch}}>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="order" element={<Order />} />
              <Route path="orderstatus" element={<OrderStatus />} />
              <Route path="login" element={<Login />} />
              <Route path="orders" element={<Orders />} />  
              <Route path="*" element={<Default />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>      
    </div>
  );
}

export default App;
