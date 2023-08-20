import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";

function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandeler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry Bro !");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandeler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Container>
        <h1>Shoping Cart</h1>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <MessageBox>
                cart is empty. <Link to="/">Go Shoping</Link>
              </MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroupItem key={item._id}>
                    <Row>
                      <Col md={4} className="cartScreen__image">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandeler(item, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandeler(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <i className="fas fa-plus-circle"> </i>
                        </Button>
                      </Col>
                      <Col>${item.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => removeItemHandeler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="warning"
                        onClick={checkOutHandler}
                        disabled={cartItems.length === 0}
                      >
                        Process To Checkout
                      </Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CartScreen;
