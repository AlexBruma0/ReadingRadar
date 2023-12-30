import React, { useState, useContext } from "react";
import { Link, useNavigate, Link as RouterLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Search } from "react-feather";
import Image from '../../resources/logo.png'
import { ThemeContext } from '../components/ThemeContext';
import { themes } from "../themes";

export default function Navbar({ toggleSidebar }) {
  const [searching, setSearching] = useState(false);

  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const toggleSearching = () => {
    setSearching(!searching);
  };

  return (
    <nav style={{ backgroundColor: currentThemeColors.primary  }} id="navbar" className={`fixed top-0 w-full z-10 flex items-center p-4 text-white`}>
      <div className="flex items-center">
        <span className="text-xl mr-3 cursor-pointer" onClick={toggleSidebar}>☰</span>
        <img src={Image} className="h-10 w-10 rounded-full" alt="Logo" />
      </div>
      <div className="flex-grow"></div>
      <div>
        <button type="submit" className={`p-2 rounded-full bg-${theme}-accent`}>
          🔍
        </button>
      </div>
    </nav>
  );
}