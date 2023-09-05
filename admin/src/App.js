import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogInScreen from '../src/AdminScreen/LogInScreen'
import AdminDashboard from './AdminScreen/AdminDashboard';
import SellerList from './AdminScreen/SellerList';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={ <LogInScreen /> } />
        <Route path='/dashboard' element={ <AdminDashboard /> } />
        <Route path='/sellerlist' element={ <SellerList /> } />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
