import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; // if using React Router
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/LoginSlice'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';
import { themes } from "../themes";
import tinycolor from 'tinycolor2';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId')
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];


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
    <div style={{  backgroundColor: currentThemeColors.secondary  }} className={`fixed left-0 h-full z-2 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {links.map((link, index) => (
            <Link 
              id='hov' 
              key={index} 
              className="block px-4 py-2" 
              to={link.link}
              style={{
                color: currentThemeColors.text,
                '--hover-background': tinycolor(currentThemeColors.secondary).darken(10).toString()
              }}
              >
                <span className="icon">{link.icon}</span>
                <span className="ml-2 name">{link.name}</span>
            </Link>
        ))}
    </div>
  );
};

export default Sidebar;
