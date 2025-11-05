import React, { useState, useEffect } from "react";

// Sample data
const sampleDeductions = [
  { id: 1, staffName: "Kushal Luitel", post: "Supervisor", basicSalary: 50000, tax: 5000, deductions: 2000, netSalary: 43000 },
  { id: 2, staffName: "Sita Sharma", post: "Security Guard", basicSalary: 41000, tax: 4100, deductions: 1500, netSalary: 35400 },
  { id: 3, staffName: "Ram Thapa", post: "Security Guard", basicSalary: 41000, tax: 4100, deductions: 1000, netSalary: 35900 },
];

const TaxDeductions = () => {
  const [deductions, setDeductions] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Replace with API fetch
    setDeductions(sampleDeductions);
  }, []);

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-[#212528] shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tax & Deductions Management</h2>

      {/* Filters */}
      <div className="flex space-x-2">
        {["All", "Above 40000 Net", "Below 40000 Net"].map((f) => (
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

      {/* Table */}
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left text-gray-700 dark:text-gray-300 table-auto">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0">
            <tr className="text-center">
              <th className="px-3 py-2 border">Staff Name</th>
              <th className="px-3 py-2 border">Post</th>
              <th className="px-3 py-2 border">Basic Salary</th>
              <th className="px-3 py-2 border">Tax (Rs.)</th>
              <th className="px-3 py-2 border">Other Deductions (Rs.)</th>
              <th className="px-3 py-2 border">Net Salary (Rs.)</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deductions
              .filter((d) => {
                if (filter === "All") return true;
                if (filter === "Above 40000 Net") return d.netSalary > 40000;
                if (filter === "Below 40000 Net") return d.netSalary <= 40000;
                return true;
              })
              .map((d) => (
                <tr key={d.id} className="text-center bg-gray-50 dark:bg-gray-900">
                  <td className="px-2 py-1 border">{d.staffName}</td>
                  <td className="px-2 py-1 border">{d.post}</td>
                  <td className="px-2 py-1 border text-right">{d.basicSalary}</td>
                  <td className="px-2 py-1 border text-right">{d.tax}</td>
                  <td className="px-2 py-1 border text-right">{d.deductions}</td>
                  <td className="px-2 py-1 border text-right font-semibold">{d.netSalary}</td>
                  <td className="px-2 py-1 border space-x-1">
                    <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            {deductions.length === 0 && (
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

export default TaxDeductions;
