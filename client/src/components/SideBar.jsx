import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // if using React Router
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/LoginSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import tinycolor from "tinycolor2";
import { FaBook, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, isFullWidth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlClickHome = () => {
    localStorage.setItem("viewingId", userId);
    if (location.pathname === "/home") {
      window.location.reload();
    } else {
      navigate("/home");
    }
  };

  const links = [
    { name: "My Library", icon: <FaBook />, link: "/home" },
    { name: "Friends", icon: <FaUserFriends />, link: "/users" },
    { name: "Settings", icon: <FaCog />, link: "/settings" },
    { name: "Logout", icon: <FaSignOutAlt />, link: "/" },
  ];

  return (
    <div
      className={`fixed left-0 h-full z-30 pt-3 bg-white ${
        isFullWidth ? "w-full" : "w-64"
      } transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {links.map((link, index) => (
        <Link
          id="hov"
          key={index}
          className="px-4 py-2 flex items-center rounded-r-lg" // Added items-center here
          to={link.link}
          onClick={
            link.name === "Logout"
              ? handleLogout
              : link.name === "My Library"
                ? handlClickHome
                : null
          }
          style={{
            color: currentThemeColors.text,
            backgroundColor:
              location.pathname === link.link
                ? tinycolor(currentThemeColors.accent).darken(10).toString()
                : "transparent", // Add this line
            "--hover-background": currentThemeColors.secondary
          }}
        >
          <span className="">{link.icon}</span>
          <span className="ml-2 text-2xl font-bold">{link.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
