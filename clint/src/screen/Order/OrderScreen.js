import  axios  from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Store } from '../../Store';
import { getError } from '../../utils';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';


const reducer = (state, action) => {
    switch(action.type){
        case 'FATCH_REQUEST':
            return{...state, loading:true, error:''}
        case 'FATCH_SUCCESS':
            return{...state, loading:false, order: action.payload, error:''}
        case 'FATCH_FAIL':
            return{...state, loading:false, error: action.payload}
        default:
            return state;
    }
}

function OrderScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const {id: orderId} = params
    const {state} = useContext(Store);
    const {userInfo} = state;
    const [{loading, error, order},dispatch] = useReducer(reducer, {
        loading:true,
        error:'',
        order:{}
    })

    useEffect(() => {
        const fatchOrder = async () => {
            try{
                dispatch({ type:'FATCH_REQUEST' });
                const {data} = await axios.get(`/api/orders/${orderId}`,{
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                dispatch({ type:'FATCH_SUCCESS', payload:data });
            } catch(err) {
                dispatch({type: 'FATCH_FAIL', payload: getError(err) })
            }
        }
        if( !userInfo ){
            return navigate('/login');
        }
        if( !order._id || (order._id && order._id !== orderId)){
            fatchOrder();
        }
    },[order,userInfo,orderId,navigate])

  return (
    
        loading ? (
      <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
    ) : (
            <div>
              <Container>
                <h1>Order {orderId}</h1>
                <Row>
                    <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                            <strong>Address: </strong> {order.shippingAddress.address},
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                            ,{order.shippingAddress.country}
                        </Card.Text>
                        {order.isDelivered ? (
                            <MessageBox variant="success">
                            Delivered at {order.deliveredAt}
                            </MessageBox>
                        ) : (
                            <MessageBox variant="danger">Not Delivered</MessageBox>
                        )}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <strong>Method:</strong> {order.paymentMethod}
                        </Card.Text>
                        {order.isPaid ? (
                            <MessageBox variant="success">
                            Paid at {order.paidAt}
                            </MessageBox>
                        ) : (
                            <MessageBox variant="danger">Not Paid</MessageBox>
                        )}
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                        <Card.Title>Items</Card.Title>
                        <ListGroup variant="flush">
                            {order.orderItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                <Col md={6}>
                                    <img style={{height:"60px"}}
                                    src={`/images/${item.image}`}
                                    alt={item.name}
                                    className="img-fluid rounded img-thumbnail "
                                    ></img>{' '}
                                    <Link className='no-underline' to={`/product/${item.slug}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}>
                                    <span>{item.quantity}</span>
                                </Col>
                                <Col md={3}>${item.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice.toFixed(2)}</Col>
                                <Col>${Number(order.itemsPrice).toFixed(2)}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice.toFixed(2)}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>
                                <strong> Order Total</strong>
                                </Col>
                                <Col>
                                <strong>${order.totalPrice.toFixed(2)}</strong>
                                </Col>
                            </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
              </Container>
            </div>
        )
        
  )
}

export default OrderScreen