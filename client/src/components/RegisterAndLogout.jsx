import React from 'react';
import Register from '../pages/Register';

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />;
};

export default RegisterAndLogout;
