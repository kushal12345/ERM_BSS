import React, { useState } from "react";
import * as XLSX from "xlsx";

const DutyLogbook = () => {
  // Sample 200+ staff
  const sampleStaff = Array.from({ length: 200 }, (_, i) => `Staff ${i + 1}`);

  const initialForm = {
    staff: [],
    date: "",
    startTime: "",
    endTime: "",
    shift: "Morning",
    location: "",
    notes: "",
    status: "Pending",
  };

  const [activeTab, setActiveTab] = useState("add");
  const [formData, setFormData] = useState(initialForm);
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState({ staff: "", date: "", shift: "" });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, selectedOptions, type } = e.target;
    if (type === "select-multiple") {
      const selected = Array.from(selectedOptions).map((o) => o.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add duty entry
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLogs = formData.staff.map((staffName) => ({
      ...formData,
      staff: staffName,
      id: Date.now() + Math.random(),
    }));
    setLogs((prev) => [...prev, ...newLogs]);
    setFormData(initialForm);
    setActiveTab("list");
  };

  // Delete entry
  const handleDelete = (id) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  // Export logs to Excel
const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(logs);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "DutyLogs");
  XLSX.writeFile(wb, "DutyLogs.xlsx");
};


  // Filtered logs
  const filteredLogs = logs.filter((log) => {
    return (
      (filter.staff ? log.staff.includes(filter.staff) : true) &&
      (filter.date ? log.date === filter.date : true) &&
      (filter.shift ? log.shift === filter.shift : true)
    );
  });

  return (
    <div className="no-scrollbar mx-auto h-[80vh] max-w-7xl space-y-6 overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-[#212528]">
      <h2 className="mb-4 text-center text-3xl font-bold dark:text-white">Duty Logbook</h2>

      {/* Tabs */}
      <div className="mb-4 flex space-x-4 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "add"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Add Duty Entry
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "list"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Duty Logs
        </button>
      </div>

      {/* Add Duty Form */}
      {activeTab === "add" && (
        <div className="rounded-xl bg-gray-50 p-6 shadow-md dark:bg-[#1f2226]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Staff (Multiple)</label>
              <select
                name="staff"
                value={formData.staff}
                onChange={handleChange}
                multiple
                required
                className="h-40 overflow-y-auto rounded-lg border p-3 focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
              >
                {sampleStaff.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="rounded-lg border p-3 focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="rounded-lg border p-3 focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="rounded-lg border p-3 focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Shift Type</label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="rounded-lg border p-3 focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Location / Post</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="rounded-lg border p-3 focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-lg border p-3 focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <div className="col-span-full flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Notes / Remarks</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                className="rounded-lg border p-3 focus:ring-2 focus:ring-blue-400 dark:bg-[#2b2e33] dark:text-white"
              ></textarea>
            </div>

            <div className="col-span-full">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
              >
                Add Duty Entries
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Duty Logs Table */}
      {activeTab === "list" && (
        <div className="rounded-xl bg-gray-50 p-4 shadow-md dark:bg-[#1f2226]">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">Duty Logs</h3>

          {/* Filter */}
          <div className="mb-4 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Filter by Staff"
              value={filter.staff}
              onChange={(e) => setFilter({ ...filter, staff: e.target.value })}
              className="rounded-lg border p-2 dark:bg-[#2b2e33] dark:text-white"
            />
            <input
              type="date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              className="rounded-lg border p-2 dark:bg-[#2b2e33] dark:text-white"
            />
            <select
              value={filter.shift}
              onChange={(e) => setFilter({ ...filter, shift: e.target.value })}
              className="rounded-lg border p-2 dark:bg-[#2b2e33] dark:text-white"
            >
              <option value="">All Shifts</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
            <button
              onClick={exportToExcel}
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Export to Excel
            </button>
          </div>

          <div className="max-h-[500px] overflow-auto">
            {filteredLogs.length === 0 ? (
              <p className="text-center dark:text-gray-300">No duty entries found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Staff</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Shift</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-2">{log.staff}</td>
                      <td className="px-4 py-2">{log.date}</td>
                      <td className="px-4 py-2">{log.shift}</td>
                      <td className="px-4 py-2">{log.location}</td>
                      <td className="px-4 py-2">{log.status}</td>
                      <td className="flex space-x-2 px-4 py-2">
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DutyLogbook;
