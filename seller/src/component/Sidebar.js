import React from 'react'
import "../css/Sidebar.css"
import SidebarRow from './SidebarRow'
import { NavLink,Link } from 'react-router-dom';
import AddCardIcon from '@mui/icons-material/AddCard';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to='/dashboard'>
            <h2>Dash Board</h2>
            </Link>
            
            <NavLink to="/upload">
                <SidebarRow Icon={DownloadForOfflineIcon} title="Product Add" />
            </NavLink>
            <NavLink  to="/productlist">
                <SidebarRow Icon={AlignHorizontalLeftIcon} title="Product List" />
            </NavLink>
            <NavLink to="/products">
                <SidebarRow  Icon={AddToHomeScreenIcon} title="Products" />
            </NavLink>

            <NavLink to="/allorder">
                <SidebarRow Icon={ShoppingCartIcon} title="Order" />
            </NavLink>

            <NavLink to="/works">
                <SidebarRow title="Statistics" />
            </NavLink>
            <NavLink to="/portfolio">
                <SidebarRow title="Reviews" />
            </NavLink>
            <NavLink to="/email">
                <SidebarRow title="Transactions" />
            </NavLink>
            <NavLink to="/email">
                <SidebarRow title="sellers" />
            </NavLink>
            <NavLink to="/email">
                <SidebarRow title="Log Out" />
            </NavLink>
            
  
            
        </div>
    )
}

export default Sidebar