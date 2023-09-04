import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogInScreen from '../src/AdminScreen/LogInScreen'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={ <LogInScreen /> } />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
