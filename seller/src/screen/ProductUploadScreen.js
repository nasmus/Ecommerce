import React, { useContext, useState } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import '../css/ProductUploadScreen.css'
import { Store } from "../Store";

function ProductUploadScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  //const [image, setImage] = useState(null);
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [multipleImage, setMultipleImages] = useState([]);

  const handleMultipleImageChange = (e) => {
    const files = e.target.files;
    setMultipleImages([...multipleImage, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    //form.append("image", image);
    form.append("price", price);
    form.append("brand", brand);
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
            {/* <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label> */}
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
