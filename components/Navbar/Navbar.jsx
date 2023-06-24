import React from "react";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
export default function Navbar(props) {
  return (
    <>
      <div className="navbar">
        <h2 className="title">Hannah's Books</h2>
      </div>
      <div className="searchbar">
        <SearchBar></SearchBar>
      </div>
    </>
  );
}
