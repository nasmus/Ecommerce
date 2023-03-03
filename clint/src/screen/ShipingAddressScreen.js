import React, { useEffect,useContext, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';
import CheckOut from '../components/CheckOut';
import { Store } from '../Store';

function ShipingAddressScreen() {
    const {state , dispatch: ctxDispatch} = useContext(Store);
    const {userInfo,cart:{ shippingAddress }} = state;
    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo){
            navigate('/signin?redirect=/shipping')
        }
      },[userInfo,navigate]);
    

    const submitHandler =(e) => {
        e.preventDefault();
        ctxDispatch({
            type:'SAVE_SHIPPING_ADDRESS',
            payload:{
                fullName,
                phoneNumber,
                address,
                city,
                distric,
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                phoneNumber,
                address,
                city,
                distric
            })
        );
        navigate('/payment');
    }
    const [fullName,setFullName] = useState( shippingAddress.fullName || '');
    const [address, setAddress] = useState( shippingAddress.address || '');
    const [city, setCity] = useState( shippingAddress.city || '');
    const [distric, setDistric] = useState( shippingAddress.distric || '');
    const [phoneNumber, setPhoneNumber] = useState( shippingAddress.phoneNumber || '');
  return (
    <div>
        <CheckOut step1 step2 ></CheckOut>
        <Container className='small-container'>
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
        </Container>
    </div>
  )
}

export default ShipingAddressScreen