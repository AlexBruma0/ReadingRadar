import React from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";
export default function Navbar(props) {
  return (
    <>
      <header className="navbar">
        <h2 className="title">Hannah's Books</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/login">Sign Up</Link></li>
          </ul>
        </nav>
      </header>
    </>
  );
}
