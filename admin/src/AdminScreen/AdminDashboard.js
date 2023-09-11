import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Component/Sidebar';
import {Store} from '../Store'
import axios from 'axios'


function AdminDashboard() {
  const {state} = useContext(Store);
  const {userInfo} = state;
  const [countOrder, setCountOrder] = useState([]);
  const [countProduct, setCountProduct] = useState([]);
  const [totalSelles, setTotalSelles] = useState([]);

  useEffect(() => {
    const fatchData = async() =>{
      const orderCount = axios.get(`/api/admin/order/ordercount`,{
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      setCountOrder((await orderCount).data)
    }
    fatchData()
    
  },[userInfo.token])

  useEffect(() => {
    const fatchData = async() =>{
      const adminAllProductCount = await axios.get(`/api/admin/product/product_count`,{
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      if(adminAllProductCount){
        setCountProduct(adminAllProductCount.data)
      }
    }
    fatchData()
  })

  useEffect(() => {
    const fatchData= async() => {
      const adminTotalSelles = await axios.get(`/api/admin/selles/total_selles`,{
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      if(adminTotalSelles){
        setTotalSelles(adminTotalSelles.data)
      } else {
        
      }
    }
    fatchData()
  }, [userInfo.token])

  return (
    <div>
        <Sidebar />
        <div style={{display:'flex',justifyContent:"center",alignItems:'center'}} >
          <h1> Total Order {countOrder}</h1>
          <h1>total product {countProduct}</h1>
          {
            totalSelles.map((item)=>(
              <h1>total selles{item.totalSelles}</h1>
            ))
          }
        </div>
    </div>
  )
}

export default AdminDashboard