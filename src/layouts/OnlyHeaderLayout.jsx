import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const OnlyHeaderLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default OnlyHeaderLayout;