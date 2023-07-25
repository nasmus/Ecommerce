import React, { useContext, useState } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import { Store } from "../Store";

function ProductUploadScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [multipleImage, setMultipleImage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("image", image);
    form.append("price", price);
    form.append("brand", brand);
    form.append("countInStock", countInStock);
    form.append("images", multipleImage);

    try {
      await axios.post(`/api/product/create`, form, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      alert("product upload successfully");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ paddingLeft: "250px" }}>
        <div className="ec-vendor-upload-detail">
          <form onSubmit={handleSubmit} className="row g-3">
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
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
                {" "}
                <strong>Select Categories</strong>{" "}
              </label>
              <select
                name="categories"
                id="Categories"
                className="form-select"
              ></select>
            </div>
            <div className="col-md-12">
              <label>
                {" "}
                <strong>Sort Description</strong>{" "}
              </label>
              <textarea className="form-control" rows="2"></textarea>
            </div>

            <div className="col-md-6">
              <label>
                {" "}
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
                id="inputEmail4"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label>Ful Detail</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              ></textarea>
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
