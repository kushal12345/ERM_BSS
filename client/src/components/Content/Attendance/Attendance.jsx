import React, { useState, useEffect } from "react";
import { fetchstaff } from "../../Fetch/Fetchstaff";

const Attendance = () => {
  const [data, setData] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState([]);

  useEffect(() => {
    fetchstaff((fetchedData) => {
      setData(fetchedData);
      setAttendanceStatus(Array(fetchedData.length).fill(true));
    }, "all");
  }, []);

  const toggleAttendance = (index) => {
    setAttendanceStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  return (
    <div className="w-full h-full p-4 overflow-hidden bg-white dark:bg-[#212528] shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Daily Attendance
      </h2>
      <hr className="mb-4 border-gray-300 dark:border-gray-700" />

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition">
            All
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition">
            Present
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition">
            Absent
          </button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[70vh]">
        <table className="min-w-full table-auto text-sm text-gray-700 dark:text-gray-300 border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
            <tr className="text-center">
              <th className="px-3 py-2 border">ID</th>
              <th className="px-3 py-2 border">Employee Name</th>
              <th className="px-3 py-2 border">Phone No</th>
              <th className="px-3 py-2 border">Post</th>
              <th className="px-3 py-2 border">Attendance By</th>
              <th className="px-3 py-2 border">Shift</th>
              <th className="px-3 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((staff, index) => (
              <tr
                key={staff.id || index}
                className={`text-center ${
                  attendanceStatus[index]
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-800"
                } hover:bg-gray-200 dark:hover:bg-gray-800 transition`}
              >
                <td className="px-2 py-1 border">{index + 1}</td>
                <td className="px-2 py-1 border whitespace-nowrap">
                  {staff.Fname} {staff.Mname || ""} {staff.Lname}
                </td>
                <td className="px-2 py-1 border">{staff.phno}</td>
                <td className="px-2 py-1 border">Nurse City, Samakhusi</td>
                <td className="px-2 py-1 border">Admin</td>
                <td className="px-2 py-1 border">Day</td>
                <td className="px-2 py-1 border">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={attendanceStatus[index]}
                      onChange={() => toggleAttendance(index)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full dark:peer-checked:after:border-white"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
