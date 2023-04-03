import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <div
                style={{
                    display: 'flex'
                }}
            >
                {/* <Sidebar /> */}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;