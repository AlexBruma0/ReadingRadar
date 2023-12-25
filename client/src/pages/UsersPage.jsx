import Sidebar from "../components/SideBar"
import { fetchUsers } from "../redux/slices/UsersSlice"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const UsersPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId')

    useEffect(() =>{
        if(userId){
            dispatch(fetchUsers());
            console.log(users)
        }
    },[userId, dispatch])

    const users = useSelector(state => state.users.users)

    const handleVisitUser = (viewId) => {
        localStorage.setItem('viewingId', viewId)
        navigate("/home")
    }

    return (
        <>
        <Navbar/>
        <div className="flexbox">
        <Sidebar/>
        <div className="flex-3">
            {users.map((user) => (
                    <li key={user._id} onClick={() => {handleVisitUser(user._id)}}> <button>{user.userName}</button> </li>
                ))}
        </div>

        </div>

        </>
    )
}

export default UsersPage