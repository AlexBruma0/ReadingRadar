import React, { useState } from "react";
import { Link, useNavigate, Link as RouterLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Search } from "react-feather";
export default function Navbar(props) {
  const [searching, setSearching] = useState(false);
  const toggleSearching = () => {
    setSearching(!searching);
  };
  return (
    <>
      <header className="secondary-backround-color">
        <h1 className="space-between">
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Hannah's books
          </Link>
          <button onClick={toggleSearching}>
            <Search />
          </button>
        </h1>
        <SearchBar open={searching} setOpen={setSearching} />
      </header>
    </>
  );
}
