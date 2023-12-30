import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; // if using React Router
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/LoginSlice'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId')
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { theme } = useContext(ThemeContext);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlClickHome = () =>{
    localStorage.setItem('viewingId', userId);
  }

  const links = [
    { name: 'My Library', icon: '📚', link: '/home'},
    { name: 'Friends', icon: '👥', link: '/users'},
    { name: 'Settings', icon: '⛭', link: '/settings' },
    { name: 'Logout', icon: '🫡', link: '/logout'}
  ];

  return (
    <div style={{ marginTopTop: `${navbarHeight}px` }} className={`fixed left-0 h-full z-20 bg-gray-800 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="links">
        {links.map((link, index) => (
            <Link key={index} className="block px-4 py-2 hover:bg-gray-700" to={link.link}>
                <span className="icon">{link.icon}</span>
                <span className="ml-2 name">{link.name}</span>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
