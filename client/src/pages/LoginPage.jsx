// Login.js
// Registration.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authActions/Login';
import Form from '../components/Form';

const LoginPage = () => {
  const dispatch = useDispatch();
  const data = {userName: '', password: ''}

  const handleLogin = (userData) => {
    dispatch(loginUser(userData)); // Dispatch the login action with user data
  };


  return (
    <Form data={data} handleUpdate={handleLogin}/>
  );
};

export default LoginPage

