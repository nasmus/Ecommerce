import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger'

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
              <div>Lodding ...</div>
            ) : error ? (
              <div>{error}</div>
            ): (
            
              products.map(product => (
              <div className="product" key={product.id} >
                <Link to={`/product/${product.slug}`}>
                  <img className="product__image" src={product.image} alt={product.name} />
                </Link>
                <div className="product__info">
                  <Link to={`/product/${product.slug}`}>
                    <p>
                      {product.name}
                    </p>
                  </Link>
                  <p>
                   <strong>${product.price}</strong> 
                  </p>
                  <button>Add to cart</button>
                </div>
              </div>
            )))
          }
        </div>
    </div>
  )
}

export default HomeScreen