import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    
    if (isAdminLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
