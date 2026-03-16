import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useAdmin = () => {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/api/users/role?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.role === 'admin');
                    setIsAdminLoading(false);
                })
                .catch(() => {
                    setIsAdmin(false);
                    setIsAdminLoading(false);
                });
        } else {
            setIsAdmin(false);
            setIsAdminLoading(false);
        }
    }, [user]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
