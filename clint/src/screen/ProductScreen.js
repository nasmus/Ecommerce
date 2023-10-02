import React, { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/ProductScreen.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Rating from "../components/Rating";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FATCH_REQUEST":
      return { ...state, loading: true };
    case "FATCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FATCH_FAILLED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    error: "",
    loading: true,
  });

  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    const fatchData = async () => {
      dispatch({ type: "FATCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FATCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FATCH_FAILLED", payload: getError(err) });
      }
    };
    fatchData();
  }, [slug]);

  useEffect(() => {
    const fatchData = async () => {
      const randomData = await axios.get(`/api/random/product_suggest`);
      if (randomData.data !== "") {
        setRandomProducts(randomData.data);
      }
    };
    fatchData();
  }, []);

  // bring data from react context api
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  const [activeImage, setActiveImage] = useState();
  const [imageValue, setImageValue] = useState([]);
  useEffect(() => {
    if (product.multipleImage !== undefined) {
      setActiveImage(product.multipleImage[0]);
      setImageValue(product.multipleImage);
    }
  }, [product.multipleImage]);
  //console.log(imageValue)

  return (
    <div>
      <div className="product_section">
        <div className="images">
          <img className="main_image" src={`/images/${activeImage}`} alt="" />
          <div className="grid_viev_product">
            {imageValue.length > 0
              ? imageValue.map((image, index) => {
                  return (
                    <img
                      src={`/images/${image}`}
                      alt=""
                      onClick={() => setActiveImage(image)}
                    />
                  );
                })
              : ""}
          </div>
        </div>
        <div className="product_content">
          <h1>{product.name}</h1>
          <p>
            <Rating rating={product.rating} numReviews={product.numReviews} /> 7
            reviews | {product.countInStock} Stock
          </p>
          <h5>${product.price}</h5>
          <h4>Product Features</h4>
          <ul>
            <li style={{ listStyleType: "square" }}>100 M Water Resistance</li>
            <li>
              Solar Powered - Solar panel features rechargable battery with
              approximately 6
            </li>
            <li>Day/Date Indicator at the 3 o'clock position</li>
            <li>Stainless Steel Case / Canvas band</li>
            <li>Mineral Glass</li>
          </ul>
          <div className="button">
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={addToCartHandler} variant="primary">
                    Add To Cart
                  </Button>
                </div>
              </ListGroup.Item>
            )}
          </div>
        </div>
      </div>
      <div className="product_suggest">
        <h2>Product Related To This Item</h2>
        <div className="product-grid2">
          {randomProducts.map((product) => {
            return <Product product={product}></Product>;
          })}
        </div>
      </div>
    </div>
    // loading ? (
    //   <LoadingBox />
    //   ) : error ? (
    //     <MessageBox>{error}</MessageBox>
    // ) : (
    //   <div className='product__container'>
    //     <Container>
    //     <Row>
    //       <Col md={6}>
    //         <img
    //           className='img-large'
    //           //src={`/images/${product.image}`}
    //           src={product.image}
    //           alt={product.name}
    //         />
    //       </Col>
    //       <Col md={3}>
    //         <ListGroup>
    //           <ListGroup.Item>
    //             <h1>{product.name}</h1>
    //           </ListGroup.Item>
    //           <ListGroupItem>
    //             <Rating
    //               rating = {product.rating}
    //               numReviews = {product.numReviews}
    //             />
    //           </ListGroupItem>
    //           <ListGroupItem>
    //             Price: ${product.price}
    //           </ListGroupItem>
    //           <ListGroupItem>
    //             Description : {product.description}
    //           </ListGroupItem>
    //         </ListGroup>
    //       </Col>
    //       <Col md={3}>
    //         <Card>
    //           <Card.Body>
    //             <ListGroup varient='flush' >
    //               <ListGroupItem>
    //                 <Row>
    //                   <Col>Price:</Col>
    //                   <Col>${product.price}</Col>
    //                 </Row>
    //               </ListGroupItem>
    //               <ListGroupItem>
    //                 <Row>
    //                   <Col>
    //                     { product.countInStock > 0 ? (
    //                       <Badge bd='success' >In Stock</Badge>
    //                     ) : (
    //                       <Badge bd="danger"> Out Of Stock</Badge>
    //                     )}
    //                   </Col>
    //                 </Row>
    //               </ListGroupItem>
    // {
    //   product.countInStock > 0 && (
    //     <ListGroup.Item>
    //       <div className='d-grid'>
    //         <Button onClick={addToCartHandler} variant='primary' >
    //           Add To Cart
    //         </Button>
    //       </div>
    //     </ListGroup.Item>
    //   )
    // }
    //             </ListGroup>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>
    //     </Container>
    //   </div>
    // )
  );
}

export default ProductScreen;
