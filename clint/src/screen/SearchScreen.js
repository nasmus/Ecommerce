import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import "../css/Product.css";
import Rating from "../components/Review/Rating";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import Product from "../components/Product";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProduct: action.payload.countProduct,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const prices = [
  {
    name: "$1 to $100",
    value: "1-100",
  },
  {
    name: "$101 to $500",
    value: "101-500",
  },
  {
    name: "$501 to $999",
    value: "501-999",
  },
  {
    name: "$1000 to $2000",
    value: "1000-2000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },
  {
    name: "3 stars & up",
    rating: 3,
  },
  {
    name: "2 stars & up",
    rating: 2,
  },
  {
    name: "1 stars & up",
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // search?category=Shirts
  const category = sp.get('category') || "all";
  const query = sp.get('query') || "all";
  const price = sp.get('price') || "all";
  const rating = sp.get('rating') || "all";
  const order = sp.get('order') || "newest";
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div className="m-2">
      <>
        <Row>
          <Col md={3}>
            {/* <h3>Department</h3>
            <div  >
              <ul>
                {categories.map((c) => (
                  <li key={c}>
                    <Link 
                      className={c === category ? "text-bold" : ""}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    className={"all" === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: "all" })}
                  >
                    Any
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className="">
              <h3>Price</h3>
              <ul>
                <li>
                  <Link style={{textDecoration:'none' }}
                    className={"all" === price ? "text-bold" : ""}
                    to={getFilterUrl({ price: "all" })}
                  >
                    Any
                  </Link>
                </li>
                {prices.map((p) => (
                  <li key={p.value}>
                    <Link style={{textDecoration:'none'}}
                      to={getFilterUrl({ price: p.value })}
                      className={p.value === price ? "text-bold" : ""}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <divs>
              <h3>Customer Review</h3>
              <ul>
                {ratings.map((r) => (
                  <li key={r.name}>
                    <Link style={{textDecoration:'none'}}
                      to={getFilterUrl({ rating: r.rating })}
                      className={
                        `${r.rating}` === `${rating}` ? "text-bold" : ""
                      }
                    >
                      <Rating caption={" & up"} rating={r.rating}></Rating>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                  style={{textDecoration:'none'}}
                    to={getFilterUrl({ rating: "all" })}
                    className={rating === "all" ? "text-bold" : ""}
                  >
                    <Rating caption={" & up"} rating={0}></Rating>
                  </Link>
                </li>
              </ul>
            </divs>
          </Col>
          <Col md={9}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <Row>
                  <Col md={6}>
                    <div>
                      {countProducts === 0 ? "No" : countProducts} Results
                      {query !== "all" && " : " + query}
                      {category !== "all" && " : " + category}
                      {price !== "all" && " : Price " + price}
                      {rating !== "all" && " : Rating " + rating + " & up"}
                      {query !== "all" ||
                      category !== "all" ||
                      rating !== "all" ||
                      price !== "all" ? (
                        <Button
                          variant="light"
                          onClick={() => navigate("/search")}
                        >
                          <i className="fas fa-times-circle"></i>
                        </Button>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="text-end">
                    Sort by{" "}
                    <select
                      value={order}
                      onChange={(e) => {
                        navigate(getFilterUrl({ order: e.target.value }));
                      }}
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                      <option value="toprated">Avg. Customer Reviews</option>
                    </select>
                  </Col>
                </Row>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}

                <div className="product-grid2">
                  {products.map((product) => (
                    <Product product={product}></Product>
                  ))}
                </div>
                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={{
                        pathname: "/search",
                        search: getFilterUrl({ page: x + 1 }).substring(7),
                      }}
                    >
                      <Button
                        className={Number(page) === x + 1 ? "text-bold" : ""}
                        variant="light"
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
              </>
            )}
          </Col>
        </Row>
      </>
    </div>
  );
}
