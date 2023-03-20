import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';

function LeftSideBar() {
    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        const fatchCategories = async() => {
            try{
                const {data} = await axios.get(`/api/products/categories`);
                setCategories(data);
            } catch(err) {
                toast.error(getError(err));
            }
        }
        fatchCategories();
    },[])
  return (
        <div className="ec-shop-leftside col-lg-3 col-md-12 order-lg-first order-md-last">
                    <div id="shop_sidebar">
                        <div className="ec-sidebar-heading">
                            <h1>Filter By Category </h1>
                        </div>
                        <div className="ec-sidebar-wrap">
                            <div className="ec-sidebar-block">                   
                                <div className="ec-sb-block-content">
                                    <ul>
                                        {Categories.map((category) => (
                                            <Link to={`/search?category=${category}`} >
                                                <li key={category}  >                                                
                                                    <div className="ec-sidebar-block-item ec-more-toggle">
                                                        <span> <span><i class="fa-duotone fa-bars"></i></span> {category}</span>
                                                    </div>
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default LeftSideBar