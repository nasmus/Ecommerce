import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function ProductListComponent() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const Id = localStorage.getItem("userInfo._id");

  const [{ error, product, loading }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    product: [],
  });

  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/allproduct/${Id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchData();
  }, [userInfo, Id]);
  return (
    <div className="ProductListComponent">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product Picture
              </th>
              <th scope="col" class="px-6 py-3">
                Product Id
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Stock
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Rating
              </th>
              <th scope="col" class="px-6 py-3">
                NO.Reviews
              </th>
              <th scope="col" class="px-6 py-3">
                Edit Product
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((pro, index) => (
              <tr
                key={pro.index}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-6 py-4">
                  {" "}
                  <img
                    className=" h-12 "
                    src={`/images/${pro.image}`}
                    alt=""
                  />{" "}
                </td>
                <td class="px-6 py-4">{pro._id}</td>
                <td class="px-6 py-4 font-medium text-gray-900">{pro.name}</td>
                <td class="px-6 py-4">{pro.category}</td>
                <td class="px-6 py-4">{pro.countInStock}</td>
                <td class="px-6 py-4">{pro.price}</td>
                <td class="px-6 py-4">{pro.rating}</td>
                <th class="px-6 py-4">{pro.numReviews}</th>
                <th>
                  <button
                    type="button"
                    class="px-3 py-2 text-xs font-medium text-center text-white bg-gradient-to-r rounded-lg from-cyan-400 via-cyan-500 to-cyan-600 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                    variant="contained"
                    color="success"
                    onClick={() => {
                      navigate(`/productdetails/${pro._id}`);
                    }}
                  >
                    Product Details
                  </button>
                  
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductListComponent;
