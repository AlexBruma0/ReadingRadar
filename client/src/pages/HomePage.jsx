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
  // const userId = useSelector(state => state.login.user.userId)
  // console.log(userId)

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // useEffect(() =>{
  //   if(userId){
  //     //dispatch(fetchBooks(userId))
  //     console.log(books)
  //   }
 
  // },[userId])


  return (
    <>
    <div>
      HOMEPAGE
    </div>
    <button onClick={handleLogout}>Logout</button>
    </>
  );
}

