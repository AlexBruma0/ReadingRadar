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
    localStorage.setItem('viewingId', userId);
  }

  const links = [
    { name: 'My Library', icon: '📚', link: '/home'},
    { name: 'Friends', icon: '👥', link: '/users'},
    { name: 'Settings', icon: '⛭', link: '/settings' },
    { name: 'Logout', icon: '🫡', link: '/logout'}
  ];

  return (
    <div className="flex-1 display-none margin-right" style={{ display: isOpen ? 'block': 'none'}}>
      <div className="links white-text">
        {links.map((link, index) => (
            <Link key={index} className="link" to={link.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="icon">{link.icon}</span>
                <span className="name">{link.name}</span>
            </Link>

        ))}
      </div>
    </div>
  );
};


export default Sidebar;
