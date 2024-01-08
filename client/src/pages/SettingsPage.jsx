import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import ThemeSwitcher from "../ThemeSwitcher";
import UpdateProfilePicture from "../components/UpdateProfilePicture";

const SettingsPage = () => {
  const userId = localStorage.getItem("userId");
  return (
    <Layout>
      <div className="font-bold my-4 text-3xl">Change Theme</div>
      <ThemeSwitcher />
      <UpdateProfilePicture userId={userId} />
    </Layout>
  );
};

export default SettingsPage;
