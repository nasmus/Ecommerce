import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import LogInScreen from './screen/LogInScreen';
import SellerDeshBoard from './screen/SellerDashBoard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path='/' element={ <LogInScreen /> } />
          <Route path='/dashboard' element={ <SellerDeshBoard /> } />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
