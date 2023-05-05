import React from 'react'
import "../css/Sidebar.css"
import SidebarRow from './SidebarRow'
import {Link } from 'react-router-dom';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link className='dashboard' to='/dashboard'>
                <h2>Dash Board</h2>
            </Link>
            
            <Link className="sidebar__link" to="/upload">
                <SidebarRow Icon={DownloadForOfflineIcon} title="Product Add" />
            </Link>
            <Link className="sidebar__link" to="/productlist">
                <SidebarRow Icon={AlignHorizontalLeftIcon} title="Product List" />
            </Link>
            <Link className="sidebar__link" to="/products">
                <SidebarRow  Icon={AddToHomeScreenIcon} title="Products" />
            </Link>

            <Link className="sidebar__link" to="/allorder">
                <SidebarRow Icon={ShoppingCartIcon} title="Order" />
            </Link>

            <Link className="sidebar__link" to="/works">
                <SidebarRow title="Statistics" />
            </Link>
            <Link className="sidebar__link" to="/portfolio">
                <SidebarRow title="Reviews" />
            </Link>
            <Link className="sidebar__link" to="/email">
                <SidebarRow title="Transactions" />
            </Link>
            <Link className="sidebar__link" to="/email">
                <SidebarRow title="sellers" />
            </Link>
            <Link className="sidebar__link" to="/email">
                <SidebarRow title="Log Out" />
            </Link>
            
  
            
        </div>
    )
}

export default Sidebar