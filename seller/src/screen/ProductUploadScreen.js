import React, { useContext, useState,useEffect } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import '../css/ProductUploadScreen.css'
import { Store } from "../Store";

function ProductUploadScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('')
  const [chieldCategory, setChieldCategory] = useState([])
  const [chieldCategoryId, setChieldCategoryId] = useState('')
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [multipleImage, setMultipleImages] = useState([]);
  const [submitCategory, setSubmitCategory] = useState('')

  const handleMultipleImageChange = (e) => {
    const files = e.target.files;
    setMultipleImages([...multipleImage, ...files]);
  };

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`api/seller/category/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategory(category.data);
    };
    fatchData();
  }, [userInfo.token]);

  useEffect(() => {
    const fatchData = async() => {
      const category = await axios.get(`api/seller/category/chield_category/${categoryId}`,{
        headers:{ authorization: `Bearer ${userInfo.token}` }
      })
      setChieldCategory(category.data)
    }
    fatchData()
  },[userInfo.token,categoryId])

  useEffect(() => {
    setSubmitCategory(categoryId)
  },[categoryId])

  useEffect(() => {
    setSubmitCategory(chieldCategoryId)
  },[chieldCategoryId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("brand", brand);
    form.append("category", submitCategory);
    form.append("countInStock", countInStock);
    if (multipleImage) {
      multipleImage.forEach((image, index) => {
        form.append("multipleImage", image);
      });
    } else {
      console.log("problem");
    }

    try {
      const upload = await axios.post(`/api/product/create`, form, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(upload);
      alert("product upload successfully");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ paddingLeft: "250px" }}>
        <div className="image_grid">
          {multipleImage.map((images, index) => (
            <div className="image" key={index}>
              <img src={URL.createObjectURL(images)} alt="" />
            </div>
          ))}
        </div>
        <div className="ec-vendor-upload-detail">
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
            className="row g-3"
          >

            <div className="col-md-6">
              <label>Product name</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label>
                <strong>Price</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="price1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity1"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Brand Name</label>
              <input
                type="text"
                className="form-control"
                id="brandname"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>select Category</option>
            {category.map((option) =>{
              if(option.parentId === undefined)
              return(
                (
                  <option key={option.value} value={option._id}>
                    {option.name}
                  </option>
                )
              )
            } )}
          </select>

          <select
            value={chieldCategoryId}

            onChange={(e) => setChieldCategoryId(e.target.value)}
          >
            <option>select Category</option>
            {chieldCategory.map((option) =>{
              return(
                (
                  <option key={option.value} value={option._id}>
                    {option.name}
                  </option>
                )
              )
            } )}
          </select>
            
            {console.log(submitCategory)}
            <div className="col-md-12">
              <label>Full Detail</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              ></textarea>
            </div>
            <div>
              <label>Upload multiple images:</label>
              <input
                type="file"
                accept="image/*"
                name="multipleImage"
                multiple
                onChange={handleMultipleImageChange}
              />
            </div>

            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductUploadScreen;
