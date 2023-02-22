import { useContext } from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import "./App.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store';
import CartScreen from './screen/CartScreen';
//import LinkContainer from 'react-router-bootstrap/LinkContainer';

function App() {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <BrowserRouter>
    <div className="d-flex flex-column">
      <header>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
          <Link to="/" >
              MoneybagGo.com
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to='/cart' className='nav-link' >
              Cart
              {
                cart.cartItems.length > 0 && (
                  <Badge pill bg ="danger" >
                    {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                  </Badge>
                )
              }
            </Link>
          </Nav>
        </Container>
      </Navbar>
      </header>
      <main>
        <Routes>
          <Route path='/product/:slug' element={ <ProductScreen /> } />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/cart' element={ <CartScreen /> } />
        </Routes>
      </main>
      <footer className='text-center' >
          
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
