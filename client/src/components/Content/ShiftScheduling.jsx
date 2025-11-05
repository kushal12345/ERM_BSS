import React, { useState, useEffect } from "react";

const ShiftScheduling = ({ employees }) => {
  const [shiftData, setShiftData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  useEffect(() => {
    // Initialize shift data (example)
    if (employees) {
      const initialData = employees.map((emp) => ({
        id: emp.id,
        name: `${emp.Fname} ${emp.Mname || ""} ${emp.Lname}`,
        position: emp.position || "N/A",
        assignedShift: "Day", // Default shift
        date: new Date().toISOString().split("T")[0],
      }));
      setShiftData(initialData);
    }
  }, [employees]);

  const handleShiftChange = (index, value) => {
    const updated = [...shiftData];
    updated[index].assignedShift = value;
    setShiftData(updated);
  };

  const filteredData = shiftData.filter(
    (d) =>
      (filterDate === "" || d.date === filterDate) &&
      (filterEmployee === "" || d.name.toLowerCase().includes(filterEmployee.toLowerCase()))
  );

  return (
    <div className="w-full h-full p-3 pt-5 overflow-hidden bg-white dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
      <h2 className="mx-6 font-bold text-xl dark:text-white">Shift Scheduling</h2>
      <hr className="mx-6 my-2 border border-gray-300 dark:border-gray-700" />

      {/* Filters */}
      <div className="flex justify-between mx-6 my-3 space-x-2">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-1"
        />
        <input
          type="text"
          placeholder="Search Employee"
          value={filterEmployee}
          onChange={(e) => setFilterEmployee(e.target.value)}
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
                <th className="px-2 py-1">Position</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Assigned Shift</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 dark:text-gray-300">
                    No shifts scheduled.
                  </td>
                </tr>
              ) : (
                filteredData.map((emp, index) => (
                  <tr
                    key={index}
                    className="text-center align-middle border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-2 py-1 font-medium dark:text-white">{emp.id}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{emp.name}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{emp.position}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{emp.date}</td>
                    <td className="px-2 py-1">
                      <select
                        value={emp.assignedShift}
                        onChange={(e) => handleShiftChange(index, e.target.value)}
                        className="h-8 w-full p-1 border border-gray-300 rounded-lg"
                      >
                        <option value="Day">Day</option>
                        <option value="Night">Night</option>
                        <option value="Evening">Evening</option>
                        <option value="Off">Off</option>
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

export default ShiftScheduling;
