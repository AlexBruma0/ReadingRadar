import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/RegisterSlice";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = { userName: "", password: "", email: "" };
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.registration.isAuthenticated,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleRegistration = (userData) => {
    setLoading(true);
    dispatch(registerUser(userData));
  };

  return (
    <>
      {isAuthenticated ? (
        <div> already logged in</div>
      ) : loading ? (
        <div> loading... </div>
      ) : (
        <>
          <Form data={data} handleUpdate={handleRegistration} />
          <button onClick={() => navigate("/")}>Click here to login </button>
        </>
      )}
    </>
  );
};

export default RegistrationPage;
