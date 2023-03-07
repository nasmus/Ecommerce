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



function SignUpScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state;
    

    const submitHendler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('password do not match');
            return;
        }
        try{
            const { data } = await Axios.post('/api/users/signup', {
                name,
                email,
                phone,
                password,
            });
            ctxDispatch({type:'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

        } catch (err){
            toast.error(getError(err));
            
        }
    };

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }

    },[navigate,redirect,userInfo]);

  return (
    <div>
        <Container className='small-container' >
            <h1>Sign Up</h1>
            <Form onSubmit={submitHendler} >
                <Form.Group className="md-3" controlId="name"  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="md-3" controlId="email"  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="md-3" controlId="phone"  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='text' onChange={(e) => setPhone(e.target.value)} required />
                </Form.Group>
                <Form.Group className="md-3" controlId="password"  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="md-3" controlId="confirmpassword"  >
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} required />
                </Form.Group>
                <div md={3}>
                    <Button type='submit' >
                        SignUp
                    </Button>
                </div>
                <div md={3}>
                    Already Have an account ? {" "}
                    <Link to={`/signin?redirect=${redirect}`} >Sign In</Link>
                </div>
            </Form>
        </Container>
    </div>
  )
}

export default SignUpScreen