import React, { useState, useEffect } from "react";

const PerformanceAndEval = ({ staffData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [performanceFilter, setPerformanceFilter] = useState(""); // Good, Better, Worst
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize with passed staffData
    setData(staffData || []);
  }, [staffData]);

  // Filter data based on search and performance
  const filteredData = data.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.post.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPerformance =
      performanceFilter === "" || d.performance === performanceFilter;

    return matchesSearch && matchesPerformance;
  });

  const handlePerformanceChange = (index, value) => {
    const updated = [...data];
    updated[index].performance = value;
    setData(updated);
  };

  return (
    <div className="w-full h-full p-3 pt-5 overflow-hidden bg-white dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
      <h2 className="mx-6 font-bold text-xl dark:text-white">
        Performance and Evaluation
      </h2>
      <hr className="mx-6 my-2 border border-gray-300 dark:border-gray-700" />

      {/* Filters */}
      <div className="flex justify-between mx-6 my-3">
        <div className="flex space-x-2">
          {["Good", "Better", "Worst"].map((type) => (
            <button
              key={type}
              onClick={() => setPerformanceFilter(type)}
              className={`px-3 py-1 rounded-lg text-white ${
                performanceFilter === type ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              {type}
            </button>
          ))}
          <button
            onClick={() => setPerformanceFilter("")}
            className="px-3 py-1 rounded-lg bg-gray-500 text-white"
          >
            All
          </button>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-1"
        />
      </div>

      {/* Table */}
      <div className="max-w-full h-[70%] overflow-x-auto">
        <div className="relative shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left table-fixed text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center align-middle">
                <th className="px-2 py-1">ID</th>
                <th className="px-2 py-1">Employee Name</th>
                <th className="px-2 py-1">Phone No</th>
                <th className="px-2 py-1">Post</th>
                <th className="px-2 py-1">Terminated</th>
                <th className="px-2 py-1">Shift</th>
                <th className="px-2 py-1">Remark</th>
                <th className="px-2 py-1">Performance</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 dark:text-gray-300">
                    No staff found.
                  </td>
                </tr>
              ) : (
                filteredData.map((staff, index) => (
                  <tr
                    key={index}
                    className={`text-center align-middle ${
                      staff.performance === "Good"
                        ? "bg-green-200"
                        : staff.performance === "Better"
                        ? "bg-yellow-200"
                        : staff.performance === "Worst"
                        ? "bg-red-200"
                        : ""
                    } border-b border-gray-200 dark:border-gray-700`}
                  >
                    <td className="px-2 py-1 font-medium dark:text-white">{index + 1}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{staff.name}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{staff.phone}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{staff.post}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">
                      {staff.terminated ? "Yes" : "No"}
                    </td>
                    <td className="px-2 py-1 font-medium dark:text-white">{staff.shift}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">
                      <ul className="list-disc list-inside">
                        {staff.remarks?.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-2 py-1">
                      <select
                        value={staff.performance || ""}
                        onChange={(e) => handlePerformanceChange(index, e.target.value)}
                        className="h-8 w-full p-1 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Good">Good</option>
                        <option value="Better">Better</option>
                        <option value="Worst">Worst</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAndEval;
