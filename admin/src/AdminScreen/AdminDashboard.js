import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Component/Sidebar';
import {Store} from '../Store'
import axios from 'axios'


function AdminDashboard() {
  const {state} = useContext(Store);
  const {userInfo} = state;
  const [countOrder, setCountOrder] = useState();

  useEffect(() => {
    const fatchData = async() =>{
      const orderCount = axios.get(`/api/admin/order/ordercount`,{
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      setCountOrder((await orderCount).data)
    }
    fatchData()
    
  },[userInfo.token])

  return (
    <div>
        <Sidebar />
        {
          console.log(countOrder)
        }
        <div style={{display:'flex',justifyContent:"center",alignItems:'center'}} >
          <h1> Total Order {countOrder}</h1>
          
        </div>
    </div>
  )
}

export default AdminDashboard