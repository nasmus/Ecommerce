import React, { useContext, useEffect, useReducer } from "react";
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
    product: {},
  });

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
  }, [userInfo]);

  return (
    <div>
      <Sidebar />
      <div>
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
