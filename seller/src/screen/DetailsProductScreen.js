import React, { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../Store";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getError } from "../utils";
import { Button } from "@mui/material";
import Sidebar from "../component/Sidebar";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function DetailsProductScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const params = useParams();
  const { id: productId } = params;
  const { userInfo } = state;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    product: [],
  });
  const [imageValue, setImageValue] = useState([]);

  useEffect(() => {
    const fatchdata = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/productdetails/${productId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchdata();
  }, [userInfo, productId]);

  useEffect(() => {
    setImageValue(product.multipleImage);
  }, [product.multipleImage]);

  return (
    <div>
      <Sidebar />
      <div className=" ml-52 pt-8 ">
        <div className="flex items-center justify-center gap-7  ">
          {imageValue &&
            imageValue.map((image, index) => {
              return <img className=" w-20 " src={`/images/${image}`} alt="" />;
            })}
        </div>

        <h3>{product.name}</h3>
        <h3>{product.price}</h3>
        <h2>{product.category}</h2>
        <h2>{product.countInStock}</h2>
        <h2>{product.rating}</h2>
        <h2>{product.numReviews}</h2>
        <h2>{product.createdAt}</h2>
        <Button
          onClick={() => {
            navigate(`/editproduct/${product._id}`);
          }}
        >
          edit Product
        </Button>
      </div>
    </div>
  );
}

export default DetailsProductScreen;
