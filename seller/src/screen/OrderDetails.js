import React, { useContext, useReducer,useEffect } from 'react'
import Sidebar from '../component/Sidebar'
import { Store } from '../Store'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getError } from '../utils'
import Table from 'react-bootstrap/Table';

const reducer = (state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state,loading:true}
    case 'FETCH_SUCCESS':
      return {...state,loading:false,orderDetail:action.payload}
    case 'FETCH_FAIL':
      return {...state, loading:false, error:action.payload}
    default:
      return state;
  }
}

function OrderDetails() {
  const {state} = useContext(Store);
  const {userInfo} = state;
  const params = useParams();
  const {id: orderId} = params;
  const [{eorro,loading,orderDetail},dispatch] = useReducer(reducer,{
    error:'',
    loading:true,
    orderDetail:[]
  })

  useEffect(() => {
    const fatchData = async () => {
        dispatch({type:"FETCH_REQUEST"});
        try{
            const {data} = await axios.get(
                `/api/order/orderdetails/${orderId}`,
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
            dispatch({type:"FETCH_SUCCESS",payload:data})

        } catch (error) { 
            dispatch({type:"FETCH_FAIL",payload:getError(error)})
        }
    }
    fatchData()    
},[userInfo,orderId])

  return (
    <div style={{paddingLeft:"255px"}}>
        <Sidebar />
        <div>
          <h1>address</h1>
            <ul class="list-group list-group-light">
            <li class="list-group-item">{orderDetail.shippingAddress && orderDetail.shippingAddress.fullName}</li>
            <li class="list-group-item">{orderDetail.shippingAddress &&orderDetail.shippingAddress.phoneNumber}</li>
            <li class="list-group-item">{orderDetail.shippingAddress && orderDetail.shippingAddress.address}</li>
            <li class="list-group-item">{orderDetail.shippingAddress && orderDetail.shippingAddress.city}</li>
            <li class="list-group-item">{orderDetail.shippingAddress && orderDetail.shippingAddress.distric}</li>
          </ul>
          
        </div>
        <div>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Queantity</th>
            <th>Image</th>
            <th>Price</th>
          </tr>
        </thead>
        
      
        {orderDetail.orderItems && orderDetail.orderItems.map((item) => {
            if(item.seller === userInfo._id){
              return(
                <tbody>
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.image}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                </tbody>
              )
            }
          })}
          </Table>
        </div>
    </div>
  )
}

export default OrderDetails