import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // if using React Router
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/LoginSlice'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const breakpoint = 768;
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > breakpoint);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlClickHome = () =>{
    console.log("giong home")
    localStorage.setItem('viewingId', userId);
  }

  return (
    <div style={{ width: isOpen ? '250px' : '0', ...sidebarStyle }}>
      <button onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <ul>
        <li onClick={handlClickHome}><Link to="/home" style={linkStyle} >MyBooks</Link></li>
        <li><Link to="/users" style={linkStyle}>Users</Link></li>
        <li><Link to="/settings" style={linkStyle}>Settings</Link></li>
        <li style={linkStyle} onClick={handleLogout}><button>Logout</button>  </li>
      </ul>
    </div>
  );
};

const sidebarStyle = {
  /* Add your styling here */
};

const linkStyle = {
  /* Add your styling here */
  ':hover': {
    color: 'lightblue' // Change color on hover
  }
};

export default Sidebar;
