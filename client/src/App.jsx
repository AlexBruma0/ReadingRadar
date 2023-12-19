// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegisterPage";
// import BookPage from "./pages/BookPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         {/* <Route path="login" element={<LoginPage/>} /> */}
        <Route path='register' element ={ <RegistrationPage/>}/> 
        <Route index element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />

        {/* <Route path="book/:id" element={<BookPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
