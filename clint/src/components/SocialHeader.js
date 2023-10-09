import React,{useState} from "react";
import {Link} from 'react-router-dom'
import "../css/Navbar.css";

function SocialHeader() {
  const sidebarData = [
    {
      titel:'Home',
      path:'/',
      cName:'nav-text'
    },
    {
      titel:'manu',
      path:'/',
      cName:'nav-text'
    },
    {
      titel:'this',
      path:'/',
      cName:'nav-text'
    }

  ]
  const [sidebar, setSidebar] = useState(false)
  const showSidebar =() => {
    setSidebar(!sidebar)
  }
  return (
    <>
      <div style={{marginTop:'20px',marginRight:'20px'}} className="col d-lg-none ">
        <div className="ec-header-bottons">
          <div className="ec-header-user dropdown">
            <button className="dropdown-toggle" >
              <i className="fi-rr-user"></i>
            </button>
          </div>

          <Link to='#' className="ec-header-btn ec-side-toggle">
            <div className="header-icon">
              <i className="fi-rr-shopping-bag"></i>
            </div>
            <span className="ec-header-count cart-count-lable">3</span>
          </Link>

          <Link
            to='#'
            
            className="ec-header-btn ec-side-toggle d-lg-none"
          >
            <i className="fi fi-rr-menu-burger" onClick={showSidebar} ></i>
          </Link>
        </div>
      </div>
      <div className="navbar">
      <div className={sidebar ? 'nav-manu active' : 'nav-manu'}>
        <ul className="nav-manu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
              <Link to='#' className="menu-bars">
              <i className="fi-rr-user"></i>
              </Link>
          </li>
          {
            sidebarData.map((item,index) =>{
              return(
                <li key={index} className={item.cName} >
                  <Link className="link" to={item.path} >{item.titel}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
      </div>
      
    </>
  );
}

export default SocialHeader;
