import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import axios from 'axios';
import { Store } from '../Store';

function ProductUploadScreen() {
    const {state} = useContext(Store);
    const {userInfo} = state;
     const [name, setName] = useState('');
     const [price, setPrice] = useState('');
     const [image, setImage] = useState(null);
     const [brand, setBrand] = useState();
     const [description, setDescription] = useState('');
     const [countInStock, setCountInStock] = useState('');

     const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('name',name);
        form.append('description',description);
        form.append('image',image);
        form.append('price',price);
        form.append('brand',brand);
        form.append('countInStock', countInStock);

        try{
            await axios.post(`/api/product/create`, form,{ headers: { Authorization: `Bearer ${userInfo.token}` } });
            alert('product upload successfully');
            
        } catch(error) {
            alert(error);
        }

     }

  return (
    <div>
    <Sidebar />
        <h1>Product upload page</h1>
        <div style={{paddingLeft:'250px'}}>
        <div className="ec-shop-rightside col-lg-9 col-md-12">
                    <div className="ec-vendor-dashboard-card">
                        <div className="ec-vendor-card-body">
                            <div className="row">
                                <div className="col-lg-4">
                                    
                                </div>
                                <div className="col-lg-8">
                                    <div className="ec-vendor-upload-detail">
                                        <form onSubmit={handleSubmit} className="row g-3">
                                            <label>
                                                Image:
                                                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                            </label>
                                            <div className="col-md-6">
                                                <label for="inputEmail4" className="form-label">Product name</label>
                                                <input type="text" className="form-control" id="inputEmail4" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label  className="form-label"> <strong>Select Categories</strong> </label>
                                                <select name="categories" id="Categories" className="form-select">
                                                    
                                                </select>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label"> <strong>Sort Description</strong> </label>
                                                <textarea className="form-control" 
                                                    rows="2"></textarea>
                                            </div>
                                            
                                            <div className="col-md-6">
                                                <label className="form-label"> <strong>Price</strong></label>
                                                <input type="number" className="form-control" id="price1" value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Quantity</label>
                                                <input type="number" className="form-control" id="quantity1" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label for="inputEmail4" className="form-label">Brand Name</label>
                                                <input type="text" className="form-control" id="inputEmail4" value={brand} onChange={(e) => setBrand(e.target.value)} />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Ful Detail</label>
                                                <textarea className="form-control" value={description} onChange={(e)=> setDescription(e.target.value)}
                                                    rows="4"></textarea>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Product Tags <span>( Type and
                                                        make comma to separate tags )</span></label>
                                                <input type="text" className="form-control" id="group_tag" name="group_tag"
                                                    value="" placeholder="" data-role="tagsinput" />
                                            </div>
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>  
    </div>
  )
}

export default ProductUploadScreen