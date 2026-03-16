import React from 'react';
import { Outlet, NavLink, Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    
    // While loading, we can show a loader or just default to false
    if (isAdminLoading) {
        return <div className="h-screen w-full flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>
    }
    
    return (
        <div className="drawer lg:drawer-open font-sans bg-gray-50">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-start min-h-screen">
                {/* Mobile Header Menu */}
                <div className="w-full flex justify-between items-center p-4 lg:hidden bg-white shadow-sm border-b">
                    <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                    <Link to="/" className="text-xl font-bold text-blue-600">Boushahri Clinic</Link>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>

                <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div> 

            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-72 min-h-full bg-white text-base-content border-r shadow-sm">
                    {/* User Profile Info */}
                    <div className="mb-6 px-4 flex flex-col items-center mt-6">
                        <div className="avatar mb-4">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/6H1Wk1B/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.webp"} alt="User Profile" />
                            </div>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 text-center">{user?.displayName || "Clinic User"}</h2>
                        <span className="text-sm text-gray-500 text-center break-all">{user?.email || ""}</span>
                    </div>

                    <div className="divider text-sm text-gray-400 font-medium">{isAdmin ? "Admin Menu" : "User Menu"}</div>

                    <li className="mb-1">
                        <NavLink to="/dashboard" end className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                            {isAdmin ? "Admin Overview" : "User Overview"}
                        </NavLink>
                    </li>

                    {isAdmin ? (
                        <>
                            <li className="mb-1">
                                <NavLink to="/dashboard/master-control" className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.036 18.036 0 01-.536 1.036m-1.36-1.57a19.664 19.664 0 011.896 1.638m.34 2.89a19.78 19.78 0 001.08 1.936c.228.374.05.857-.367 1.066l-.73.365c-.52.26-1.127.098-1.407-.375a20.916 20.916 0 01-1.275-3.056m0-4.57c-.689.06-1.387.09-2.091.09h-.75a4.5 4.5 0 100 9h.75c.704 0 1.402-.03 2.09-.09m0-9.18c.253-.962.584-1.892.985-2.783" /></svg>
                                    Master Control
                                </NavLink>
                            </li>
                            <li className="mb-1">
                                <NavLink to="/dashboard/manage-users" className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                                    Manage Users
                                </NavLink>
                            </li>
                            <li className="mb-1">
                                <NavLink to="/dashboard/database-manager" className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
                                    Database Manager
                                </NavLink>
                            </li>
                            <li className="mb-1">
                                <NavLink to="/dashboard/all-income" className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    All Income
                                </NavLink>
                            </li>
                            <li className="mb-1">
                                <NavLink to="/dashboard/add-expenses" className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                                    Add Expenses
                                </NavLink>
                            </li>
                            <li className="mb-1">
                                <NavLink to="/dashboard/all-appointment" className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                                    All Appointment
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="mb-1">
                                <NavLink to="/dashboard/my-appointments" className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                                    My Appointments
                                </NavLink>
                            </li>
                            <li className="mb-1">
                                <NavLink to="/dashboard/my-reports" className={({isActive}) => isActive ? "active bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                                    My Reports
                                </NavLink>
                            </li>
                        </>
                    )}
                    
                    <div className="divider text-sm text-gray-400 mt-auto">Quick Links</div>
                    
                    <li>
                        <Link to="/" className="text-gray-700 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                            Back to Home
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
