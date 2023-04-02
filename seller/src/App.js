import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import LogInScreen from './screen/LogInScreen';
import SellerDeshBoard from './screen/SellerDashBoard';
import ProductUploadScreen from './screen/ProductUploadScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path='/' element={ <LogInScreen /> } />
          <Route path='/dashboard' element={ <SellerDeshBoard /> } />
          <Route path='/upload' element={<ProductUploadScreen />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
