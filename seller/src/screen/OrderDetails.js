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
    <div style={{ paddingLeft: "200px" }}>
      <Sidebar />
      
        <div className="flex items-center justify-between px-5 py-5">
          <h1 className="text-4xl text-center font-bold">Order Details</h1>
          <div className="flex md:flex-col md:w-1/5">
            <select
              id="status"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:px-6 p-2 "
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Received">Received</option>
            </select>
            <button className="bg-green-500 hover:bg-green-600 p-2 ml-2 md:ml-0 md:px-6 md:my-1.5 text-white rounded-lg">
              Submit
            </button>
          </div>
        </div>
        
        <div className="px-5 py-5 md:flex w-10/12 ">
          <section className="md:w-4/5 md:px-6 text-black">
            <div className="relative overflow-x-auto py-3 md:py-6">
              <table className="w-full text-sm text-left rtl:text-right text-black font-medium">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                {orderDetail.orderItems &&
                  orderDetail.orderItems.map((item) => {
                    if (item.seller === userInfo._id) {
                      return (
                        <tbody>
                          <tr className="bg-white border-b ">
                            <th
                              scope="row"
                              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                            >
                              <img
                                src={`/images/${item.image}`}
                                alt=""
                                className="w-8 h-8"
                              />
                              <span className="pl-2">{item.name}</span>
                            </th>
                            <td className="px-6 py-4">{item._id}</td>
                            <td className="px-6 py-4 ">
                              <span>{item.quantity}</span>
                            </td>
                            <td className="px-6 py-4">
                              {item.price * item.quantity}
                            </td>
                          </tr>
                        </tbody>
                      );
                    }
                  })}
              </table>
            </div>
          </section>
          <section className="py-4 md:w-2/5">
            <div className="bg-gradient-to-tr from-gray-900 to-gray-700 text-white p-4 md:py-16 md:px-8  rounded-xl">
              <h1 className="text-4xl  font-bold">Address Info.</h1>
              <div className="pt-6">
                <div className="text-lg flex justify-evenly  md:justify-between py-3 ">
                  <div className="">
                    <p className="font-medium">Name: </p>
                    <p>
                      {orderDetail.shippingAddress &&
                        orderDetail.shippingAddress.fullName}
                    </p>
                  </div>
                  <div className="">
                    <p className="font-medium">User ID: </p>
                    <p>{orderDetail.user}</p>
                  </div>
                </div>
                <span className="text-lg font-medium"> Shipping Address: </span>
                <span>
                  {orderDetail.shippingAddress &&
                    orderDetail.shippingAddress.address}
                </span>
                <div className="text-lg flex justify-evenly md:justify-between py-3 ">
                  <div>
                    <span className="font-medium">District: </span>
                    <span>
                      {orderDetail.shippingAddress &&
                        orderDetail.shippingAddress.distric}
                    </span>
                  </div>
                  <div className="">
                    <span className="font-bold">Total amount: </span>
                    <span className="font-bold">$545</span>
                  </div>
                  <div className="">
                    <span className="font-bold">city: </span>
                    <span className="font-bold">
                      {orderDetail.shippingAddress &&
                        orderDetail.shippingAddress.city}
                    </span>
                  </div>
                  <div className="">
                    <span className="font-bold">Phone number </span>
                    <span className="font-bold">
                      {orderDetail.shippingAddress &&
                        orderDetail.shippingAddress.phoneNumber}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center py-3">
                  <button className="text-xl border px-6 py-3 rounded-full  ">
                    Invoice
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* <h1>address</h1>
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
        </div>*/}
      
    </div>
  );
}

export default OrderDetails;
