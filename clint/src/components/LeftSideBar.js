import React from 'react'

function LeftSideBar() {
  return (
    
        <div className="ec-shop-leftside col-lg-3 col-md-12 order-lg-first order-md-last">
                    <div id="shop_sidebar">
                        <div className="ec-sidebar-heading">
                            <h1>Filter Products By</h1>
                        </div>
                        <div className="ec-sidebar-wrap">
                            <div className="ec-sidebar-block">
                                <div className="ec-sb-title">
                                    <h3 className="ec-sidebar-title">Category</h3>
                                </div>
                                <div className="ec-sb-block-content">
                                    <ul>
                                        <li>
                                            <div className="ec-sidebar-block-item">
                                                <input type="checkbox" checked /> <a href="#">clothes</a><span
                                                    className="checked"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ec-sidebar-block-item">
                                                <input type="checkbox" /> <a href="#">Bags</a><span
                                                    className="checked"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ec-sidebar-block-item">
                                                <input type="checkbox" /> <a href="#">Shoes</a><span
                                                    className="checked"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ec-sidebar-block-item">
                                                <input type="checkbox" /> <a href="#">cosmetics</a><span
                                                    className="checked"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ec-sidebar-block-item">
                                                <input type="checkbox" /> <a href="#">electrics</a><span
                                                    className="checked"></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="ec-sidebar-block-item">
                                                <input type="checkbox" /> <a href="#">phone</a><span
                                                    className="checked"></span>
                                            </div>
                                        </li>
                                        <li id="ec-more-toggle-content" style={{padding: '0', display: 'none'}}>
                                            <ul>
                                                <li>
                                                    <div className="ec-sidebar-block-item">
                                                        <input type="checkbox" /> <a href="#">Watch</a><span
                                                            className="checked"></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="ec-sidebar-block-item">
                                                        <input type="checkbox" /> <a href="#">Cap</a><span
                                                            className="checked"></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="ec-sidebar-block-item ec-more-toggle">
                                                <span className="checked"></span><span id="ec-more-toggle">More
                                                    Categories</span>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div>
  )
}

export default LeftSideBar