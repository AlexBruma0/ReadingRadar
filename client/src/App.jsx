import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import BookPage from "./pages/BookPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='register' element ={ <RegistrationPage/>}/> 
        <Route index element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="settings" element={<SettingsPage/>} />
        <Route path="users" element={<UsersPage/>} />
        <Route path="book/:id" element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  );
}
