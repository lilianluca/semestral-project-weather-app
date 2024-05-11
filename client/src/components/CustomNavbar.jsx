import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const submitLogout = (e, client, setCurrentUser) => {
  e.preventDefault();
  client.post('/api/logout', { withCredentials: true }).then(function (res) {
    setCurrentUser(false);
  });
};

const CustomNavbar = ({ client, currentUser, setCurrentUser }) => {
  return (
    <Navbar expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Weather App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='gap-1 d-flex align-items-center justify-content-center'>
            {currentUser ? (
              <Navbar.Text>
                <form onSubmit={(e) => submitLogout(e, client, setCurrentUser)}>
                  <Button type='submit' variant='light'>
                    Log out
                  </Button>
                </form>
              </Navbar.Text>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to='/register'
                  className='link-light'
                  variant='light'
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/login'
                  className='link-light'
                  variant='light'
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
