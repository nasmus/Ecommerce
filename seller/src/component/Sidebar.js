import React, { useContext } from "react";
import "../css/Sidebar.css";
import SidebarRow from "./SidebarRow";
import { Link } from "react-router-dom";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RateReviewIcon from "@mui/icons-material/RateReview";
import BarChartIcon from "@mui/icons-material/BarChart";
import PaidIcon from "@mui/icons-material/Paid";
import AppsIcon from "@mui/icons-material/Apps";
import { Store } from "../Store";

function Sidebar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <div className="sidebar">
      <Link className="sidebar__link" to="/dashboard">
        <SidebarRow Icon={AppsIcon} title="DashBoard" />
      </Link>

      <Link className="sidebar__link" to="/upload">
        <SidebarRow Icon={DownloadForOfflineIcon} title="Product Add" />
      </Link>
      <Link className="sidebar__link" to="/productlist">
        <SidebarRow Icon={AlignHorizontalLeftIcon} title="Product List" />
      </Link>
      <Link className="sidebar__link" to="/products">
        <SidebarRow Icon={AddToHomeScreenIcon} title="Products" />
      </Link>

      <Link className="sidebar__link" to="/allorder">
        <SidebarRow Icon={ShoppingCartIcon} title="Order" />
      </Link>

      <Link className="sidebar__link" to="/works">
        <SidebarRow Icon={BarChartIcon} title="Statistics" />
      </Link>
      <Link className="sidebar__link" to="/portfolio">
        <SidebarRow Icon={RateReviewIcon} title="Reviews" />
      </Link>
      <Link className="sidebar__link" to="/transection">
        <SidebarRow Icon={PaidIcon} title="Transactions" />
      </Link>
      <Link className="sidebar__link" to="/profile">
        <SidebarRow Icon={PersonIcon} title="Proifle" />
      </Link>
      <Link to="/" onClick={signOutHandler} className="sidebar__link">
        <SidebarRow Icon={ExitToAppIcon} title="Log Out" />
      </Link>
    </div>
  );
}

export default Sidebar;
