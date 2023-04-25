import React, { useContext, useEffect, useReducer } from 'react'
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
            return {...state, loading:true}
        case "FETCH_SUCCESS":
            return {...state, order:action.payload, loading:false }
        case "FETCH_FAIL":
            return {...state, loading:false, error:action.payload}
        default:
            return state;
    }

}

function AllOrder() {
    const {state} = useContext(Store);
    const {userInfo} = state;
    const Id = localStorage.getItem('userInfo._id');
    const [{error,loading,order}, dispatch] = useReducer(reducer, {
        loading:true,
        error:'',
        order:[]
    })

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
        console.log(order)
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
                <th>category</th>
                <th>status</th>
                <th>price</th>
                <th>Change Status</th>
                <th>Edit Product</th>
                </tr>
            </thead>
            <tbody>
                {order.map((ord) => (
                    <tr key={ord._id} >
                    <td>{ord._id}</td>
                    <td>{ord.name}</td>
                    <td>pro.</td>
                    <td>@mdo</td>
                    <td>shoes</td>
                    <td>pro</td>
                    <th><Button variant="contained">Change Status</Button></th>
                    <th><Button variant="contained" color="success">Edit Product</Button></th>
                </tr>
                ))}
                 
            </tbody>
            </Table>
        </div>
    </div>
  )
}

export default AllOrder