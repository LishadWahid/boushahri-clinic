import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const DatabaseManager = () => {
    const [users, setUsers] = useState([]);
    const [records, setRecords] = useState([]);
    const [selectedUser, setSelectedUser] = useState("all");

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Load users
    useEffect(() => {
        fetch("https://boushahri-clinic.vercel.app/api/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    // Fetch records from expenses collection (unified data source)
    useEffect(() => {
        fetch("https://boushahri-clinic.vercel.app/expenses")
            .then(res => res.json())
            .then(data => {
                setRecords(data);
            });
    }, []);

    const filteredRecords = records.filter(record => {
        const matchUser =
            selectedUser === "all" || record.userEmail === selectedUser;

        const matchFrom =
            !fromDate || new Date(record.date) >= new Date(fromDate);

        const matchTo =
            !toDate || new Date(record.date) <= new Date(toDate);

        return matchUser && matchFrom && matchTo;
    });

    const generatePDF = () => {
        try {
            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text("Database Transaction Report", 14, 20);

            doc.setFontSize(10);
            doc.text(`Report Period: ${fromDate || 'Start'} to ${toDate || 'Today'}`, 14, 28);
            doc.text(`User Filter: ${selectedUser === 'all' ? 'All Users' : selectedUser}`, 14, 34);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 40);

            const tableColumn = ["Email", "Type", "Category", "Amount", "Date"];
            const tableRows = [];

            filteredRecords.forEach(record => {
                const rowData = [
                    record.userEmail,
                    record.type,
                    record.category || "General",
                    `KWD ${Number(record.amount).toFixed(3)}`,
                    record.date
                ];
                tableRows.push(rowData);
            });

            autoTable(doc, {
                startY: 45,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
                headStyles: { fillColor: [59, 130, 246] },
                styles: { fontSize: 8 }
            });

            doc.save(`Database_Report_${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error("PDF Error:", error);
            alert("Could not generate PDF. Please ensure libraries are installed.");
        }
    };

    const clearFilters = () => {
        setSelectedUser("all");
        setFromDate("");
        setToDate("");
    };

    return (
        <div className="p-6 space-y-6">
            {/* FILTER SECTION */}
            <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Filter Database Records</h2>
                    <button
                        onClick={generatePDF}
                        disabled={filteredRecords.length === 0}
                        className="btn btn-sm btn-primary flex items-center gap-2"
                    >
                        <Download size={16} />
                        Download Report PDF
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    {/* User Filter */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-medium">Select User</span></label>
                        <select
                            className="select select-bordered w-full"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="all">All Users</option>
                            {users.map(user => (
                                <option key={user._id} value={user.email}>
                                    {user.name || user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* From Date */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-medium">From Date</span></label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>

                    {/* To Date */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-medium">To Date</span></label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>

                    {/* Clear Button */}
                    <button
                        onClick={clearFilters}
                        className="btn btn-outline border-gray-300 hover:bg-gray-100 h-[3rem]"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Database Transaction Records</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600">
                                <th>User (Email)</th>
                                <th>Transaction Type</th>
                                <th>Amount (KWD)</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map(record => (
                                    <tr key={record._id} className="hover:bg-gray-50 border-b border-gray-100">
                                        <td className="py-4 font-medium">{record.userEmail}</td>
                                        <td>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${record.type === 'Expense' ? 'bg-red-100 text-red-700' :
                                                    record.type === 'Knet' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {record.type}
                                            </span>
                                        </td>
                                        <td className="font-bold">
                                            {Number(record.amount).toFixed(3)}
                                        </td>
                                        <td>{record.category || "General"}</td>
                                        <td>{record.date}</td>
                                        <td className="text-gray-500 max-w-xs truncate">{record.note || "-"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-400 italic">
                                        No matching records found in the database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DatabaseManager;