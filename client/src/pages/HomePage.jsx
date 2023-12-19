import React from 'react';
import { useEffect } from 'react';
import { logout } from '../redux/slices/Login'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchBooks } from '../redux/slices/Books';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((state) => state.books.items);
  const userId = localStorage.getItem('userId');
  console.log(userId)
  dispatch(fetchBooks(userId))
  console.log(books)

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

