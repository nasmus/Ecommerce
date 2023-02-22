import React, { useContext } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store'

function CartScreen() {
    const { state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart:{cartItems},
    } = state

  return (
    <div>
        <h1>Shoping Cart</h1>
        <Row>
            <Col md={8}>
                {
                    cartItems.length === 0 ? (
                        <MessageBox>
                            cart is empty. <Link to='/'>Go Shoping</Link>
                        </MessageBox>
                    ) :
                    (
                        <ListGroup>
                            {
                                cartItems.map((item) => (
                                    <ListGroupItem className='listGroup__css' key={item._id}>
                                        <Row className='align-item-center' ></Row>
                                            <Col md={4}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded img-thumbnail"
                                                >
                                                </img> {' '}
                                                <Link to={`/product/${item.slug}`} >{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <Button variant='light' disabled={item.quantity === 1} >
                                                    <i className='fas fa-minus-circle' ></i>
                                                </Button>{' '}
                                                <span>{item.quantity}</span>{' '}
                                                <Button variant='light' disabled={item.quantity === item.countInStock} >
                                                    <i className='fas fa-plus-circle'> </i>
                                                </Button>{' '}
                                            </Col>
                                            <Col>${item.price}</Col>
                                            <Col md={2}>
                                                <Button variant='light' >
                                                    <i className='fas fa-trash' ></i>
                                                </Button>
                                            </Col>

                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <ListGroup variant='flush' >
                            <ListGroupItem>
                                <h3>
                                    Subtotal ({cartItems.reduce((a,c) => a + c.quantity,0)}{' '}items) : $
                                    {cartItems.reduce((a,c) => a + c.price * c.quantity,0)}
                                </h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className='d-grid'>
                                    <Button 
                                        type='button'
                                        variant='primary'
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
    </div>
  )
}

export default CartScreen