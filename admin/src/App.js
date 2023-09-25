import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogInScreen from '../src/AdminScreen/LogInScreen'
import AdminDashboard from './AdminScreen/AdminDashboard';
import SellerList from './AdminScreen/SellerList';
import AdminProductList from './AdminScreen/AdminProductList';
import AllOrderScreen from './AdminScreen/AllOrderScreen';
import AllUserListScreen from './AdminScreen/AllUserListScreen';
import Category from './AdminScreen/Category/Category';
import CreateCategory from './AdminScreen/CreateCategory';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={ <LogInScreen /> } />
        <Route path='/dashboard' element={ <AdminDashboard /> } />
        <Route path='/sellerlist' element={ <SellerList /> } />
        <Route path='/productlist' element={ <AdminProductList /> } />
        <Route path='/orderlist' element={ <AllOrderScreen /> } />
        <Route path='/alluserlist' element={ <AllUserListScreen /> } />
        <Route path='/category' element={ <Category /> } />
        <Route path='/category/addcategory' element={ <CreateCategory /> } />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
