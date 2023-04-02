import React from 'react'
import "../css/Sidebar.css"
import SidebarRow from './SidebarRow'
import { NavLink } from 'react-router-dom';
import AddCardIcon from '@mui/icons-material/AddCard';

function Sidebar() {
    return (
        <div className="sidebar">
            <h1>my app</h1>
            <NavLink  to="/">
                <SidebarRow Icon={AddCardIcon} title="Dashboard" />
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