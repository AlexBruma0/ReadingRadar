import React, { useState, useContext } from "react";
import { Link, useNavigate, Link as RouterLink } from "react-router-dom";
import Image from "../../resources/logo.png";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { IoIosSearch } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import tinycolor from "tinycolor2";
import UserContext from "./UserContext";

export default function Navbar({ toggleSidebar }) {
  const [searching, setSearching] = useState(false);

  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const { user } = useContext(UserContext); // Access user from UserContext
  const viewingId = localStorage.getItem("viewingId");
  const userId = localStorage.getItem("userId");

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
      className={`fixed top-0 w-full z-40 flex items-center justify-center p-0 `}
    >
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
      <div >
        <button type="submit" className={`p-2 rounded-full `}>
          <IoIosSearch size={25} />
        </button>
      </div>
      <div className="p-2 flex items-center">
        {user ? (
          <>
            <div className="font-bold">{user.userName}</div>

            <img
              src={user.profilePicture}
              className="h-10 w-10 rounded-full ml-2"
              alt="User"
            />
          </>
        ) : (
          "Not logged in"
        )}
      </div>
    </nav>
  );
}
