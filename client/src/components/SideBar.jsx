import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // if using React Router
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/LoginSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import tinycolor from "tinycolor2";
import { FaBook, FaUserFriends, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, isFullWidth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlClickHome = () => {
    localStorage.setItem("viewingId", userId);
  };


  const links = [
    { name: "My Library", icon: <FaBook  />, link: "/home" },
    { name: "Friends", icon: <FaUserFriends  />, link: "/users" },
    { name: "Settings", icon: <FaCog  />, link: "/settings" },
    { name: "Logout", icon: <FaSignOutAlt  />, link: "/" },
  ];

    return (
      <div
        style={{ backgroundColor: currentThemeColors.primary }}
        className={`fixed left-0 h-full z-2 ${isFullWidth ? "w-full" : "w-64"} transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {links.map((link, index) => (
          <Link
            id="hov"
            key={index}
            className="px-4 py-2 flex items-center" // Added items-center here
            to={link.link}
            onClick={link.name === "Logout" ? handleLogout : link.name === "My Library" ? handlClickHome: null}
            style={{
              color: currentThemeColors.text,
              "--hover-background": tinycolor(currentThemeColors.primary)
                .darken(10)
                .toString(),
            }}
          >
            <span className="">{link.icon}</span>
            <span className="ml-2 text-lg font-medium">{link.name}</span>
          </Link>
        ))}
      </div>
    );
  };

export default Sidebar;
