import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import { themes } from "../themes";
import { ThemeContext } from "./ThemeContext";

export default function Layout({ children }) {
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState("100vh");
  const [isSidebarFullscreen, setIsSidebarFullscreen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const height = `calc(100vh - ${navbarHeight}px)`;
    setContainerHeight(height);
  }, [navbarHeight]);

  useEffect(() => {

    const checkWindowSize = () => {
      if (window.innerWidth < 700) {
        setIsSidebarFullscreen(true);
        setIsSidebarOpen(false);
      } else {
        setIsSidebarFullscreen(false);
        setIsSidebarOpen(true);
      }
    };
    
    const handleClick = (event) => {
      if (window.innerWidth < 700) {
        if (event.target.children.length === 3 || event.target.id == "sidebarToggle") {
          return; 
          
        }
        setIsSidebarFullscreen(true);
        setIsSidebarOpen(false);
      } 
    }

    window.addEventListener("resize", checkWindowSize);
    window.addEventListener("load", checkWindowSize);
    window.addEventListener("orientationchange", checkWindowSize);
    window.addEventListener("beforeunload", checkWindowSize);
    window.addEventListener("click", handleClick);


  });

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div style={{ paddingTop: `${navbarHeight}px` }}>
        <Sidebar isOpen={isSidebarOpen} isFullWidth={isSidebarFullscreen} />
        <div
          style={{

            height: containerHeight,
          }}
          className={`bg-white transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
