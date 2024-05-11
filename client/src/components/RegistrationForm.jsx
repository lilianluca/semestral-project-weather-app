import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function submitRegistration(
  e,
  client,
  setCurrentUser,
  email,
  username,
  password,
  navigate
) {
  e.preventDefault();
  client
    .post('/api/register', {
      email: email,
      username: username,
      password: password,
    })
    .then(function (res) {
      client
        .post('/api/login', {
          email: email,
          password: password,
        })
        .then(function (res) {
          setCurrentUser(true);
          navigate('/');
        });
    });
}

const RegistrationForm = ({
  client,
  setCurrentUser,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const navigate = useNavigate();

  return (
    <div className='center'>
      <Form
        onSubmit={(e) =>
          submitRegistration(
            e,
            client,
            setCurrentUser,
            email,
            username,
            password,
            navigate
          )
        }
      >
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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

export default RegistrationForm;
