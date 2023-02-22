import React, { useEffect,useReducer } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Rating from '../components/Rating';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'
import { getError } from '../utils';
import { Store } from '../Store';



const reducer = (state,action) => {
  switch(action.type){
    case 'FATCH_REQUEST':
      return{...state, loading:true};
    case 'FATCH_SUCCESS':
      return{...state, product: action.payload, loading:false };
    case 'FATCH_FAILLED':
      return{...state, loading:false, error:action.payload};
    default:
      return state;
  }
}

function ProductScreen() {
  const [{loading, error, product}, dispatch] = useReducer( (reducer),{
    product:[],
    error:'',
    loading:true
  })
    const params = useParams();
    const { slug } =params;
    
    
    useEffect(()=>{
      const fatchData = async() => {
        dispatch({ type:'FATCH_REQUEST' })
        try {
          const result = await axios.get(`/api/products/slug/${slug}`);
          dispatch({type:'FATCH_SUCCESS', payload:result.data})
        } catch (err) {
          dispatch({ type: 'FATCH_FAILLED', payload: getError(err) })
        }
        
      };
      fatchData();
    },[slug])

    // bring data from react context api
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const addToCartHandler = () =>{
      ctxDispatch({
        type:'CART_ADD_ITEM',
        payload:{product, quantity:1}
      });
    }

  return (
    loading ? (
      <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
    ) : (
      <div className='product__container'>
        <Container>
        <Row>
          <Col md={6}>
            <img
              className='img-large'
              src={product.image}
              alt={product.name}
            />
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroupItem>
                <Rating 
                  rating = {product.rating}
                  numReviews = {product.numReviews}
                />
              </ListGroupItem>
              <ListGroupItem>
                Price: ${product.price}
              </ListGroupItem>
              <ListGroupItem>
                Description : {product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup varient='flush' >
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        { product.countInStock > 0 ? (
                          <Badge bd='success' >In Stock</Badge>
                        ) : (
                          <Badge bd="danger"> Out Of Stock</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {
                    product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className='d-grid'>
                          <Button onClick={addToCartHandler} variant='primary' >
                            Add To Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )
                  }
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

export default ProductScreen