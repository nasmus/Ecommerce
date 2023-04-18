import React, { useContext, useEffect, useReducer } from 'react'
import Sidebar from '../component/Sidebar'
import '../css/SellerDashboard.css';
import Table from 'react-bootstrap/Table';
import { Button } from '@mui/material';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer =(state,action) =>{
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state,loading:true }
    case 'FETCH_SUCCESS':
      return {...state, product:action.payload, loading:false}
    case 'FETCH_FAIL':
      return {...state, error:action.payload, loading:false}
    default:
      return state;
  }

}

function SellerDashBoard() {
  const {state} = useContext(Store);
  const {userInfo} = state;
  const Id = localStorage.getItem('userInfo._id');
  
  const [{error, product, loading}, dispatch] = useReducer(reducer, {
    error:'',
    loading:true,
    product:[],
  })

  useEffect(() => {
    const fatchData = async() =>{
      dispatch({type:'FETCH_REQUEST'});
      try{
        const {data} = await axios.get(
          `/api/allproduct/${Id}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({type: 'FETCH_SUCCESS', payload:data})
      } catch(error) {
        dispatch({type: 'FETCH_FAIL', payload:getError(error)})
      }
    }
    fatchData();
  },[userInfo,Id])

  return (
    <div>
        <Sidebar />
        <div className='dashBoard'>
          <div className='Order_information'>
            <div className='Order_card_1'>
              <h4>total product</h4>
            </div>
            <div className='Order_card_1'>
              <h4>total Orders</h4>
            </div>
            <div className='Order_card_1'>
              <h4>total earning</h4>
            </div>
            <div className='Order_card_1'>
              <h4>total selles</h4>
            </div>
          </div>

        <h2>Product List</h2>
        
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
        {
          product.map((pro) => (
          <tr key={pro._id} >
            <td>{pro._id}</td>
            <td>Mark</td>
            <td>{pro.name}</td>
            <td>@mdo</td>
            <td>shoes</td>
            <td>{pro.price}</td>
            <th><Button variant="contained">Change Status</Button></th>
            <th><Button variant="contained" color="success">Edit Product</Button></th>
          </tr> 
          ))
        }
        
      </tbody>
    </Table>
        </div>
    </div>
  )
}

export default SellerDashBoard