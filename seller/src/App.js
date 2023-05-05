import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import LogInScreen from './screen/LogInScreen';
import SellerDeshBoard from './screen/SellerDashBoard';
import ProductUploadScreen from './screen/ProductUploadScreen';
import AllOrder from './screen/AllOrder';
import ProductListScreen from './screen/ProductListScreen';
import DetailsProductScreen from './screen/DetailsProductScreen';
import EditProductScreen from './screen/EditProductScreen';
import OrderDetails from './screen/OrderDetails';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path='/' element={ <LogInScreen /> } />
          <Route path='/dashboard' element={ <SellerDeshBoard /> } />
          <Route path='/upload' element={<ProductUploadScreen />} />
          <Route path='/products' element={<ProductUploadScreen />} />
          <Route path='/productlist' element={<ProductListScreen />} />
          <Route path='/allorder' element={<AllOrder />} />
          <Route path='/productdetails/:id' element={<DetailsProductScreen />} />
          <Route path='/editproduct/:id' element={<EditProductScreen />} />
          <Route path='/orderdetails/:id' element={<OrderDetails />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
