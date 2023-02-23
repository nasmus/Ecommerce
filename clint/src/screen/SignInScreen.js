import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function SignInScreen() {
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';
  return (
    <div>
        <Container className='small__container' >
            <h1>Sign In</h1>
            <Form>
                <Form.Group className="md-3" controlId="email"  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="md-3" controlId="password"  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <div md={3}>
                    <Button type='submit'>
                        SignIn
                    </Button>
                </div>
                <div md={3}>
                    New Customer {" "}
                    <Link to={`/signup/redirect=${redirect}`} ></Link>
                </div>
            </Form>
        </Container>
    </div>
  )
}

export default SignInScreen