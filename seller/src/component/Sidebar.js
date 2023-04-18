import React from 'react'
import "../css/Sidebar.css"
import SidebarRow from './SidebarRow'
import { NavLink,Link } from 'react-router-dom';
import AddCardIcon from '@mui/icons-material/AddCard';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to='/dashboard'>
            <h1>my app</h1>
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

            <NavLink to="/order">
                <SidebarRow title="Order" />
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