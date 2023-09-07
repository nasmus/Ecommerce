import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Sidebar from "../Component/Sidebar";
import { Store } from "../Store";

function SellerList() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [sellerList, setSellerList] = useState([]);
  useEffect(() => {
    const fatchData = async () => {
      const { data } = await axios.get(`/api/admin/storelist/sellerList`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setSellerList(data);
    };

    fatchData();
  }, [userInfo.token]);
  return (
    <div>
      <Sidebar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        
        <table>
          <tr>
            <th>Seller Id</th>
            <th>Seller name</th>
            <th>email</th>
            <th>Phone Number</th>
          </tr>
          {sellerList.map((item, index) => {
            return (
              <tr>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default SellerList;
