import React, { useContext, useEffect, useReducer } from 'react'
import Sidebar from '../component/Sidebar'
import '../css/SellerDashboard.css';
import ProductListComponent from '../component/ProductListComponent';
import axios from 'axios';
import { Store } from '../Store';

const reducer =(state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state,}
    case 'FETCH_SUCCESS':
      return {...state,productCount:action.payload}
    case 'FETCH_FAIL':
      return {...state,error:action.payload}
    case 'FETCH_ORDER_REQUEST':
      return {...state}
    case 'FETCH_ORDER_SUCCESS':
      return {...state,totalOrder:action.payload}
    case 'FECTH_ORDER_FAIL':
      return {...state,error:action.payload}
    case 'FECTH_ORDERPRICE_REQUEST':
      return {...state}
    case 'FECTH_ORDERPRICE_SUCCESS':
      return {...state,totalOrderPrice:action.payload}
    case 'FECTH_ORDERPRICE_FAIL':
      return {...state, error:action.payload}
    default:
      return state
  }
}


function SellerDashBoard() {
  const {state} = useContext(Store);
  const {userInfo} = state;
  const [{error,productCount,totalOrder,totalOrderPrice}, dispatch] = useReducer(reducer,{
    loading:true,
    error:'',
    productCount:null,
    totalOrder:[],
    totalOrderPrice:[],
  })

  //Proudct count 
  useEffect(() => {
    const fatchData = async() => {
      dispatch({type:'FETCH_REQUEST'});
      try{
        const {data} = await axios.get(
          `/api/count/product/${userInfo._id}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        )
        dispatch({type:'FETCH_SUCCESS',payload:data})
      } catch(error) {
        dispatch({type:'FETCH_FAIL', payload:error})
      }
    }
    fatchData()
  },[userInfo,userInfo._id])

  // Total Order item

  useEffect(() => {
    const fatchData = async() => {
      dispatch({type:'FETCH_ORDER_REQUEST'})
      try{
        const {data} = await axios.get(
          `/api/summary/order/${userInfo._id}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        )
        dispatch({type:'FETCH_ORDER_SUCCESS',payload:data})
      } catch(error){
        dispatch({type:'FETCH_ORDER_SUCCESS',payload:error})
      }
    }
    fatchData()
  },[userInfo,userInfo._id])

  //Total Order Price
  useEffect(() => {
    const fatchData = async() => {
      dispatch({type:'FECTH_ORDERPRICE_REQUEST'})
      try{
        const {data} = await axios.get(
          `/api/summary/order/${userInfo._id}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        )
        dispatch({type:'FECTH_ORDERPRICE_SUCCESS',payload:data})
      } catch(error){
        dispatch({type:'FECTH_ORDERPRICE_FAIL',payload:error})
      }
    }
    fatchData()
  },[userInfo,userInfo._id])
  return (

    <div>
        <Sidebar />
        <div className='dashBoard'>
          <div className='Order_information'>
            <div className='Order_card_1'>
              <h4>Total Product</h4>
              <br />
              <h1>{productCount}</h1>
            </div>
            <div className='Order_card_1'>
              <h4>Product Orders</h4>
              {
                totalOrder.map((item,index) => {
                  if(userInfo._id === item._id)
                  return(
                    <h1>{item.quentity}</h1>
                  )
                })
              }
            </div>
            <div className='Order_card_1'>
              <h4>Total Selles</h4>
              {
                totalOrderPrice.map((orderItems) => {
                  if(userInfo._id === orderItems._id)
                  return(
                    <h1>{orderItems.totalOrderPrice}</h1>
                  )
                })
              }
              
            </div>
            <div className='Order_card_1'>
              <h4>Total Revenue</h4>
            </div>
          </div>
          <div className='dashBoard__productList'>
            <h3 style={{margin:'20px'}} >List Of Letest Product</h3>
            <ProductListComponent />
          </div>

      </div>
    </div>
  )
}

export default SellerDashBoard