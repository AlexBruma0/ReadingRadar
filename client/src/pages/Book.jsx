import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Book() {
  const location = useLocation()
    const book = location.state?.card

  return (
  <>
  <Navbar></Navbar>
  <div className="large-container">
    <h1 className="underline center-text"> {book.title}</h1>
    <p>
      {book.notes}
    </p>
  </div>
  </>
  );
}
export default Book;
