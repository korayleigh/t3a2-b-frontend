import './App.scss';
import Header from './Header';
import Home from './Home';
import Order from './Order';
import OrderStatus from './OrderStatus';
import Login from './Login';
import Default from './Default';
import { Route, Routes} from "react-router-dom";

function App() {
  
  return (
    <div>      
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="order" element={<Order />} />
          <Route path="orderstatus" element={<OrderStatus />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Default />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
