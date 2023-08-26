import React from "react";
import SearchBar from "./SearchBar";
import { Outlet, Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <>
      <header className="secondary-backround-color">
        <h1>Hannah's Books</h1>
        {/* <SearchBar></SearchBar> */}
        {/* <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/login">Sign Up</Link></li>
          </ul>
        </nav> */}
      </header>
    </>
  );
}
