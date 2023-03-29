import React from 'react'
import "../css/SidebarRow.css"

function SidebarRow({Icon,title}) {
    return (
        <div className="sidebarRow">
            <p> <span>{title}</span> </p>           
        </div>
    )
}

export default SidebarRow