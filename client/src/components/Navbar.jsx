import React, { useState, useContext } from "react";
import { Link, useNavigate, Link as RouterLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Search } from "react-feather";
import Image from "../../resources/logo.png";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { FaSearch } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { MdSearch } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosMenu } from 'react-icons/io';
import { MdMenu } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';


// Use in your component

import tinycolor from "tinycolor2";

export default function Navbar({ toggleSidebar }) {
  const [searching, setSearching] = useState(false);

  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const toggleSearching = () => {
    setSearching(!searching);
  };

  return (
    <nav
    style={{
      backgroundColor: currentThemeColors.primary,
      borderBottom: "0.1px solid black",
    }}
    id="navbar"
    className={`fixed top-0 w-full z-10 flex items-center p-4 `}  >
      <div className="flex items-center">
        <span
          id="hov"
          className="text-xl mr-3 cursor-pointer p-4 rounded-full"
          onClick={toggleSidebar}
          style={{ 
            "--hover-background": tinycolor(currentThemeColors.primary)
            .darken(5)
            .toString(),
          }}
        >
          <FiMenu onClick={toggleSidebar} />
        </span>
        <div className="cursor-pointer">
          <Link to="/home">
          <img src={Image} className="h-10 w-10 rounded-full" alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div>
        <button type="submit" className={`p-2 rounded-full `}>
          <IoIosSearch size={25} />
        </button>
      </div>
    </nav>
  );
}
