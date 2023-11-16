import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "./Sidebar/Accordion";
import { ArrowCircleDown } from "@mui/icons-material";
import { DashboardSharp, MenuRounded, Settings } from "@mui/icons-material";

function SocialHeader() {
  const sidebarData = [
    {
      titel: "Home",
      path: "/",
      cName: "nav-text",
    },
    {
      titel: "manu",
      path: "/",
      cName: "nav-text",
    },
    {
      titel: "this",
      path: "/",
      cName: "nav-text",
    },
  ];

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div
        style={{ marginTop: "20px", marginRight: "20px" }}
        className="col d-lg-none "
      >
        <div className="ec-header-bottons">
          <div className="ec-header-user dropdown">
            <button className="dropdown-toggle">
              <i className="fi-rr-user"></i>
            </button>
          </div>

          <Link to="#" className="ec-header-btn ec-side-toggle">
            <div className="header-icon">
              <i className="fi-rr-shopping-bag"></i>
            </div>
            <span className="ec-header-count cart-count-lable">3</span>
          </Link>

          <Link to="#" className="ec-header-btn ec-side-toggle d-lg-none">
            <i className="fi fi-rr-menu-burger" onClick={showSidebar}></i>
          </Link>
        </div>
      </div>

      {/*navbar for mobile responsive */}

      <div className="navbar">
        <div className={sidebar ? "nav-manu active" : "nav-manu"}>
          <div className="navbar-toggle" onClick={showSidebar}>
            <Link to="#" className="menu-bars">
              <CloseIcon />
            </Link>
          </div>
          <div className="nav-manu-items">
            <section className="flex w-full p-1 border-b-2">
              <div className="flex justify-center items-center m-2">
                <img
                  className="w-11 h-11 rounded-full border"
                  src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                  alt=""
                />
              </div>
              <div className="m-2">
                <h5 className="font-bold">Alexe Jordar</h5>
                <p className=" text-sm ">Sales Manager</p>
              </div>
            </section>

            <div className="p-3 ">
              <section className=" border-b">
                <Accordion
                  title="Dashboard"
                  icon={<DashboardSharp fontSize="small" className={`mt-1 `} />}
                >
                  {sidebarData.map((item, index) => {
                    return (
                      <div key={index} className=" pl-5 font-bold  ">
                        <Link className="no-underline text-slate-600" onClick={showSidebar} to={item.path}>
                          {item.titel}
                        </Link>
                      </div>
                    );
                  })}
                </Accordion>
              </section>

              <div className=" bottom-0 text-slate-400">
                <div className="flex ">
                  <Settings
                    fontSize="small"
                    className={`mt-2 text-slate-400 `}
                  />
                  <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                    <span className={`text-sm font-medium  `}>Setting</span>
                  </button>
                </div>
                <div className="flex ">
                  <ArrowCircleDown
                    fontSize="small"
                    className={`mt-2 text-slate-400 `}
                  />
                  <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                    <span className={`text-sm font-medium  `}>Logout</span>
                  </button>
                </div>
                <div className="flex ">
                  <MenuRounded
                    fontSize="small"
                    className={`mt-2 text-slate-400 `}
                  />
                  <button className="w-full flex items-center justify-between p-2  rounded-md focus:outline-none">
                    <span className={`text-sm font-medium  `}>Menu</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialHeader;
