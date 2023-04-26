import React, { useContext, useEffect, useReducer, useState } from 'react'
import Sidebar from '../component/Sidebar'
import '../css/AllOrder.css'
import { Button } from '@mui/material'
import Table from 'react-bootstrap/Table';
import { Store } from '../Store';
import axios from 'axios';
import { getError } from '../utils';

const reducer = (state, action) => {
    switch(action.type) {
        case "FETCH_REQUEST":
            return {...state,loading:true}
        case "FETCH_SUCCESS":
            return {...state, orders:action.payload,loading:false }
        case "FETCH_FAIL":
            return {...state, error:action.payload,loading:false}
        default:
            return state;
    }
}

function AllOrder() {
    const {state} = useContext(Store);
    const {userInfo} = state;
    //const [orders,setOrders] = useState([]);
    const Id = localStorage.getItem('userInfo._id');
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        orders:[]
      });

    useEffect(() => {
        const fatchData = async () => {
            dispatch({type:"FETCH_REQUEST"});
            try{
                const {data} = await axios.get(
                    `/api/order/allorder`,
                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
                dispatch({type:"FETCH_SUCCESS",payload:data})

            } catch (error) { 
                dispatch({type:"FETCH_FAIL",payload:getError(error)})
            }
        }
        fatchData()    
        
    },[userInfo])


  return (
    <div>
        <Sidebar />
        <div className='allOrder'>
            <h1>All Order And Order Details</h1>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Id</th>
                <th>image</th>
                <th>name</th>
                <th>quantity</th>
                <th>price</th>
                <th></th>
                
                </tr>
            </thead>
            <tbody> 
                {orders.map((order)=>(
                    <>
                        {order.orderItems.map((item) => {
                            console.log("order items:",item)
                            return(
                        <tr key={item._id} >
                            <td>{item._id}</td>
                            <td><img src={item.image} /></td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>pro</td>
                            <td><Button variant="contained" color="success">Edit Product</Button></td>
                        </tr>
                            )
                        })}
                    </>
                ))}
            </tbody>
            </Table>
        </div>
    </div>
  )
}

export default AllOrder