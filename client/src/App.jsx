import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path='register' element ={ <RegisterPage/>}/>
        {/* <Route index element={<Home />} />
        <Route path="book/:id" element={<Book />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
