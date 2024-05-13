import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from './components/CustomNavbar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client
      .get('/api/user')
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  return (
    <>
      <CustomNavbar
        client={client}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Routes>
        <Route path='/' element={<Home client={client} currentUser={currentUser} />} />
        <Route
          path='/register'
          element={
            <RegistrationForm
              client={client}
              setCurrentUser={setCurrentUser}
              email={email}
              setEmail={setEmail}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path='/login'
          element={
            <LoginForm
              client={client}
              setCurrentUser={setCurrentUser}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
