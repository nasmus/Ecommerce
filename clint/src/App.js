import { useContext } from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import "./App.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store';
import CartScreen from './screen/CartScreen';
import SignInScreen from './screen/SignInScreen';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import ShipingAddressScreen from './screen/ShipingAddressScreen';
import SignUpScreen from './screen/SignUpScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';

function App() {
  const {state, dispatch:ctxDispatch} = useContext(Store);
  const {cart,userInfo} = state;
  
  const signOutHandler = () =>{
    ctxDispatch({ type:'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  }

  return (
    <BrowserRouter>
    <div className="d-flex flex-column">
      <ToastContainer position='bottom-center' limit={1} />
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
            { userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown" >
                <LinkContainer to="/profile" >
                  <NavDropdown.Item>User Profoile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profile" >
                  <NavDropdown.Item>Order Histori</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link className='dropdown-item' to='/' onClick={signOutHandler} >
                  Sign Out
                </Link>
                
              </NavDropdown>
            ) : (
              <Link className="nav__link" to="/signin" >Sing In</Link>
            ) }
          </Nav>
        </Container>
      </Navbar>
      </header>
      <main>
        <Routes>
          <Route path='/product/:slug' element={ <ProductScreen /> } />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/signin' element={ <SignInScreen /> } />
          <Route path='/signup' element={ <SignUpScreen /> } />
          <Route path='/cart' element={ <CartScreen /> } />
          <Route path='/payment' element={ <PaymentMethodScreen /> } />
          <Route path='/placeorder' element={ <PlaceOrderScreen />  } />
          <Route path='/shipping' element={ <ShipingAddressScreen /> } />
          <Route path='/order/:id' element={ <OrderScreen /> } />
        </Routes>
      </main>
      <footer className='text-center' >
          
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;

