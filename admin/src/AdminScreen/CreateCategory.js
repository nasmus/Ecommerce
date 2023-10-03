import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import TextField from "@mui/material/TextField";
import Sidebar from "../Component/Sidebar";
import { Button } from "@mui/material";
import {useNavigate } from "react-router-dom";

function CreateCategory() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [categories, setCategoryList] = useState([]);
  const [parentId, setParentId] = useState('');
  const [name, setName] = useState("");

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`/api/admin/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategoryList(category.data.categoryList);
    };
    fatchData();
  }, [userInfo.token]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  const form = new FormData();
    //  form.append("name", name);
    //  form.append('parentId',parentCategoryId);

    try {
      await axios.post(`/api/admin/category/addcategory`, {name,parentId}, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      alert("product upload successfully");
    } catch (error) {
      alert(error);
    }
  };


  const createCategoryList = (options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        for (let item of category.children) {
          options.push({
            value: item._id,
            name: item.name,
            parentId: item.parentId,
            type: item.type,
          });
          if (item.children.length > 0) {
            for (let element of item.children) {
              options.push({
                value: element._id,
                name: element.name,
                parentId: element.parentId,
                type: element.type,
              });
            }
          }
        }
      }
    }
    return options;
  };

  return (
    <div>
      <Sidebar />
      <div className="create__category">
        <form
        onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option>select Category</option>
            {createCategoryList().map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <button type="submit" >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
