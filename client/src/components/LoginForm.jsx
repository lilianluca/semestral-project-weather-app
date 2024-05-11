import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function submitLogin(e, client, setCurrentUser, email, password, navigate) {
  e.preventDefault();
  client
    .post('/api/login', {
      email: email,
      password: password,
    })
    .then(function (res) {
      setCurrentUser(true);
      navigate('/');
    });
}

const LoginForm = ({
  client,
  setCurrentUser,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const navigate = useNavigate();

  return (
    <div className='center'>
      <Form
        onSubmit={(e) => {
          submitLogin(e, client, setCurrentUser, email, password, navigate);
        }}
      >
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
