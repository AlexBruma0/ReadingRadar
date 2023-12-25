import Sidebar from "../components/SideBar"
import Navbar from "../components/Navbar"

const SettingsPage = () =>{
    return (
        <>
        <Navbar/>
        <div className="flexbox">
        <Sidebar/>

        <div className="flex-3">
            Settings PAGE
        </div>

        </div>

        </>
 
    )
}

export default SettingsPage