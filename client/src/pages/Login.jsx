import React from 'react';
import CustomForm from '../components/CustomForm';

function Login() {
  return <CustomForm route='/api/token/' method='login' />;
}

export default Login;
