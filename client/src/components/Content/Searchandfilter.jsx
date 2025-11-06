import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DutyLogbook = () => {
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

  // Filter state
  const [filter, setFilter] = useState({
    staff: "",
    date: "",
    shift: "",
    status: "",
  });

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

  // Submit new duty entry
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

  // Export filtered logs to Excel
  const exportToExcel = () => {
    const filteredLogs = applyFilter(logs);
    const ws = XLSX.utils.json_to_sheet(filteredLogs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DutyLogs");
    XLSX.writeFile(wb, "DutyLogs.xlsx");
  };

  // Apply filters
  const applyFilter = (data) => {
    return data.filter((log) => {
      return (
        (filter.staff ? log.staff.toLowerCase().includes(filter.staff.toLowerCase()) : true) &&
        (filter.date ? log.date === filter.date : true) &&
        (filter.shift ? log.shift === filter.shift : true) &&
        (filter.status ? log.status === filter.status : true)
      );
    });
  };

  const filteredLogs = applyFilter(logs);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-[#212528] rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold dark:text-white text-center mb-4">Duty Logbook</h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 mb-4">
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
        <div className="p-6 bg-gray-50 dark:bg-[#1f2226] rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Staff (Multiple)</label>
              <select
                name="staff"
                value={formData.staff}
                onChange={handleChange}
                multiple
                required
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400 h-40 overflow-y-auto"
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
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
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
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
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
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Shift Type</label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
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
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold dark:text-white">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
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
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <div className="col-span-full">
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Add Duty Entries
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Duty Logs Table */}
      {activeTab === "list" && (
        <div className="p-4 bg-gray-50 dark:bg-[#1f2226] rounded-xl shadow-md">
          <h3 className="text-xl font-semibold dark:text-white mb-4">Duty Logs</h3>

          {/* Filter Inputs */}
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Search Staff"
              value={filter.staff}
              onChange={(e) => setFilter({ ...filter, staff: e.target.value })}
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
            />
            <input
              type="date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
            />
            <select
              value={filter.shift}
              onChange={(e) => setFilter({ ...filter, shift: e.target.value })}
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
            >
              <option value="">All Shifts</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Absent">Absent</option>
            </select>

            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Export to Excel
            </button>
          </div>

          <div className="overflow-auto max-h-[500px]">
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
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
