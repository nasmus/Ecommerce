import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import "./App.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

function App() {
  return (
    <BrowserRouter>
    <div className="d-flex flex-column">
      <header>
        <Navbar bd="green" variant="dark" >
          <Container>
            <Link to="/" >
              MoneybagGo.com
            </Link>
          </Container>
        </Navbar>
        <Link ></Link>
      </header>
      <main>
        <Routes>
          <Route path='/product/:slug' element={ <ProductScreen /> } />
          <Route path='/' element={<HomeScreen />} />
        </Routes>
      </main>
      <footer className='text-center' >
          @ This is all reserved
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
