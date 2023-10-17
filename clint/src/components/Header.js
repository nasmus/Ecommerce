import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import NavDropdown from "react-bootstrap/NavDropdown";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import logo from "../css/logo.png";
import SearchBox from "./SearchBox";
import SocialHeader from "./SocialHeader";

function Header({ handleClick }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [category, setCategory] = useState([]);

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };

  useEffect(() => {
    const fatchData = async () => {
      const categoryData = await axios.get("api/category/get_all_category");
      setCategory(categoryData.data.categoryList);
    };
    fatchData();
  }, []);

  return (
    <div>
      <SocialHeader />
      <div className="ec-header-bottom d-none d-lg-block">
        <div className="container position-relative">
          <div className="row">
            <div className="ec-flex">
              <div className="align-self-center"></div>

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

      <div className="ec-header-bottom d-lg-none">
        <div className="container position-relative">
          <div className="row ">
            <div className="col">
              <div className="header-logo">
                <Link
                  style={{ display: "flex", justifyContent: "center " }}
                  to="/"
                >
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
      <div
        style={{ marginBottom: "10px", marginTop: "10px" }}
        className="header_category"
      >
        <div id="ec-main-menu-desk" className="d-none d-lg-block sticky-nav">
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-12 align-self-center">
                <div className="ec-main-menu">
                  <ul>
                    {category.map((item, index) => {
                      return (
                        <li key={index} className="dropdown position-static">
                          <Link to={item.name}>{item.name}</Link>
                          {item.children.map((element, index) => {
                            return (
                              <ul style={{ width:'20%'}} className="sub-menu">
                                <li>
                                  <Link to={element.name}>{element.name}</Link>
                                </li>
                              </ul>
                            );
                          })}
                        </li>
                      );
                    })}
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
