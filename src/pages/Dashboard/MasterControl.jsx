import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const MasterControl = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const fetchData = () => {
        // Fetch Users
        fetch("http://localhost:3000/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
        
        // Fetch All Transactions
        fetch("http://localhost:3000/expenses")
            .then((res) => res.json())
            .then((data) => setTransactions(data));
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter data for selected user
    const selectedTransactions = transactions.filter(t => t.userEmail === selectedUser);
    
    const userExpenses = selectedTransactions
        .filter(t => t.type === "Expense")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);
        
    const userIncome = selectedTransactions
        .filter(t => t.type === "Cash" || t.type === "Knet")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);
        
    const netBalance = userIncome - userExpenses;

    const generatePDF = () => {
        try {
            const doc = new jsPDF();
            const userName = users.find(u => u.email === selectedUser)?.name || "User";
            
            doc.setFontSize(18);
            doc.text("Financial Report", 14, 20);
            doc.setFontSize(12);
            doc.text(`User: ${userName} (${selectedUser})`, 14, 30);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 37);
            
            const tableColumn = ["Date", "Type", "Category", "Amount", "Note"];
            const tableRows = [];

            selectedTransactions.forEach(t => {
                const transactionData = [
                    t.date,
                    t.type,
                    t.category,
                    `KWD ${Number(t.amount).toFixed(3)}`,
                    t.note || "-"
                ];
                tableRows.push(transactionData);
            });

            autoTable(doc, {
                startY: 45,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
                headStyles: { fillColor: [59, 130, 246] }
            });

            const finalY = doc.lastAutoTable?.finalY || 50;
            doc.text(`Total Income: KWD ${userIncome.toFixed(3)}`, 14, finalY + 10);
            doc.text(`Total Expense: KWD ${userExpenses.toFixed(3)}`, 14, finalY + 17);
            doc.text(`Net Balance: KWD ${netBalance.toFixed(3)}`, 14, finalY + 24);

            doc.save(`${userName}_Financial_Report.pdf`);
        } catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Error generating PDF. Please check if libraries are installed.");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this transaction?")) {
            const res = await fetch(`http://localhost:3000/expenses/${id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if(data.deletedCount > 0) {
                alert("Deleted successfully!");
                fetchData();
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Remove _id from payload as MongoDB doesn't allow updating it
        const { _id, ...updateData } = editingTransaction;
        
        try {
            const res = await fetch(`http://localhost:3000/expenses/${_id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(updateData)
            });
            const data = await res.json();
            
            if(data.modifiedCount > 0 || data.matchedCount > 0) {
                alert("Updated successfully!");
                setEditingTransaction(null);
                fetchData();
            } else {
                alert("No changes made or update failed.");
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert("Failed to update transaction.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Master Control Panel</h2>

            <div className="form-control w-full max-w-2xl">
                <label className="label">
                    <span className="label-text font-medium text-gray-700">Select a user to view and manage their financial data</span>
                </label>
                <select
                    className="select select-bordered select-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="" disabled>Choose a user...</option>

                    {users.map((user) => (
                        <option key={user._id} value={user.email}>
                            {user.name || 'Anonymous User'} ({user.email})
                        </option>
                    ))}
                </select>
            </div>

            {selectedUser && (
                <div className="mt-8 animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Financial Overview</h3>
                        <div className="flex gap-2">
                             <button onClick={generatePDF} className="btn btn-sm btn-outline border-blue-500 text-blue-600">Download PDF</button>
                             <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium flex items-center">{selectedUser}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-2">Total Expenses</p>
                            <h4 className="text-3xl font-extrabold text-red-700">KWD {userExpenses.toFixed(3)}</h4>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <p className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-2">Total Income</p>
                            <h4 className="text-3xl font-extrabold text-green-700">KWD {userIncome.toFixed(3)}</h4>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                            <p className="text-sm font-semibold text-purple-500 uppercase tracking-wider mb-2">Net Balance</p>
                            <h4 className={`text-3xl font-extrabold ${netBalance >= 0 ? 'text-purple-700' : 'text-orange-600'}`}>
                                KWD {netBalance.toFixed(3)}
                            </h4>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Manage Transactions (Invoices)</h3>
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-700">
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedTransactions.length > 0 ? (
                                        selectedTransactions.map(t => (
                                            <tr key={t._id} className="hover:bg-gray-50">
                                                <td>{t.date}</td>
                                                <td>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${t.type === 'Expense' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                        {t.type}
                                                    </span>
                                                </td>
                                                <td>{t.category}</td>
                                                <td className="font-bold">KWD {Number(t.amount).toFixed(3)}</td>
                                                <td className="flex gap-2">
                                                    <button onClick={() => setEditingTransaction(t)} className="btn btn-xs btn-primary">Edit</button>
                                                    <button onClick={() => handleDelete(t._id)} className="btn btn-xs btn-error text-white">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="text-center py-4 text-gray-500">No transactions found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingTransaction && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-[400px] shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Edit Transaction</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="label-text">Amount</label>
                                <input 
                                    type="number" 
                                    step="0.001"
                                    className="input input-bordered w-full" 
                                    value={editingTransaction.amount}
                                    onChange={(e) => setEditingTransaction({...editingTransaction, amount: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="label-text">Type</label>
                                <select 
                                    className="select select-bordered w-full"
                                    value={editingTransaction.type}
                                    onChange={(e) => setEditingTransaction({...editingTransaction, type: e.target.value})}
                                >
                                    <option value="Cash">Cash (Income)</option>
                                    <option value="Knet">Knet (Income)</option>
                                    <option value="Expense">Expense</option>
                                </select>
                            </div>
                            <div>
                                <label className="label-text">Category</label>
                                <input 
                                    className="input input-bordered w-full" 
                                    value={editingTransaction.category}
                                    onChange={(e) => setEditingTransaction({...editingTransaction, category: e.target.value})}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setEditingTransaction(null)} className="btn">Cancel</button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterControl;