import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import BookPage from "./pages/BookPage";
import { ThemeProvider } from "./components/ThemeContext";
import UserContext from "./components/UserContext";
import { fetchUser } from "./redux/slices/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function App() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const u = await dispatch(fetchUser(userId));
        setUser(u.payload);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="register" element={<RegistrationPage />} />
            <Route index element={<LoginPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="book/:id" element={<BookPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
