import Sidebar from "../components/SideBar"
import Navbar from "../components/Navbar"
import ThemeSwitcher from "../ThemeSwitcher"
const SettingsPage = () =>{
    return (
        <>
        <Navbar/>
        <div className="flexbox">
        <Sidebar/>

        <div className="flex-3">
            <ThemeSwitcher/>
        </div>

        </div>

        </>
 
    )
}

export default SettingsPage