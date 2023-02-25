import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import  Axios  from 'axios'
import { Store } from '../Store';
import { toast } from 'react-toastify';
import {getError} from '../utils';

function SignInScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { state, dispatch:ctxDispatch } = useContext(Store)
    const {userInfo} = state;

    const submitHendler = async(e) => {
        e.preventDefault();
        try{
            const { data } = await Axios.post('/api/users/signin', {
                email,
                password
            });
            console.log(data);
            ctxDispatch({type:'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

        } catch (err){
            toast.error(getError(err));
            
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }

    },[navigate,redirect,userInfo]);

  return (
    <div>
        <Container className='small__container' >
            <h1>Sign In</h1>
            <Form onSubmit={submitHendler} >
                <Form.Group className="md-3" controlId="email"  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="md-3" controlId="password"  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
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