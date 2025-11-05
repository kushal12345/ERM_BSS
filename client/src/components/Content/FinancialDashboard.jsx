import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Sample data
const sampleTransactions = [
  { id: 1, date: "2025-11-01", category: "Salary", description: "Monthly Salary", amount: 50000, type: "Income" },
  { id: 2, date: "2025-11-02", category: "Food", description: "Lunch with team", amount: 1200, type: "Expense" },
  { id: 3, date: "2025-11-03", category: "Transport", description: "Taxi fare", amount: 600, type: "Expense" },
  { id: 4, date: "2025-11-04", category: "Freelance", description: "Project payment", amount: 8000, type: "Income" },
];

const FinancialDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Replace with API fetch
    setTransactions(sampleTransactions);
  }, []);

  const filteredTransactions = transactions.filter(
    (t) => filter === "All" || t.type === filter
  );

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // Prepare chart data
  const chartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-[#212528] shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Financial Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-xl shadow flex flex-col items-center">
          <p className="text-gray-700 dark:text-white font-semibold">Total Income</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">Rs.{totalIncome}</p>
        </div>
        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-xl shadow flex flex-col items-center">
          <p className="text-gray-700 dark:text-white font-semibold">Total Expense</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">Rs.{totalExpense}</p>
        </div>
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-xl shadow flex flex-col items-center">
          <p className="text-gray-700 dark:text-white font-semibold">Balance</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">Rs.{balance}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Income vs Expense</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#00C49F" />
              <Bar dataKey="amount" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Income vs Expense (Pie)</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow overflow-x-auto">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-2">
            {["All", "Income", "Expense"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg font-semibold ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <table className="min-w-full text-left text-gray-700 dark:text-gray-300 table-auto">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0">
            <tr className="text-center">
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Category</th>
              <th className="px-3 py-2 border">Description</th>
              <th className="px-3 py-2 border">Amount</th>
              <th className="px-3 py-2 border">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className={`text-center ${
                  t.type === "Income" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                }`}
              >
                <td className="px-2 py-1 border">{t.date}</td>
                <td className="px-2 py-1 border">{t.category}</td>
                <td className="px-2 py-1 border">{t.description}</td>
                <td className="px-2 py-1 border text-right">Rs.{t.amount}</td>
                <td className="px-2 py-1 border">{t.type}</td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialDashboard;
