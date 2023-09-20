import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar";
import { Store } from "../../Store";
import axios from "axios";

function Category() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fatchData = async() => {
      const category = await axios.get(`/api/admin/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategoryList(category.data.categoryList);
    };
    fatchData();
  }, [userInfo]);

  return (
    <div style={{ marginLeft: "400px" }} className="category">
      <Sidebar />
      {console.log(categoryList)}
      {
        categoryList.map((item,index) => {
          return(
            <ul>
              <li><h1 key={index}>{item.name}</h1></li>
              <ul style={{marginLeft:'40px'}} >
              {item.children.map((eleement,index) => {
                return(
                  <li key={index}> <h3>{eleement.name}</h3> </li>
                )
              })}
              </ul>
            </ul>
            
          )
        })
      }
      
    </div>
  );
}

export default Category;
