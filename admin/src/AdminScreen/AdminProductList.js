import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import Sidebar from "../Component/Sidebar";

function AdminProductList() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    const fatchDate = async () => {
      const productList = await axios.get(`/api/admin/productlist/allproduct`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setAllProduct(productList.data);
    };
    fatchDate();
  }, [userInfo.token]);
  return (
    <div>
      <Sidebar />
      {console.log("allproduct",allProduct)}
      <div style={{ display: "flex", justifyContent: "center" }}>
      <table>
          <tr>
            <th>product Id</th>
            <th>product name</th>
            <th>product brand</th>
            <th>product price</th>
            <th>Seller</th>
            <th>Product stock</th>
            <th>Category</th>
            <th>reating</th>
            <th>number of review</th>
          </tr>
          {allProduct.map((item, index) => {
            return (
              <tr>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.createdBy}</td>
                <td>{item.countInStock}</td>
                <td>{item.rating}</td>
                <td>{item.numReviews}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default AdminProductList;
