import Sidebar from "../components/SideBar";
import { fetchUsers } from "../redux/slices/UsersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Users from "../components/Users";

const UsersPage = () => {
  return (
    <Layout>
      <div className="font-bold my-4 text-3xl ml-2 bg-white">People you may know</div>
      <Users />
    </Layout>
  );
};

export default UsersPage;
