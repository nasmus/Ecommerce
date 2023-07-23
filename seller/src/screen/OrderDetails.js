import React, { useContext, useReducer, useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { Store } from "../Store";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orderDetail: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderDetails() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const [orderStatus, setOrderStatus] = useState("");
  const [{ eorro, loading, orderDetail }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    orderDetail: [],
  });

  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/order/orderdetails/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchData();
  }, [userInfo, orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/order/status/${orderId}`,
        {
          orderStatus,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fatchDataApi = async () => {};
    fatchDataApi();
  }, [orderId, userInfo.token]);

  return (
    <div style={{ paddingLeft: "255px" }}>
      <Sidebar />
      <div>
        <h1>address</h1>
        <ul class="list-group list-group-light">
          <li> user ID:{orderDetail.user}</li>
          <li class="list-group-item">
            {orderDetail.shippingAddress &&
              orderDetail.shippingAddress.fullName}
          </li>
          <li class="list-group-item">
            {orderDetail.shippingAddress &&
              orderDetail.shippingAddress.phoneNumber}
          </li>
          <li class="list-group-item">
            {orderDetail.shippingAddress && orderDetail.shippingAddress.address}
          </li>
          <li class="list-group-item">
            {orderDetail.shippingAddress && orderDetail.shippingAddress.city}
          </li>
          <li class="list-group-item">
            {orderDetail.shippingAddress && orderDetail.shippingAddress.distric}
          </li>
        </ul>
      </div>
      <div className="order_details">
        <div className="left">
          <table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Name</th>
                <th>Queantity</th>
                <th>Image</th>
                <th>Price</th>
              </tr>
            </thead>

            {orderDetail.orderItems &&
              orderDetail.orderItems.map((item) => {
                if (item.seller === userInfo._id) {
                  return (
                    <tbody>
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <img src={item.image} />
                        </td>
                        <td>{item.price * item.quantity}</td>
                      </tr>
                    </tbody>
                  );
                }
              })}
          </table>
        </div>

        <div className="right">
          <form onSubmit={handleSubmit}>
            <select
              name="rderStatus"
              id="status"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="Panding">Panding</option>
              <option value="cancel">cancel</option>
              <option value="shipped">shipped</option>
            </select>
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
