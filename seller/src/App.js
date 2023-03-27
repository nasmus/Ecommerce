import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import LogInScreen from './screen/LogInScreen';

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
