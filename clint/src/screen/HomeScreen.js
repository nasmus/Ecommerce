import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import logger from 'use-reducer-logger'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import LeftSideBar from '../components/LeftSideBar';
import Container from 'react-bootstrap/Container'

const reducer = (state,action) => {
  switch(action.type){
    case 'FATCH_REQUEST':
      return{...state, loading:true};
    case 'FATCH_SUCCESS':
      return{...state, products: action.payload, loading:false };
    case 'FATCH_FAILLED':
      return{...state, loading:false, error:action.payload};
    default:
      return state;
  }
}

function HomeScreen(props) {
  const [{loading, error, products}, dispatch] = useReducer( logger(reducer),{
    products:[],
    loading:true,
    error:''
  })
  //const [products,setProducts] = useState([]); // if we use useState then use it
  useEffect(()=>{
    const fatchData = async() => {
      dispatch({ type:'FATCH_REQUEST' })
      try {
        const result = await axios.get(`/api/products`);
        dispatch({type:'FATCH_SUCCESS', payload:result.data})
      } catch (err) {
        dispatch({ type: 'FATCH_FAILLED', payload:err.message })
      }
      
      //setProducts(result.data); // if we use useState then we use it
    };
    fatchData();
  },[])
  return (
    <Container style={{display:'flex', width:'100%', margin:'auto'}} >
      {/* {
        (props.isVisible) ? <LeftSideBar /> : <div></div>
      } */}
      
        
        <div className="products">
          {
            loading? (
              <LoadingBox />
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : (
              <div style={{display:'flex'}} >
                <div className="shop-pro-content">
                  <div className="shop-pro-inner">
                      <div className="row">
                          {products.map((product) => (
                              <Product product={product} ></Product>
                            ))
                          }
                      </div>
                  </div>  
                </div> 
              </div> 
            )
          }
          
        </div>
        
    </Container>
  )
}

export default HomeScreen