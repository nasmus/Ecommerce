import React from 'react'
import '../css/Sidebar.css'
import { Link } from 'react-router-dom';
function Sidebar() {
  
    
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/" className="active">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  )
}

export default Sidebar