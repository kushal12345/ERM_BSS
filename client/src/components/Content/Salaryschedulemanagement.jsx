import React, { useState, useEffect } from "react";

// Sample data
const sampleSalaries = [
  { id: 1, staffName: "Kushal Luitel", post: "Security Supervisor", month: "Nov 2025", salary: 50000, status: "Paid", paymentDate: "2025-11-05" },
  { id: 2, staffName: "Sita Sharma", post: "Security Guard", month: "Nov 2025", salary: 41000, status: "Pending", paymentDate: null },
  { id: 3, staffName: "Ram Thapa", post: "Security Guard", month: "Nov 2025", salary: 41000, status: "Paid", paymentDate: "2025-11-05" },
];

const SalarySchedule = () => {
  const [salaries, setSalaries] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Replace with API fetch
    setSalaries(sampleSalaries);
  }, []);

  const filteredSalaries = salaries.filter(
    (s) => filter === "All" || s.status === filter
  );

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-[#212528] shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Salary Schedule Management</h2>

      {/* Filters */}
      <div className="flex space-x-2">
        {["All", "Paid", "Pending"].map((f) => (
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

      {/* Salary Table */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-gray-700 dark:text-gray-300 table-auto">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0">
            <tr className="text-center">
              <th className="px-3 py-2 border">Staff Name</th>
              <th className="px-3 py-2 border">Post</th>
              <th className="px-3 py-2 border">Month</th>
              <th className="px-3 py-2 border">Salary (Rs.)</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Payment Date</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((s) => (
              <tr
                key={s.id}
                className={`text-center ${
                  s.status === "Paid"
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}
              >
                <td className="px-2 py-1 border">{s.staffName}</td>
                <td className="px-2 py-1 border">{s.post}</td>
                <td className="px-2 py-1 border">{s.month}</td>
                <td className="px-2 py-1 border text-right">{s.salary}</td>
                <td className="px-2 py-1 border font-semibold">{s.status}</td>
                <td className="px-2 py-1 border">{s.paymentDate || "-"}</td>
                <td className="px-2 py-1 border space-x-1">
                  <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Mark Paid</button>
                  <button className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">Edit</button>
                </td>
              </tr>
            ))}
            {filteredSalaries.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500 dark:text-gray-400">
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

export default SalarySchedule;
