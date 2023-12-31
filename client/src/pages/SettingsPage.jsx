import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ThemeSwitcher from "../ThemeSwitcher";

const SettingsPage = () => {

    return (
        <Layout>
            <ThemeSwitcher/>
        </Layout>
    )
}

export default SettingsPage;
