import React from 'react'
import "../css/Sidebar.css"
import SidebarRow from './SidebarRow'
import { NavLink } from 'react-router-dom';


function Sidebar() {
    return (
        <div className="sidebar">
            <h1>my app</h1>
            <NavLink className="sidebar__link" to="/">
                <SidebarRow title="Dashboard" />
            </NavLink>
            <NavLink className="sidebar__link" to="/page">
                <SidebarRow title="Page" />
            </NavLink>
            <NavLink className="sidebar__link" to="/products">
                <SidebarRow  title="Products" />
            </NavLink>

            <NavLink className="sidebar__link" to="/order">
                <SidebarRow title="Order" />
            </NavLink>

            <NavLink className="sidebar__link" to="/works">
                <SidebarRow title="Statistics" />
            </NavLink>
            <NavLink className="sidebar__link" to="/portfolio">
                <SidebarRow title="Reviews" />
            </NavLink>
            <NavLink className="sidebar__link" to="/email">
                <SidebarRow title="Transactions" />
            </NavLink>
            <NavLink className="sidebar__link" to="/email">
                <SidebarRow title="sellers" />
            </NavLink>
            <NavLink className="sidebar__link" to="/email">
                <SidebarRow title="Log Out" />
            </NavLink>
  
            
        </div>
    )
}

export default Sidebar