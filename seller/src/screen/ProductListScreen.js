import React from 'react'
import Sidebar from '../component/Sidebar'
import '../css/SellerDashboard.css';
import '../css/ProductListScreen.css';
import ProductListComponent from '../component/ProductListComponent';


function ProductListScreen() {
  
  return (
    <div>
        <Sidebar />
        <h1>List Of Proudct</h1>
        <div className='productListScreen'>
        <ProductListComponent />
        
        </div>
    </div>
  )
}

export default ProductListScreen