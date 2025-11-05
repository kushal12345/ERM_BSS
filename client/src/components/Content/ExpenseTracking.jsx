import React, { useState, useEffect } from "react";

// Sample data fetch (replace with your API)
const sampleExpenses = [
  { id: 1, date: "2025-11-01", category: "Salary", description: "Monthly Salary", amount: 50000, type: "Income" },
  { id: 2, date: "2025-11-02", category: "Food", description: "Lunch with team", amount: 1200, type: "Expense" },
  { id: 3, date: "2025-11-03", category: "Transport", description: "Taxi fare", amount: 600, type: "Expense" },
  { id: 4, date: "2025-11-04", category: "Freelance", description: "Project payment", amount: 8000, type: "Income" },
];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Replace this with API fetch if needed
    setExpenses(sampleExpenses);
  }, []);

  const filteredExpenses = expenses.filter((e) => {
    const matchesFilter = filter === "All" || e.type === filter;
    const matchesSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalIncome = filteredExpenses
    .filter((e) => e.type === "Income")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = filteredExpenses
    .filter((e) => e.type === "Expense")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-[#212528] shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Expense Tracker</h2>
      <hr className="mb-4 border-gray-300 dark:border-gray-700" />

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <div className="flex space-x-2">
          {["All", "Income", "Expense"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Summary */}
      <div className="flex justify-between mb-4 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div className="text-green-600 font-semibold">Total Income: Rs.{totalIncome}</div>
        <div className="text-red-600 font-semibold">Total Expense: Rs.{totalExpense}</div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[60vh]">
        <table className="min-w-full table-auto text-sm text-gray-700 dark:text-gray-300 border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
            <tr className="text-center">
              <th className="px-3 py-2 border">Date</th>
              <th className="px-3 py-2 border">Category</th>
              <th className="px-3 py-2 border">Description</th>
              <th className="px-3 py-2 border">Amount</th>
              <th className="px-3 py-2 border">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((item) => (
              <tr
                key={item.id}
                className={`text-center hover:bg-gray-200 dark:hover:bg-gray-800 transition ${
                  item.type === "Income"
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-800"
                }`}
              >
                <td className="px-2 py-1 border">{item.date}</td>
                <td className="px-2 py-1 border">{item.category}</td>
                <td className="px-2 py-1 border">{item.description}</td>
                <td className="px-2 py-1 border text-right">Rs.{item.amount}</td>
                <td className="px-2 py-1 border">{item.type}</td>
              </tr>
            ))}
            {filteredExpenses.length === 0 && (
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

export default ExpenseTracker;
