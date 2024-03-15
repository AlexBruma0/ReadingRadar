import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, Link as RouterLink } from "react-router-dom";
import Image from "../../resources/logo.png";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { FiMenu } from "react-icons/fi";
import tinycolor from "tinycolor2";
import { fetchUser } from "../redux/slices/UsersSlice";
import { useDispatch } from "react-redux";

export default function Navbar({ toggleSidebar }) {

  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      if (userId) {
        const fetchedOwner = await dispatch(fetchUser(userId));
        setOwner(fetchedOwner.payload);
      }
    };

    fetchOwner();
  }, [userId, dispatch]);


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
          id="sidebarToggle"
          className="text-2xl mr-3 cursor-pointer p-4 rounded-full sidebarToggle" 
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
            <img src={Image} className="h-16 w-16 rounded-full" alt="Logo" /> 
          </Link>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="p-2 flex items-center">
        {owner ? (
          <>
            <div className="font-bold text-3xl">{owner.userName}</div> 

            <img
              src={owner.profilePicture}
              className="h-16 w-16 rounded-full ml-2" 
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
