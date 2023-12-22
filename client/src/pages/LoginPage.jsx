import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/LoginSlice';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const data = {userName: '', password: ''}
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const user = useSelector((state) => state.login.user);

  console.log(isAuthenticated,user)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); 
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (userData) => {
      setLoading(true)
      dispatch(loginUser(userData)); 
  };

  return (
    <>
    {isAuthenticated ? <div> already logged in</div>: 
      loading ? <div> loading... </div> :
      <>
        <Form data={data} handleUpdate={handleLogin}/>
        <button onClick={() => navigate('/register')}>Sign up</button>
      </>
    }
    </>
  );
};

export default LoginPage

