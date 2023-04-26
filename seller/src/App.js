import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import LogInScreen from './screen/LogInScreen';
import SellerDeshBoard from './screen/SellerDashBoard';
import ProductUploadScreen from './screen/ProductUploadScreen';
import AllOrder from './screen/AllOrder';
import ProductListScreen from './screen/ProductListScreen';

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
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
