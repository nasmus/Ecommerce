import React from 'react'
import "../css/Sidebar.css"
import SidebarRow from './SidebarRow'
import { NavLink,Link } from 'react-router-dom';
import AddCardIcon from '@mui/icons-material/AddCard';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to='/dashboard'>
            <h2>Dash Board</h2>
            </Link>
            
            <NavLink to="/upload">
                <SidebarRow Icon={AddCardIcon} title="Product Add" />
            </NavLink>
            <NavLink  to="/page">
                <SidebarRow title="Page" />
            </NavLink>
            <NavLink to="/products">
                <SidebarRow  title="Products" />
            </NavLink>

            <NavLink to="/allorder">
                <SidebarRow Icon={FolderSpecialIcon} title="Order" />
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