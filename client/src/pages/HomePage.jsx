import React from 'react';
import { logout } from '../redux/authActions/Login'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
    <div>
      HOMEPAGE
    </div>
    <button onClick={handleLogout}>Logout</button>
    </>
  );
}

