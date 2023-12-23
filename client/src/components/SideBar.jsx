import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // if using React Router

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const breakpoint = 768;

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

  return (
    <div style={{ width: isOpen ? '250px' : '0', ...sidebarStyle }}>
      <button onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <ul>
        <li><Link to="/home" style={linkStyle}>Home</Link></li>
        <li><Link to="/users" style={linkStyle}>Users</Link></li>
        <li><Link to="/settings" style={linkStyle}>Settings</Link></li>
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
