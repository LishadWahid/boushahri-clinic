// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ManageUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [editingUser, setEditingUser] = useState(null);

//     const fetchUsers = () => {
//         axios.get('http://localhost:3000/api/users')
//             .then(res => {
//                 setUsers(res.data);
//             })
//             .catch(err => console.error(err));
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleDelete = (id) => {
//         if (window.confirm('Are you sure you want to delete this user?')) {
//             axios.delete(`http://localhost:3000/api/users/${id}`)
//                 .then(res => {
//                     if (res.data.deletedCount > 0) {
//                         alert('User deleted successfully');
//                         fetchUsers();
//                     }
//                 })
//                 .catch(err => console.error(err));
//         }
//     };

//     const handleUpdateRole = (e) => {
//         e.preventDefault();
//         axios.put(`http://localhost:3000/api/users/${editingUser._id}`, editingUser)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     alert('User updated successfully');
//                     setEditingUser(null);
//                     fetchUsers();
//                 }
//             })
//             .catch(err => console.error(err));
//     };

//     return (
//         <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6 w-full">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Manage Users</h2>

//             <div className="overflow-x-auto rounded-xl border border-gray-200">
//                 <table className="table w-full">
//                     <thead>
//                         <tr className="bg-gray-50 text-gray-700">
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Joined</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user._id} className="hover:bg-gray-50">
//                                 <td className="font-medium text-gray-800">{user.name || 'Anonymous'}</td>
//                                 <td className="text-gray-600">{user.email}</td>
//                                 <td>
//                                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
//                                         {user.role || 'user'}
//                                     </span>
//                                 </td>
//                                 <td className="text-gray-500">{user.joined || 'N/A'}</td>
//                                 <td>
//                                     <div className="flex gap-2 flex-wrap">
//                                         {/* Quick role toggle */}
//                                         <button
//                                             onClick={() => {
//                                                 const newRole = user.role === 'admin' ? 'user' : 'admin';
//                                                 axios.put(`http://localhost:3000/api/users/${user._id}`, { ...user, role: newRole })
//                                                     .then(res => {
//                                                         if (res.data.modifiedCount > 0) fetchUsers();
//                                                     });
//                                             }}
//                                             className={`btn btn-xs ${user.role === 'admin' ? 'btn-warning' : 'btn-success text-white'}`}
//                                         >
//                                             {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
//                                         </button>
//                                         <button 
//                                             onClick={() => setEditingUser(user)}
//                                             className="btn btn-xs btn-primary"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button 
//                                             onClick={() => handleDelete(user._id)}
//                                             className="btn btn-xs btn-error text-white"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Edit User Modal */}
//             {editingUser && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl">
//                         <h3 className="text-xl font-bold mb-4">Edit User Role</h3>
//                         <form onSubmit={handleUpdateRole} className="space-y-4">
//                             <div>
//                                 <p className="text-sm text-gray-500 mb-2">User: <span className="font-bold text-gray-800">{editingUser.name}</span></p>
//                                 <label className="label-text block mb-1">Role</label>
//                                 <select 
//                                     className="select select-bordered w-full"
//                                     value={editingUser.role || 'user'}
//                                     onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
//                                 >
//                                     <option value="user">User</option>
//                                     <option value="admin">Admin</option>
//                                     <option value="manager">Manager</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-end gap-3 pt-4">
//                                 <button type="button" onClick={() => setEditingUser(null)} className="btn">Cancel</button>
//                                 <button type="submit" className="btn btn-primary">Update</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ManageUsers;



import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API = "http://localhost:3000/api/users";

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const res = await axios.get(API);
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Delete User
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        try {
            const res = await axios.delete(`${API}/${id}`);

            if (res.data.deletedCount > 0) {
                alert("User deleted successfully");
                fetchUsers();
            }

        } catch (error) {
            console.error(error);
        }
    };

    // Toggle Admin
    const toggleAdmin = async (user) => {

        const newRole = user.role === "admin" ? "user" : "admin";

        try {
            const res = await axios.put(`${API}/${user._id}`, {
                role: newRole
            });

            if (res.data.modifiedCount > 0) {
                fetchUsers();
            }

        } catch (error) {
            console.error(error);
        }
    };

    // Update Role From Modal
    const handleUpdateRole = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.put(`${API}/${editingUser._id}`, {
                role: editingUser.role
            });

            if (res.data.modifiedCount > 0) {
                alert("User role updated");
                setEditingUser(null);
                fetchUsers();
            }

        } catch (error) {
            console.error(error);
        }
    };

    // Role badge color
    const getRoleBadge = (role) => {
        switch (role) {
            case "admin":
                return "bg-purple-100 text-purple-700";
            case "manager":
                return "bg-green-100 text-green-700";
            default:
                return "bg-blue-100 text-blue-700";
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow border mt-6 w-full">

            <h2 className="text-2xl font-bold mb-6 border-b pb-4">
                Manage Users
            </h2>

            <div className="overflow-x-auto">

                <table className="table w-full">

                    <thead className="bg-gray-50">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user._id} className="hover">

                                <td className="font-medium">
                                    {user.name || "Anonymous"}
                                </td>

                                <td>{user.email}</td>

                                <td>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                                        {user.role || "user"}
                                    </span>
                                </td>

                                <td>{user.joined || "N/A"}</td>

                                <td>

                                    <div className="flex gap-2 flex-wrap">

                                        <button
                                            onClick={() => toggleAdmin(user)}
                                            className={`btn btn-xs ${user.role === "admin" ? "btn-warning" : "btn-success text-white"}`}
                                        >
                                            {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                                        </button>

                                        <button
                                            onClick={() => setEditingUser(user)}
                                            className="btn btn-xs btn-primary"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-xs btn-error text-white"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            {/* EDIT MODAL */}

            {editingUser && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white p-6 rounded-2xl w-[400px] shadow-xl">

                        <h3 className="text-xl font-bold mb-4">
                            Edit User Role
                        </h3>

                        <form onSubmit={handleUpdateRole} className="space-y-4">

                            <p className="text-sm text-gray-500">
                                User :
                                <span className="font-bold text-gray-800 ml-1">
                                    {editingUser.name}
                                </span>
                            </p>

                            <select
                                className="select select-bordered w-full"
                                value={editingUser.role || "user"}
                                onChange={(e) =>
                                    setEditingUser({
                                        ...editingUser,
                                        role: e.target.value
                                    })
                                }
                            >

                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>

                            </select>

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="btn"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default ManageUsers;