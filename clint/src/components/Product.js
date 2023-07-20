import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
import Rating from './Rating';
import { Store } from '../Store';
import axios from 'axios';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Product(props) {
    const { product } =props;

    const { state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart:{ cartItems },
    } = state
    
    const addToCartHandeler = async (item) => {
      const existItem =  cartItems.find( x => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${item._id}`)
      if(data.countInStock < quantity){
          window.alert('Sorry Bro !');
          return ;
      }
      ctxDispatch({
          type:'CART_ADD_ITEM',
          payload:{...item,quantity}
      })
      
  }

  return (
    
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content">
        <div className="ec-product-inner">
          <div className="ec-pro-image-outer">
            <div className="ec-pro-image">
            <Link to={`/product/${product.slug}`} className="image">
              <img className="main-image"
                src={product.image} alt={product.name} />
            </Link>
              <span className="percentage">Prime</span>
            </div>
          </div>
              <div className="ec-pro-content">
                <h5 className="ec-pro-title"><Link to={`/product/${product.slug}`}>{product.name}</Link></h5>
                  <div className="ec-pro-rating">
                    <span> <Rating rating={product.rating} numReviews={product.numReviews} /> </span>
                  </div>
                    <span className="ec-price">
                    <span className="new-price">${product.price}</span>
                    </span>
                      <div className="ec-pro-option">
                        <div className="ec-pro-size">
                          <span className="ec-pro-opt-label">Button</span>
                          {
                            product.countInStock === 0 
                            ? <Button variant='contained' size="small" endIcon={<AddShoppingCartIcon />} disabled >Out Of Stock</Button>
                            : <Button onClick={() => addToCartHandeler(product)} variant="contained" size="small" endIcon={<AddShoppingCartIcon />} >Add To Cart</Button>
                          }
                        </div>
                    </div>
              </div>
          </div>
      </div>          
  )
}

export default Product