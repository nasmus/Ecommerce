import React from 'react'
import { Link } from 'react-router-dom';
import data from '../data';
function HomeScreen() {
  return (
    <div>
        <h1>Featured Product</h1>
        <div className="products">
          {
            
              data.products.map(product => (
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
            ))
          }
        </div>
    </div>
  )
}

export default HomeScreen