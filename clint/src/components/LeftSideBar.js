import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import "../css/LeftSideBar.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function LeftSideBar() {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const fatchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fatchCategories();
  }, []);
  return (
    <div
      className="ec-shop-leftside col-lg-2 sidebar"
    >
      <ul >
        {Categories.map((category) => (
          <Link className="Link_style" to={`/search?category=${category}`}>
            <li key={category}>
              <AddCircleOutlineIcon />
              <span className="items"> {category}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default LeftSideBar;
