import React, { useContext, useEffect, useReducer } from "react";
import Sidebar from "../component/Sidebar";
import "../css/SellerDashboard.css";
import axios from "axios";
import { Store } from "../Store";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import AreacChart from "../component/AreacChart";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state };
    case "FETCH_SUCCESS":
      return { ...state, productCount: action.payload };
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    case "FETCH_ORDER_REQUEST":
      return { ...state };
    case "FETCH_ORDER_SUCCESS":
      return { ...state, totalOrder: action.payload };
    case "FECTH_ORDER_FAIL":
      return { ...state, error: action.payload };
    case "FECTH_ORDERPRICE_REQUEST":
      return { ...state };
    case "FECTH_ORDERPRICE_SUCCESS":
      return { ...state, totalOrderPrice: action.payload };
    case "FECTH_ORDERPRICE_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function SellerDashBoard() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ error, productCount, totalOrder, totalOrderPrice }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      productCount: null,
      totalOrder: [],
      totalOrderPrice: [],
    });

  //Proudct count
  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/count/product/${userInfo._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    fatchData();
  }, [userInfo, userInfo._id]);

  // Total Order item

  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FETCH_ORDER_REQUEST" });
      try {
        const { data } = await axios.get(`/api/summary/order/${userInfo._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_ORDER_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ORDER_SUCCESS", payload: error });
      }
    };
    fatchData();
  }, [userInfo, userInfo._id]);

  //Total Order Price
  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FECTH_ORDERPRICE_REQUEST" });
      try {
        const { data } = await axios.get(`/api/summary/order/${userInfo._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FECTH_ORDERPRICE_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FECTH_ORDERPRICE_FAIL", payload: error });
      }
    };
    fatchData();
  }, [userInfo, userInfo._id]);
  return (
    <div>
      <Sidebar />
      <div className="dashBoard">
        <div className="Order_information">
          <div className="Order_card_1">
            <div className="left">
              <h1 className=" text-2xl font-extrabold ">{productCount}</h1>
              <p>Total Product</p>
            </div>
            <div className="right">
              <ProductionQuantityLimitsIcon />
            </div>
          </div>
          <div className="Order_card_1">
            <div className="left">
              {totalOrder.map((item, index) => {
                if (userInfo._id === item._id)
                  return <h1 className="text-2xl font-extrabold">{item.quentity}</h1>;
              })}
              <p>Product Orders</p>
            </div>
            <div className="right">
              <AddAlertIcon />
            </div>
          </div>
          <div className="Order_card_1">
            <div className="left">
              {totalOrderPrice.map((orderItems) => {
                if (userInfo._id === orderItems._id)
                  return (
                    <h1 className=" text-2xl font-extrabold ">
                      {orderItems.totalOrderPrice}
                    </h1>
                  );
              })}
              <p>total selles</p>
            </div>
            <div className="right">
              <AccountBalanceIcon />
            </div>
          </div>
          <div className="Order_card_1">
            <div className="left">
              <h1 className="text-2xl font-extrabold ">5</h1>
              <p>Panding Order</p>
            </div>
            <div className="right">
              <BatchPredictionIcon />
            </div>
          </div>
        </div>
        <div className="product_and_order_section">
          <div className="product">
            <AreacChart />
            <h4>Monthly Selles</h4>
          </div>
          <div className=" border-2 w-4/5 mr-6 rounded-lg ">
            <div className=" flex items-center  justify-between p-4 border-b-2">
              <div>
                <h3 className=" text-indigo-600 font-bold ">Notification</h3>
              </div>
              <div className=" cursor-pointer ">
                <h3 className="text-indigo-600">
                <AddAlertIcon />
                </h3>
              </div>
            </div>
            <div className="flex justify-between pt-3 pb-1 px-2 m-1 rounded-lg bg-cyan-200 ">
              <div className=" h-1 w-1 rounded-full ">1</div>
              <div>
                <p>12345</p>
              </div>
              <div>
                <p>product name</p>
              </div>
              <div>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50   font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashBoard;
