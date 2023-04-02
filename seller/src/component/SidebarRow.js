import React from 'react'
import "../css/SidebarRow.css"
import AddIcon from '@mui/icons-material/Add';

function SidebarRow({Icon,title}) {
    return (
        <div className="sidebarRow">
            {Icon && <Icon />}
            <p> <span>{title}</span> </p> 
                     
        </div>
    )
}

export default SidebarRow