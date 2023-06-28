import React from "react";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
export default function Navbar(props) {
  return (
    <>
      <header className="navbar">
        <h2 className="title">Hannah's Books</h2>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Sign Up</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
}
