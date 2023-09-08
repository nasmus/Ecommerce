import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import Sidebar from "../Component/Sidebar";

function AllOrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [allOrder, setAllOrder] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fatchData = async () => {
      const orderList = await axios.get(`/api/admin/orderlist/allorder`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      if(orderList) {
        setAllOrder(orderList.data);
      } else {
        console.log("order not found");
      }
    };
    fatchData();
  }, [userInfo.token]);
  return (
    <div>
      <Sidebar />
      <div>
        <table>
          <tr>
            <th>Order ID</th>
            <th>Payment</th>
            <th>itemsPrice</th>
            <th>user ID</th>
            <th>createdAt</th>
          </tr>
          {allOrder.map((item,index) => (
            <tr key={index} >
              <td>{item._id}</td>
              <td>{item.paymentMethod}</td>
              <td>{item.itemsPrice}</td>
              <td>{item.user}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default AllOrderScreen;
