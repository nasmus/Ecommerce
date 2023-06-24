import React, { useContext, useEffect, useReducer } from 'react'
import Sidebar from '../component/Sidebar'
import '../css/SellerDashboard.css';
import ProductListComponent from '../component/ProductListComponent';
import axios from 'axios';
import { Store } from '../Store';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import WalletIcon from '@mui/icons-material/Wallet';

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
              <div className='left'>
                <h1>{productCount}</h1>
                <p>Total Product</p>
              </div>
              <div className='right'>
                <ProductionQuantityLimitsIcon />
              </div>
              
              
            </div>
            <div className='Order_card_1'>
              <div className='left'>
              {
                totalOrder.map((item,index) => {
                  if(userInfo._id === item._id)
                  return(
                    <h1>{item.quentity}</h1>
                  )
                })
              }
              <p>Product Orders</p>
              </div>
              <div className='right'> 
                <AddAlertIcon />
              </div>
              
              
            </div>
            <div className='Order_card_1'>
              <div className='left'>
                {
                  totalOrderPrice.map((orderItems) => {
                    if(userInfo._id === orderItems._id)
                    return(
                      <h1>{orderItems.totalOrderPrice}</h1>
                    )
                  })
                }
                <p>total selles</p>
              </div>
              <div className='right'>
                <AccountBalanceIcon />
              </div>
              
              
            </div>
            <div className='Order_card_1'>
              <div className='left'>
                <h1>1500</h1>
                <p>Total Revenue</p>
              </div>
              <div className='right'>
                <WalletIcon />
              </div>
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