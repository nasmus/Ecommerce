import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { Store } from '../Store';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import logo from '../css/logo.png'
import { Button } from '@mui/material';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import SearchBox from './SearchBox';


function Header({handleClick}) {
    const {state, dispatch:ctxDispatch} = useContext(Store);
    const {cart,userInfo} = state;
    
    const signOutHandler = () =>{
        ctxDispatch({ type:'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
    }
  return (
    <div>
        <div className="ec-header-bottom d-none d-lg-block">
            <div className="container position-relative">
                <div className="row">
                    <div className="ec-flex">
                        <div className="align-self-center">
                            <div className="navbar_button">
                                <Button onClick={handleClick} > <DensitySmallIcon /> </Button>
                            </div>
                        </div>

                        
                        <div className="align-self-center">
                            <div className="header-logo">
                                <Link to="/"><img style={{width: '260px'}} src={logo}  alt="Site Logo" /></Link>
                            </div>
                        </div>
                        
                        {<SearchBox />}
                        
                        <div className="align-self-center">
                            <div className="ec-header-bottons">
                                <div className="ec-header-user dropdown">
                                { userInfo ? (
                                    <NavDropdown title={<i className="fi-rr-user">{userInfo.name}</i>}   id="basic-nav-dropdown" >
                                        <LinkContainer to="/profile" >
                                        <NavDropdown.Item>User Profoile</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/orderhistory" >
                                        <NavDropdown.Item>Order history</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <Link className='dropdown-item' to='/' onClick={signOutHandler} >
                                        Sign Out
                                        </Link>
                                        
                                    </NavDropdown>
                                    ) : (
                                        <Link to="/signin" style={{textDecoration: 'none'}} className="dropdown-toggle" data-bs-toggle="dropdown"><i
                                        className="fi-rr-user"></i>Sign In</Link>
                                    ) }

                                </div>
                                
                                <Link href="wishlist.html" className="ec-header-btn ec-header-wishlist">
                                    <div className="header-icon"><i className="fi-rr-heart"></i></div>
                                    <span className="ec-header-count">4</span>
                                </Link>
                                
                                <Link to='/cart' className="ec-header-btn ec-side-toggle">
                                    <div className="header-icon"><i className="fi-rr-shopping-bag"></i></div>
                                    <span style={{background: 'red'}} className="ec-header-count cart-count-lable">
                                    {
                                        cart.cartItems.length > 0 && (
                                            <span> {cart.cartItems.reduce((a,c) => a + c.quantity, 0)} </span>
                                        
                                        )
                                    }
                                    </span>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header