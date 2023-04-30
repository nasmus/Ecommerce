import React from 'react'
import Sidebar from '../component/Sidebar'
import '../css/SellerDashboard.css';
import ProductListComponent from '../component/ProductListComponent';


function SellerDashBoard() {
  
  return (
    <div>
        <Sidebar />
        <div className='dashBoard'>
          <div className='Order_information'>
            <div className='Order_card_1'>
              <h4>Total Product</h4>
            </div>
            <div className='Order_card_1'>
              <h4>Total Orders</h4>
            </div>
            <div className='Order_card_1'>
              <h4>Total Earning</h4>
            </div>
            <div className='Order_card_1'>
              <h4>Total Selles</h4>
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