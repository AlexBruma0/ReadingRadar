import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/RegisterSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "../../resources/logo.png";
import { themes } from "../themes";
import { SpinnerCircular } from "spinners-react";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [themeColor, setThemeColor] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const isAuthenticated = useSelector(
    (state) => state.registration.isAuthenticated,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);
    const theme = themeColor;
    dispatch(registerUser({ userData: { userName, password, email, theme}, profilePicture: profilePicture }));
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
    setProfilePicturePreview(URL.createObjectURL(e.target.files[0]));
  };

  const themeNames = Object.keys(themes);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

<div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-24 w-auto rounded-full" src={Image} alt="Your Company"/>
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register for an account</h2>
          </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegistration}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>

          <div>
            <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
            <div className="mt-2">
              <input id="userName" name="userName" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={userName} onChange={e => setUserName(e.target.value)} />
            </div>
          </div>
          <div>
        <label htmlFor="profilePicture" className="block text-sm font-medium leading-6 text-gray-900">Profile Picture</label>
        <div className="mt-2">
          <input id="profilePicture" name="profilePicture" type="file" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleProfilePictureChange} />
        </div>
        {profilePicturePreview && (
          <div className="mt-2">
            <img src={profilePicturePreview} alt="Profile Preview" className="h-24 w-24 rounded-full" />
          </div>
        )}
      </div>
          <div>
        <label htmlFor="themeColor" className="block text-sm font-medium leading-6 text-gray-900">Theme Color</label>
        <div className="mt-2">
          <select id="themeColor" name="themeColor" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={themeColor} onChange={e => setThemeColor(e.target.value)}>
            {themeNames.map(themeName => (
              <option key={themeName} value={themeName}>{themeName}</option>
            ))}
          </select>
        </div>
      </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? <SpinnerCircular /> : 'Register'}</button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500 cursor-pointer">
              Already an member?
              <a onClick={() => navigate("/")} class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login here</a>
            </p>
      </div>
    </div>
  );
};

export default RegistrationPage;