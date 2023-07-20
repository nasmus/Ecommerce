import React, { useContext, useEffect, useReducer, useState } from "react";
import Sidebar from "../component/Sidebar";
import "../css/AllOrder.css";
import { Button } from "@mui/material";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../utils";
import { useNavigate } from "react-router-dom";
import OrderDetails from "./OrderDetails";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function AllOrder() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  //const [orders,setOrders] = useState([]);
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    orders: [],
  });

  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/order/allorder`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchData();
  }, [userInfo]);

  return (
    <div>
      <Sidebar />
      <div className="allOrder">
        <table>
          <thead>
            <tr className="head">
              <th>Product Id</th>
              <th>Oreder status</th>
              <th>Quentity</th>
              <th>price</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody className="body" >
            {orders.map((order) => (
              <>
                {order.orderItems.map((item) => {
                  if (item.seller === userInfo._id)
                    return (
                      <tr className="element" key={item._id}>
                        <td>{item._id}</td>
                        <td className={item.orderStatus}>{item.orderStatus}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}</td>

                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            navigate(`/orderdetails/${order._id}`);
                          }}
                        >
                          Order Details
                        </Button>
                      </tr>
                    );
                })}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllOrder;
