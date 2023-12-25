import React, { useState } from "react";
import { Link, useNavigate, Link as RouterLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Search } from "react-feather";
import Image from '../../resources/logo.png'
export default function Navbar(props) {
  const [searching, setSearching] = useState(false);
  const toggleSearching = () => {
    setSearching(!searching);
  };
  return (
    <>
    <nav className="navbar margin-bottom">
      <div className="menu-icon">
        {/* Icon placeholder, you can use an image or an icon library like FontAwesome */}
        <span>☰</span> 
      </div>
      <div className="logo">
        {/* Your logo here */}
        <img src={Image} alt="Description" 
        style={{
          borderRadius: '50%', 
          width: '50px',
          height: '50px',

       }} />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button type="submit">🔍</button>
      </div>
    </nav>

      {/* <header>
        <h1 className="space-between">
        <img src={Image} alt="Description" 
        style={{
          borderRadius: '50%', 
          width: '50px',
          height: '50px',

       }} />
          <button onClick={toggleSearching}>
            <Search />
          </button>
        </h1>
        <SearchBar open={searching} setOpen={setSearching} />
      </header> */}
    </>
  );
}