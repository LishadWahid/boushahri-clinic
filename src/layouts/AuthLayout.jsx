import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../assets/Logo.webp'


const AuthLayout = () => {
    return (
        <div className='flex max-w-7xl mx-auto pt-10'>
            <div className='flex-1'>
                <Outlet/>
            </div>
            <div className='flex-1 flex justify-center'>
                <img src={Logo} alt="" />
            </div>
        </div>
    );
};

export default AuthLayout;