import React, { useContext, useState, useEffect } from 'react';
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
import ThemeSwitcher from "../ThemeSwitcher";
import { ThemeContext } from "../components/ThemeContext";

const SettingsPage = () => {
    const { theme } = useContext(ThemeContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [navbarHeight, setNavbarHeight] = useState(0);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />
            <div style={{ paddingTop: `${navbarHeight}px` }}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                    <div>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsPage;
