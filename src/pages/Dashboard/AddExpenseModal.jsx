import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AddExpenseModal = ({ closeModal }) => {
    const { user } = useAuth();

    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        amount: "",
        type: "Expense", // Default type
        category: "General",
        date: today,
        note: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("https://boushahri-clinic.vercel.app/expenses", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...formData, userEmail: user?.email })
        });

        const data = await res.json();

        if (data.insertedId) {
            alert("Entry Added Successfully");
            closeModal(true);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[400px] p-6 rounded-2xl shadow-2xl border border-gray-100">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add Entry</h2>
                    <button onClick={() => closeModal()} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Transaction Type</label>
                        <select
                            name="type"
                            required
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all cursor-pointer"
                        >
                            <option value="Cash">Cash (Income)</option>
                            <option value="Knet">Knet (Income)</option>
                            <option value="Expense">Expense (Outcome)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Amount ($)</label>
                        <input
                            type="number"
                            name="amount"
                            required
                            step="0.001"
                            onChange={handleChange}
                            placeholder="Enter amount"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all cursor-pointer"
                        >
                            <option value="General">General</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Salary">Salary</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            min={today}
                            defaultValue={today}
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Note (Optional)</label>
                        <textarea
                            name="note"
                            onChange={handleChange}
                            placeholder="Optional notes..."
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all h-24"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => closeModal()}
                            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all transform active:scale-95"
                        >
                            Save Entry
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddExpenseModal;