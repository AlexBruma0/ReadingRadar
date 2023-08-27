import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Book() {
  const location = useLocation()
  const title = location.state?.card.title
  return (
  <>
  <Navbar></Navbar>
  <div className="large-container">
    <h1 className="underline center-text"> {title}</h1>
  </div>
  </>
  );
}
export default Book;
