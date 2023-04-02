import React from 'react'
import Container from 'react-bootstrap/Container'

function ProductUploadScreen() {
  return (
    <div>
    <Container>
        <h1>Product upload page</h1>
    <div className="ec-shop-rightside col-lg-9 col-md-12">
                    <div className="ec-vendor-dashboard-card">
                        <div className="ec-vendor-card-body">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="ec-vendor-img-upload">
                                        <div className="ec-vendor-main-img">
                                            <div className="avatar-upload">
                                                <div className="avatar-edit">
                                                    <input type='file' id="imageUpload" className="ec-image-upload"
                                                        accept=".png, .jpg, .jpeg" />
                                                    <label for="imageUpload"><i className="fi-rr-edit"></i></label>
                                                </div>
                                                <div className="avatar-preview ec-preview">
                                                    <div className="imagePreview ec-div-preview">
                                                        <img className="ec-image-preview"
                                                            src="assets/images/product-image/vender-upload-preview.jpg"
                                                            alt="edit" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="ec-vendor-upload-detail">
                                        <form className="row g-3">
                                            <div className="col-md-6">
                                                <label for="inputEmail4" className="form-label">Product name</label>
                                                <input type="text" className="form-control" id="inputEmail4" />
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
                                                <input type="number" className="form-control" id="price1" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Quantity</label>
                                                <input type="number" className="form-control" id="quantity1" />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Ful Detail</label>
                                                <textarea className="form-control"
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
    
        </Container>
    </div>
  )
}

export default ProductUploadScreen