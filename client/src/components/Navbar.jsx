import React from "react";
import { Outlet, Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <>
      <header className="flexbox secondary-backround-color">
        <h1 className="center-text">Hannah's Books</h1>
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
