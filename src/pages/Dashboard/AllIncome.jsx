import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit2, Trash2 } from 'lucide-react';

const AllIncome = () => {
    const [incomes, setIncomes] = useState([]);
    const [editingIncome, setEditingIncome] = useState(null);

    const fetchIncomes = () => {
        fetch("http://localhost:3000/expenses")
            .then(res => res.json())
            .then(data => {
                // Filter only Cash and Knet (Income types)
                const incomeData = data.filter(item => item.type === 'Cash' || item.type === 'Knet');
                setIncomes(incomeData);
            });
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this income record?')) {
            axios.delete(`http://localhost:3000/expenses/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        alert('Deleted successfully!');
                        fetchIncomes();
                    }
                })
                .catch(err => console.error(err));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/expenses/${editingIncome._id}`, editingIncome)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    alert('Updated successfully!');
                    setEditingIncome(null);
                    fetchIncomes();
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">All Income Records</h2>
            
            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700">
                            <th>User</th>
                            <th>Cash Amount</th>
                            <th>Knet Sales</th>
                            <th>Date</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.length > 0 ? (
                            incomes.map((income) => (
                                <tr key={income._id} className="hover:bg-gray-50 border-b border-gray-100">
                                    <td className="font-medium text-gray-800">{income.userEmail}</td>
                                    <td className="text-green-600 font-bold">
                                        {income.type === 'Cash' ? `KWD ${Number(income.amount).toFixed(3)}` : '-'}
                                    </td>
                                    <td className="text-blue-600 font-bold">
                                        {income.type === 'Knet' ? `KWD ${Number(income.amount).toFixed(3)}` : '-'}
                                    </td>
                                    <td className="text-gray-600">{income.date}</td>
                                    <td className="text-gray-500 italic">{income.note || 'No note'}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setEditingIncome(income)}
                                                className="btn btn-xs btn-primary gap-1"
                                            >
                                                <Edit2 size={12} /> Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(income._id)}
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
                                    No income records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingIncome && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Edit Income Record</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="label-text block mb-1 font-medium">Amount</label>
                                <input 
                                    type="number" 
                                    step="0.001"
                                    className="input input-bordered w-full" 
                                    value={editingIncome.amount}
                                    onChange={(e) => setEditingIncome({...editingIncome, amount: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium">Income Type</label>
                                <select 
                                    className="select select-bordered w-full"
                                    value={editingIncome.type}
                                    onChange={(e) => setEditingIncome({...editingIncome, type: e.target.value})}
                                >
                                    <option value="Cash">Cash (Income)</option>
                                    <option value="Knet">Knet (Income)</option>
                                </select>
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium">Category</label>
                                <input 
                                    type="text"
                                    className="input input-bordered w-full" 
                                    value={editingIncome.category}
                                    onChange={(e) => setEditingIncome({...editingIncome, category: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="label-text block mb-1 font-medium">Note (Optional)</label>
                                <textarea 
                                    className="textarea textarea-bordered w-full" 
                                    value={editingIncome.note}
                                    onChange={(e) => setEditingIncome({...editingIncome, note: e.target.value})}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setEditingIncome(null)} className="btn btn-ghost">Cancel</button>
                                <button type="submit" className="btn btn-primary px-8 text-white">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllIncome;
