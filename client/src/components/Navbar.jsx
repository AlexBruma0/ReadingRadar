import React from "react";
import SearchBar from "./SearchBar";
import {
  Outlet,
  Link,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
export default function Navbar(props) {
  const navigate = useNavigate();
  return (
    <>
      <header className="secondary-backround-color">
        <h1>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Hannah's books
          </Link>
        </h1>
      </header>
    </>
  );
}
