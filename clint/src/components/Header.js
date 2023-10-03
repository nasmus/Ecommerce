import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import NavDropdown from "react-bootstrap/NavDropdown";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import logo from "../css/logo.png";
import { Button } from "@mui/material";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import SearchBox from "./SearchBox";
import SocialHeader from "./SocialHeader";

function Header({ handleClick }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <div>
      <SocialHeader />
      <div className="ec-header-bottom d-none d-lg-block">
        <div className="container position-relative">
          <div className="row">
            <div className="ec-flex">
              <div className="align-self-center">
                
              </div>

              <div className="align-self-center">
                <div className="header-logo">
                  <Link to="/">
                    <img
                      style={{ width: "260px" }}
                      src={logo}
                      alt="Site Logo"
                    />
                  </Link>
                </div>
              </div>

              {<SearchBox />}

              <div className="align-self-center">
                <div className="ec-header-bottons">
                  <div className="ec-header-user dropdown">
                    {userInfo ? (
                      <NavDropdown
                        title={<i className="fi-rr-user">{userInfo.name}</i>}
                        id="basic-nav-dropdown"
                      >
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>User Profoile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orderhistory">
                          <NavDropdown.Item>Order history</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={signOutHandler}
                        >
                          Sign Out
                        </Link>
                      </NavDropdown>
                    ) : (
                      <Link
                        to="/signin"
                        style={{ textDecoration: "none" }}
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="fi-rr-user"></i>Sign In
                      </Link>
                    )}
                  </div>

                  <Link
                    href="wishlist.html"
                    className="ec-header-btn ec-header-wishlist"
                  >
                    <div className="header-icon">
                      <i className="fi-rr-heart"></i>
                    </div>
                    <span className="ec-header-count">4</span>
                  </Link>

                  <Link to="/cart" className="ec-header-btn ec-side-toggle">
                    <div className="header-icon">
                      <i className="fi-rr-shopping-bag"></i>
                    </div>
                    <span
                      style={{ background: "red" }}
                      className="ec-header-count cart-count-lable"
                    >
                      <span
                        className="main-label-note-new"
                        data-toggle="tooltip"
                        title="NEW"
                      ></span>
                      {cart.cartItems.length > 0 && (
                        <span>
                          {" "}
                          {cart.cartItems.reduce(
                            (a, c) => a + c.quantity,
                            0
                          )}{" "}
                        </span>
                      )}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


                  {/* mobile manue bar */}


      <div class="ec-header-bottom d-lg-none">
        <div class="container position-relative">
          <div class="row ">
            <div class="col">
              <div class="header-logo">
                <Link style={{display:'flex',justifyContent:'center '}} to="/">
                  <img style={{ width: "260px" }} src={logo} alt="Site Logo" />
                </Link>
              </div>
            </div>

            <div class="col">
              <div class="header-search">
                <form class="ec-btn-group-form" action="#">
                  <input
                    class="form-control ec-search-bar"
                    placeholder="Search products..."
                    type="text"
                  />
                  <button class="submit" type="submit">
                    <i class="fi-rr-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header Main Categori */}
      <div style={{marginBottom:'15px',marginTop:'15px'}} className="header_category">
        <div id="ec-main-menu-desk" class="d-none d-lg-block sticky-nav">
          <div class="container position-relative">
            <div class="row">
              <div class="col-md-12 align-self-center">
                <div class="ec-main-menu">
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li class="dropdown position-static">
                      <a href="javascript:void(0)">Categories</a>
                    </li>
                    <li class="dropdown">
                      <a href="javascript:void(0)">Products</a>
                    </li>
                    <li class="dropdown">
                      <a href="javascript:void(0)">Pages</a>
                    </li>
                    <li class="dropdown">
                      <span
                        class="main-label-note-new"
                        data-toggle="tooltip"
                        title="NEW"
                      ></span>
                      <Link href="javascript:void(0)">Others</Link>
                    </li>
                    <li class="dropdown">
                      <a href="javascript:void(0)">Blog</a>
                    </li>
                    <li class="dropdown">
                      <a href="javascript:void(0)">Elements</a>
                    </li>
                    <li>
                      <a href="offer.html">Hot Offers</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Header;
