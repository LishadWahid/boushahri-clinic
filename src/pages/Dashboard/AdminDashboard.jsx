import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/expenses")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  // Calculate stats
  const totalCash = transactions
    .filter((t) => t.type === "Cash")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalKnet = transactions
    .filter((t) => t.type === "Knet")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const netBalance = totalCash + totalKnet - totalExpense;

  // Prepare chart data (Grouped by date)
  const groupedData = transactions.reduce((acc, curr) => {
    const date = curr.date || "Unknown";
    if (!acc[date]) {
      acc[date] = { name: date, cash: 0, knet: 0, expense: 0 };
    }
    if (curr.type === "Cash") acc[date].cash += Number(curr.amount);
    if (curr.type === "Knet") acc[date].knet += Number(curr.amount);
    if (curr.type === "Expense") acc[date].expense += Number(curr.amount);
    return acc;
  }, {});

  const chartData = Object.values(groupedData).sort((a, b) => new Date(a.name) - new Date(b.name));

  return (
    <div className="w-full">
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time financial overview of Boushahri Clinic.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-blue-500 uppercase tracking-wider">Total Cash</p>
              <div className="p-2 bg-blue-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700">KWD {totalCash.toFixed(3)}</h2>
        </div>

        <div className="bg-green-50 border border-green-100 p-6 rounded-2xl shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-green-500 uppercase tracking-wider">Total Knet</p>
              <div className="p-2 bg-green-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
              </div>
          </div>
          <h2 className="text-3xl font-extrabold text-green-700">KWD {totalKnet.toFixed(3)}</h2>
        </div>

        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-red-500 uppercase tracking-wider">Total Expense</p>
              <div className="p-2 bg-red-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.51m-3.182 5.51l-5.511-3.181" /></svg>
              </div>
          </div>
          <h2 className="text-3xl font-extrabold text-red-600">KWD {totalExpense.toFixed(3)}</h2>
        </div>

        <div className="bg-purple-50 border border-purple-100 p-6 rounded-2xl shadow-sm transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-purple-500 uppercase tracking-wider">Net Balance</p>
              <div className="p-2 bg-purple-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-purple-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
              </div>
          </div>
          <h2 className={`text-3xl font-extrabold ${netBalance >= 0 ? 'text-purple-700' : 'text-orange-600'}`}>
            KWD {netBalance.toFixed(3)}
          </h2>
        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Financial Statistics Overview</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} 
                cursor={{fill: '#f3f4f6'}}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />

              <Bar dataKey="cash" name="Cash" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="knet" name="Knet" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />

            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[350px] text-gray-400">
             No financial data available to display chart.
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
