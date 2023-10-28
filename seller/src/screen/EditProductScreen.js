import React, { useContext, useEffect, useReducer, useState } from "react";
import Sidebar from "../component/Sidebar";
import { Button } from "@mui/material";
import { Store } from "../Store";
import { useNavigate, useParams } from "react-router-dom";
import { getError } from "../utils";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_UPDATE_REQUEST":
      return { ...state, updateLoading: true };
    case "FETCH_UPDATE_SUCCESS":
      return { ...state, updateLoading: false };
    case "FETCH_UPDATE_FALI":
      return { ...state, updateLoading: false };
    default:
      return state;
  }
};

function EditProductScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: productId } = params;
  const navigate = useNavigate();

  const [{ loading, error, updateProduct, updateLoading, product }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      updateProduct: [],
    });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fatchdata = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/productdetails/${productId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setImage(data.image);
        setDescription(data.description);
        setBrand(data.brand);
        setPrice(data.price);
        setCountInStock(data.countInStock);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchdata();
  }, [userInfo, productId]);

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "FETCH_UPDATE_REQUEST" });
      await axios.put(
        `/api/edit/${productId}`,
        {
          _id: productId,
          name,
          slug: name,
          price,
          description,
          image,
          countInStock,
          brand,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "FETCH_UPDATE_SUCCESS" });
      alert("product update successfully");
      navigate("/productlist");
    } catch (error) {
      dispatch({ type: "FETCH_UPDATE_FALI", error: getError(error) });
    }
  };

  return (
    <div>
      <Sidebar />
      <h1>produc edit{name}</h1>
      <div style={{ paddingLeft: "250px" }}>
        <div className="ec-shop-rightside col-lg-9 col-md-12">
          <div className="ec-vendor-dashboard-card">
            <div className="ec-vendor-card-body">
              <div className="row">
                <div className="col-lg-8">
                  <div className="ec-vendor-upload-detail">
                    <form onSubmit={handleUpdateData} className="row g-3">
                      <label>
                        Image:
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </label>
                      <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">
                          Product name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputEmail4"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">
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
                        <label className="form-label">
                          {" "}
                          <strong>Sort Description</strong>{" "}
                        </label>
                        <textarea className="form-control" rows="2"></textarea>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">
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
                        <label className="form-label">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          id="quantity1"
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">
                          Brand Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputEmail4"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Ful Detail</label>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductScreen;
