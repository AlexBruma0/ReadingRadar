// Login.js
// Registration.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authActions/Login';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const data = {userName: '', password: ''}
  const isAuthenticated = useSelector((state) => state.auth.login.isAuthenticated);
  const user = useSelector((state) => state.auth.login.user);


  console.log(isAuthenticated,user)

  const handleLogin = async (userData) => {
    try {
        const res = await dispatch(loginUser(userData)); // Dispatch the login action with user data
        if (res) navigate('/home')
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
    {isAuthenticated? <div> alraedy logged in</div>: 
    <Form data={data} handleUpdate={handleLogin}/>
    
    }
    </>
  );
};

export default LoginPage

