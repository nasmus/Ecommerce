import React, { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import "../css/ShippingAddress.css";
import { useNavigate } from "react-router-dom";
import CheckOut from "../components/CheckOut";
import { Store } from "../Store";

function ShipingAddressScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        phoneNumber,
        address,
        city,
        distric,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        phoneNumber,
        address,
        city,
        distric,
      })
    );
    navigate("/payment");
  };
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [distric, setDistric] = useState(shippingAddress.distric || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress.phoneNumber || ""
  );
  return (
    <div>
      {/* <div className="address">
        <div className="user_address">
          <form onSubmit={submitHandler}>
            <div>
              <label>Full Name</label>
              <input
                value={fullName}
                placeholder="User Name"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label>Phone Number</label>
              <input
                value={phoneNumber}
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label>City</label>
              <input
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <label>Distric</label>
              <input
                value={distric}
                placeholder="Distric"
                onChange={(e) => setDistric(e.target.value)}
                required
              />
            </div>

            <label>Address</label>
            <input
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <Button onSubmit={submitHandler}>continue</Button>
          </form>
        </div>
        <div className="user_payment">
          <div className="Summery">
            <h2>Summery</h2>
            <div className="subtotal">
              <p>Sub-Total</p>
              <p>80</p>
            </div>
            <div className="delevary">
              <p>Delevary Charge</p>
              <p>80</p>
            </div>
            <hr />
            <div className="total_amount">
              <h3>Total Amount</h3>
              <h3>80</h3>
            </div>
          </div>
          <div className="payment_method">
            <h2>PAYMENT METHOD</h2>
            <p>
              pleace select the preferred payment method to use on this order
            </p>
            <div className="payment_option">
              <input type="radio" id="html" name="fav_language" value="HTML" /> 
              <label for="html">Cash On Delevery</label>
            </div>
          </div>
        </div>
      </div> */}

      <Container className='small-container'>
      <div className="address">
        <div className="user_address">
        <h1>Shipping Address</h1>
            <Form onSubmit={submitHandler} >
            <Form.Group className='mb-3' controlId='fullName' >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phoneNumber' >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='Address' >
                <Form.Label>Address</Form.Label>
                <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='City' >
                <Form.Label>City</Form.Label>
                <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='Distric' >
                <Form.Label>Distric</Form.Label>
                <Form.Control
                    value={distric}
                    onChange={(e) => setDistric(e.target.value)}
                    required
                />
            </Form.Group>
            <div className='mb-3'>
                <Button onClick={submitHandler} >
                    Continue
                </Button>
            </div>
            </Form>
            </div>
        </div>
        </Container>
    </div>
  );
}

export default ShipingAddressScreen;
