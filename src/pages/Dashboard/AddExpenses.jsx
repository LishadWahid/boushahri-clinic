import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit2, Trash2 } from 'lucide-react';

const AddExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    const fetchExpenses = () => {
        fetch("https://boushahri-clinic.vercel.app/expenses")
            .then(res => res.json())
            .then(data => {
                // Filter only 'Expense' type
                const expenseData = data.filter(item => item.type === 'Expense');
                setExpenses(expenseData);
            });
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this expense record?')) {
            axios.delete(`https://boushahri-clinic.vercel.app/expenses/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        alert('Deleted successfully!');
                        fetchExpenses();
                    }
                })
                .catch(err => console.error(err));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { _id, ...updateData } = editingExpense;

        axios.put(`https://boushahri-clinic.vercel.app/expenses/${_id}`, updateData)
            .then(res => {
                if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                    alert('Updated successfully!');
                    setEditingExpense(null);
                    fetchExpenses();
                } else {
                    alert('No changes made.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Update failed.');
            });
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Manage All Expenses</h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700">
                            <th>User (Email)</th>
                            <th>Category</th>
                            <th>Amount (KWD)</th>
                            <th>Date</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length > 0 ? (
                            expenses.map((expense) => (
                                <tr key={expense._id} className="hover:bg-gray-50 border-b border-gray-100">
                                    <td className="font-medium text-gray-800">{expense.userEmail}</td>
                                    <td>
                                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {expense.category || 'General'}
                                        </span>
                                    </td>
                                    <td className="text-red-600 font-bold">
                                        KWD {Number(expense.amount).toFixed(3)}
                                    </td>
                                    <td className="text-gray-600">{expense.date}</td>
                                    <td className="text-gray-500 italic max-w-xs truncate">
                                        {expense.note || '-'}
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingExpense(expense)}
                                                className="btn btn-xs btn-primary gap-1"
                                            >
                                                <Edit2 size={12} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(expense._id)}
                                                className="btn btn-xs btn-error text-white gap-1"
                                            >
                                                <Trash2 size={12} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400">
                                    No expense records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingExpense && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Expense Detail</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="label-text block mb-1 font-medium text-gray-700">Amount (KWD)</label>
                                <input
                                    type="number"
                                    step="0.001"
                                    className="input input-bordered w-full"
                                    value={editingExpense.amount}
                                    onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={editingExpense.category}
                                    onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium text-gray-700">Note</label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    value={editingExpense.note}
                                    onChange={(e) => setEditingExpense({ ...editingExpense, note: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setEditingExpense(null)} className="btn btn-ghost">Cancel</button>
                                <button type="submit" className="btn btn-primary px-8 text-white">Update Expense</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddExpenses;
