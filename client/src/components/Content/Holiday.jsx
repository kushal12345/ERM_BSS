import React, { useState } from 'react';

const HolidayFormPage = () => {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'list'
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({
    employee: '',
    startDate: '',
    endDate: '',
    reason: '',
    approvedBy: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHoliday = { ...form, id: holidays.length + 1 };
    setHolidays([newHoliday, ...holidays]);
    setForm({
      employee: '',
      startDate: '',
      endDate: '',
      reason: '',
      approvedBy: '',
      status: 'Pending',
    });
    setActiveTab('list'); // Switch to list after submission
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-200 text-green-800';
      case 'Rejected':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-yellow-200 text-yellow-800';
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl h-full">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Holiday Management</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          onClick={() => setActiveTab('form')}
        >
          Request Holiday
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          onClick={() => setActiveTab('list')}
        >
          Holiday List
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'form' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full max-w-md">
          <form className="space-y-2" onSubmit={handleSubmit}>
            <select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="" disabled>Select Employee</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Alice Johnson">Alice Johnson</option>
              <option value="Bob Brown">Bob Brown</option>
            </select>

            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <input
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Reason"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />

            <select
              name="approvedBy"
              value={form.approvedBy}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="" disabled>Select Approved By</option>
              <option value="Chinkaji">Chinkaji</option>
              <option value="Prem Luitel">Prem Luitel</option>
              <option value="Kushal Luitel">Kushal Luitel</option>
              <option value="Kritan Luitel">Kritan Luitel</option>
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {activeTab === 'list' && (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow p-2">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Employee</th>
                <th className="p-2">Start</th>
                <th className="p-2">End</th>
                <th className="p-2">Reason</th>
                <th className="p-2">Status</th>
                <th className="p-2">Approved By</th>
              </tr>
            </thead>
            <tbody>
              {holidays.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500 dark:text-gray-300">
                    No holiday requests submitted.
                  </td>
                </tr>
              ) : (
                holidays.map((holiday) => (
                  <tr key={holiday.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="p-2 font-medium text-gray-900 dark:text-white">{holiday.id}</td>
                    <td className="p-2">{holiday.employee}</td>
                    <td className="p-2">{holiday.startDate}</td>
                    <td className="p-2">{holiday.endDate}</td>
                    <td className="p-2">{holiday.reason}</td>
                    <td className={`p-2 font-semibold text-center rounded ${statusColor(holiday.status)}`}>{holiday.status}</td>
                    <td className="p-2">{holiday.approvedBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HolidayFormPage;
