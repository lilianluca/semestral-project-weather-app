import React from 'react';
import CustomForm from '../components/CustomForm';

const Register = () => {
  return <CustomForm route='/api/user/register/' method='register' />;
};

export default Register;
