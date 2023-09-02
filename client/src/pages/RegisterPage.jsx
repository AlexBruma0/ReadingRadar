// Login.js
// Registration.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/authActions/Register';
import Form from '../components/Form';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const data = {email: '', password: '', userName: ''}

  const handleRegister = (userData) => {
    dispatch(registerUser(userData)); // Dispatch the login action with user data
  };


  return (
    <Form data={data} handleUpdate={handleRegister}/>
  );
};

export default RegisterPage