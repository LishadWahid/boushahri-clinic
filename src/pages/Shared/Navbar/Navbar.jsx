import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error);
            })
    }

    const links = <>
        <li><NavLink to=''>HOME</NavLink></li>
        <li><NavLink to=''>ABOUT US</NavLink></li>
        <li><NavLink to=''>OUR DOCTORS</NavLink></li>
        <li><NavLink to=''>SERVICES</NavLink></li>
        <li><NavLink to=''>GALLERY</NavLink></li>
        <li><NavLink to=''>CONTACT US</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl w-1/4 lg:w-2/12 m-5"><Logo /></a>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <a onClick={handleLogOut} className="btn">LogOut</a> : <Link className='btn' to='/login'>Login</Link>
                }
                <Link className='btn mx-4' to='/consultation'>Appoinment</Link>
                {
                    user && <Link to='/dashboard' className="btn btn-outline border-blue-400 text-blue-600 hover:bg-blue-600 hover:text-white mr-2">Dashboard</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;