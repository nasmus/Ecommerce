import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';

function CheckOut(props) {
  return (
    <Container>
        <div>
            <Row className='chekcout-steps' >
                <Col className={props.step1 ? 'active' : ''} >Sign In</Col>
                <Col className={props.step2 ? 'active' : ''} >Shipping</Col>
                <Col className={props.step3 ? 'active' : ''} >payment</Col>
                <Col className={props.step4 ? 'active' : ''} >Place Order</Col>
            </Row>
        </div>
    </Container>
  )
}

export default CheckOut