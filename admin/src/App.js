import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogInScreen from '../src/AdminScreen/LogInScreen'
import AdminDashboard from './AdminScreen/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={ <LogInScreen /> } />
        <Route path='/dashboard' element={ <AdminDashboard /> } />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
