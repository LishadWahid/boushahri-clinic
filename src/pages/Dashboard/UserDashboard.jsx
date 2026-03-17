import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import AddExpenseModal from './AddExpenseModal';

const UserDashboard = () => {

    const { user } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        try {
            const res = await fetch("https://boushahri-clinic.vercel.app/expenses");
            const data = await res.json();
            setExpenses(data);
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const userExpenses = expenses.filter(item => item.type === 'Expense' && item.userEmail === user?.email);
    const totalExpense = userExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const totalCategories = new Set(userExpenses.map(item => item.category)).size;

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Welcome, {user?.displayName || 'User'}
                </h1>

                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Expense
                </button>
            </div>

            <p className="text-gray-600">
                Track and manage your expenses
            </p>

            {userExpenses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="card bg-blue-50 shadow border">
                        <div className="card-body">
                            <h2 className="card-title">Total Expenses</h2>
                            <p className="text-4xl font-bold">${totalExpense}</p>
                        </div>
                    </div>

                    <div className="card bg-green-50 shadow border">
                        <div className="card-body">
                            <h2 className="card-title">Categories</h2>
                            <p className="text-4xl font-bold">{totalCategories}</p>
                        </div>
                    </div>

                    <div className="card bg-purple-50 shadow border">
                        <div className="card-body">
                            <h2 className="card-title">Reports</h2>
                            <p className="text-4xl font-bold">0</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 p-8 rounded-xl border border-dashed border-gray-200 text-center mt-8">
                    <p className="text-gray-500 italic">No expenses recorded yet.</p>
                </div>
            )}

            {openModal && (
                <AddExpenseModal closeModal={(isSuccess) => {
                    setOpenModal(false);
                    if (isSuccess) fetchExpenses();
                }} />
            )}

        </div>
    );
};

export default UserDashboard;