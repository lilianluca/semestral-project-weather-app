import React from 'react';
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import LoadingIndicator from './LoadingIndicator';
import { Button, Form } from 'react-bootstrap';

function CustomForm({ route, method }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === 'login' ? 'Login' : 'Register';

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/history');
      } else {
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      data-testid='custom-form'
      onSubmit={handleSubmit}
      className='d-flex flex-column align-items-center justify-content-center'
    >
      <h1>{name}</h1>
      <Form.Group className='mb-3' controlId='formBasicUsername'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          data-testid='custom-form-username'
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          data-testid='custom-form-password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      {loading && <LoadingIndicator />}
      <Button
        className='mt-2'
        variant='primary'
        type='submit'
        data-testid='custom-form-submit-btn'
      >
        Submit
      </Button>
    </Form>
  );
}

export default CustomForm;
