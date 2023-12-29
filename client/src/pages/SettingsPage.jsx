import Sidebar from "../components/SideBar"
import Navbar from "../components/Navbar"
import ThemeSwitcher from "../ThemeSwitcher"
import { ThemeContext } from "../components/ThemeContext"
import { useContext } from "react"
const SettingsPage = () =>{
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <Navbar/>
            <div>
                <Sidebar/>
                <div className={`bg-${theme}-primary `}>
                    Choose a theme!
                </div>
                <div>
                    <ThemeSwitcher/>
                </div>
            </div>
        </>
 
    )
}

export default SettingsPage