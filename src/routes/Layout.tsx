import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Common/Navigation';
import GithubBtn from '../components/Common/GithubBtn';

const Layout: React.FC = () => {
    return (
        <>
            <Navigation />
            <GithubBtn />
            <Outlet />
        </>
    );
};

export default Layout;
