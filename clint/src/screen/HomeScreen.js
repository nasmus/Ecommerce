import React, { useEffect, useReducer, useState } from 'react'

import axios from 'axios';
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

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

function HomeScreen() {
  const [{loading, error, products}, dispatch] = useReducer( logger(reducer),{
    products:[],
    loading:true,
    error:''
  })
  //const [products,setProducts] = useState([]); // if we use useState then this is use it
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
    <div>
        <h1>Featured Product</h1>
        <div className="products">
          {
            loading? (
              <LoadingBox />
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : (
              <Row>
              {products.map((product) => (
                <Col key={product.id} sm={6} md={4} lg={3} className="md-3" >
                  <Product product={product} ></Product>
                </Col>
            ))}
            </Row>
              
            )
            
          }
        </div>
    </div>
  )
}

export default HomeScreen