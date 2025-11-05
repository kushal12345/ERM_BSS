import React, { useState, useMemo } from "react";

const PayrollReports = () => {
  const [selectedStaff, setSelectedStaff] = useState("");

  const staffList = ["Kushal", "Kritan", "Prem"];

  const reportData = [
    {
      year: 2080,
      month: "Chaitra",
      regularHours: "12 Hours",
      post: "Nurse City",
      amount: 18000,
      overtimeHours: "3 Hours (Gyan Sanskar)",
      overtimeAmount: 1500,
      ssf: 2930,
    },
    {
      year: 2081,
      month: "Baisakh",
      regularHours: "12 Hours",
      post: "Nurse City",
      amount: 18000,
      overtimeHours: "3 Hours (Gyan Sanskar)",
      overtimeAmount: 1500,
      ssf: 2930,
    },
  ];

  const filteredReports = useMemo(
    () =>
      selectedStaff
        ? reportData.filter((report) => report.staff === selectedStaff)
        : reportData,
    [selectedStaff]
  );

  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#EAEBF4] dark:bg-[#1b1e23] no-scrollbar p-4">
      <h1 className="text-center text-2xl font-bold mb-4 dark:text-white">
        Payroll Annual Summary Reports
      </h1>
      <hr className="border-b-1 my-5 mx-3 border-blue-400" />

      {/* Filter Form */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="text-lg font-semibold dark:text-white">Name:</label>
        <select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="">Select Staff</option>
          {staffList.map((staff, idx) => (
            <option key={idx} value={staff}>
              {staff}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Generate Report
        </button>
      </div>

      {/* Staff Info */}
      <div className="flex flex-wrap justify-between mb-4 text-gray-800 dark:text-white">
        <span className="font-bold">Name: Kushal Bahadur Luitel</span>
        <span className="font-bold">Joined Date: 2080-Chaitra-1</span>
        <span className="font-bold">Terminated: Not Yet</span>
      </div>

      {/* Table */}
      <div className="relative border border-gray-300 dark:border-gray-700 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#202528] dark:text-white">
            <tr>
              <th className="px-6 py-3">Year</th>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Regular Hours</th>
              <th className="px-6 py-3">Post</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Overtime (POST)</th>
              <th className="px-6 py-3">Overtime Amount</th>
              <th className="px-6 py-3">SSF</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((row, idx) => (
              <tr
                key={idx}
                className="bg-white dark:bg-[#202528] border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4 font-medium dark:text-white">{row.year}</td>
                <td className="px-6 py-4">{row.month}</td>
                <td className="px-6 py-4">{row.regularHours}</td>
                <td className="px-6 py-4">{row.post}</td>
                <td className="px-6 py-4">{row.amount}</td>
                <td className="px-6 py-4">{row.overtimeHours}</td>
                <td className="px-6 py-4">{row.overtimeAmount}</td>
                <td className="px-6 py-4">{row.ssf}</td>
              </tr>
            ))}
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 dark:text-white">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollReports;
