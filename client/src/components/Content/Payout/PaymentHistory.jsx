import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const historyData = [
    {
      staff: "Ram Sapkota",
      month: "Kartik",
      advance: 18500,
      salary: 18500,
      duty: "Yes",
      attendance: "Yes",
      dress: "Yes",
    },
    {
      staff: "Sita Sharma",
      month: "Mangsir",
      advance: 15000,
      salary: 17000,
      duty: "Yes",
      attendance: "No",
      dress: "Yes",
    },
    {
      staff: "Hari Thapa",
      month: "Falgun",
      advance: 20000,
      salary: 21000,
      duty: "Yes",
      attendance: "Yes",
      dress: "No",
    },
  ];

  const filteredData = useMemo(
    () => historyData.filter((d) => d.staff.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );

  return (
    <div className="w-full h-screen p-4 overflow-y-scroll bg-white dark:bg-[#1b1e23] no-scrollbar">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Payout History</h1>

      {/* Search */}
      <div className="max-w-md mb-6 mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>

      {/* Table container */}
      <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-[#202528] dark:border-black">
        <p className="text-md font-bold mb-5 dark:text-white">2081 (Baisakh)</p>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#202528] dark:text-white">
              <tr>
                <th className="px-4 py-3">Staff Name</th>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Advance Payment</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Duty</th>
                <th className="px-4 py-3">Attendance</th>
                <th className="px-4 py-3">Dress</th>
                <th className="px-4 py-3">Voucher</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  className="bg-white dark:bg-[#202528] border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3 font-medium dark:text-white">{row.staff}</td>
                  <td className="px-4 py-3">{row.month}</td>
                  <td className="px-4 py-3">{row.advance}</td>
                  <td className="px-4 py-3">{row.salary}</td>
                  <td className="px-4 py-3">{row.duty}</td>
                  <td className="px-4 py-3">{row.attendance}</td>
                  <td className="px-4 py-3">{row.dress}</td>
                  <td className="px-4 py-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-4 dark:text-white">
                    No results found.
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

export default PaymentHistory;
