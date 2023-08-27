import { useLocation } from "react-router-dom";

function Book() {
  const location = useLocation()
  const card = location.state?.Card
  return (
  <></>
  );
}
export default Book;
