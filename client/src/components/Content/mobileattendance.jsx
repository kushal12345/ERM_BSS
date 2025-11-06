import React, { useState } from "react";

const MobileAttendance = () => {
  // Sample staff list
  const sampleStaff = Array.from({ length: 50 }, (_, i) => `Staff ${i + 1}`);

  const [attendance, setAttendance] = useState(
    sampleStaff.map((staff) => ({
      staff,
      checkIn: "",
      checkOut: "",
      status: "Absent",
    }))
  );

  const handleCheckIn = (staffName) => {
    setAttendance((prev) =>
      prev.map((entry) =>
        entry.staff === staffName
          ? {
              ...entry,
              checkIn: new Date().toLocaleTimeString(),
              status: "Present",
            }
          : entry
      )
    );
  };

  const handleCheckOut = (staffName) => {
    setAttendance((prev) =>
      prev.map((entry) =>
        entry.staff === staffName
          ? { ...entry, checkOut: new Date().toLocaleTimeString() }
          : entry
      )
    );
  };

  const handleReset = (staffName) => {
    setAttendance((prev) =>
      prev.map((entry) =>
        entry.staff === staffName
          ? { ...entry, checkIn: "", checkOut: "", status: "Absent" }
          : entry
      )
    );
  };

  return (
    <div className="max-w-5xl h-[90vh] overflow-auto no-scrollbar mx-auto p-6 bg-white dark:bg-[#212528] rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold dark:text-white text-center mb-4">
        Mobile Attendance
      </h2>

      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Staff</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Check In</th>
              <th className="px-4 py-2 text-left">Check Out</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {attendance.map((entry) => (
              <tr key={entry.staff} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2">{entry.staff}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    entry.status === "Present"
                      ? "text-green-600 dark:text-green-400"
                      : entry.status === "Late"
                      ? "text-yellow-500 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {entry.status}
                </td>
                <td className="px-4 py-2">{entry.checkIn || "-"}</td>
                <td className="px-4 py-2">{entry.checkOut || "-"}</td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCheckIn(entry.staff)}
                    disabled={entry.checkIn}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    Check In
                  </button>
                  <button
                    onClick={() => handleCheckOut(entry.staff)}
                    disabled={!entry.checkIn || entry.checkOut}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Check Out
                  </button>
                  <button
                    onClick={() => handleReset(entry.staff)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reset
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MobileAttendance;
