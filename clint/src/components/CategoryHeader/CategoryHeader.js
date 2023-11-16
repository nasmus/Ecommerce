import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CategoryHeader() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fatchData = async () => {
      const categoryData = await axios.get("api/category/get_all_category");
      setCategory(categoryData.data.categoryList);
    };
    fatchData();
  }, []);
  return (
    <div>
        {console.log(category)}
      <div
        style={{ marginBottom: "10px", marginTop: "10px" }}
        className="header_category"
      >
        <div id="ec-main-menu-desk" className="d-none d-lg-block sticky-nav">
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-12 align-self-center">
                <div className="ec-main-menu">
                  <ul>
                    {category && category.map((item, index) => {
                      return (
                        <li key={index} className="dropdown position-static">
                          <Link to={`/category/${item._id}`}>{item.name}</Link>
                          {item.children.length > 0 ? (
                            <ul style={{ width: "20%" }} className="sub-menu">
                              {item.children.map((element, index) => {
                                return (
                                  <li key={index}>
                                    <Link to={`/category/${element._id}`}>
                                      {element.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryHeader;
