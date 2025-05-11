import React, { useState } from 'react';

const HolidayFormPage = () => {
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({
    employee: '',
    startDate: '',
    endDate: '',
    reason: '',
    approvedBy: '',
    status: 'Pending'
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
      status: 'Pending'
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Holiday Request Form</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
      <select name="employee" value={form.employee} onChange={handleChange} className="p-2 border rounded" required>
            <option value="" disabled>Select Employee</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Alice Johnson">Alice Johnson</option>
            <option value="Bob Brown">Bob Brown</option>
        </select> <br/> 
        <label className="text-black dark:text-gray-300">Start Date</label> 
        <label className="text-black dark:text-gray-300">End Date</label>     
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="p-2 border rounded" required />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="p-2 border rounded" required />
        <input name="reason" value={form.reason} onChange={handleChange} placeholder="Reason for Holiday" className="p-2 border rounded col-span-1 md:col-span-2" required />
        <select name="issuedBy" value={form.issuedBy} onChange={handleChange} className="p-2 border rounded col-span-1 md:col-span-2" required>
            <option value="" >Select Issued By</option>
            <option value="Chinkaji">Chinkaji</option>
            <option value="Premluitel">Prem Luitel</option>
            <option value="Kushalluitel">Kushal Luitel</option>
            <option value="Kritanluitel">Kritan Luitel</option>
        </select>        
        <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded">
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full md:w-auto">Submit Request</button>
      </form>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center bg-white   dark:bg-gray-800 dark:border-gray-700">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Approved By</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.id} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{holiday.id}</td>
                <td className="px-4 py-2">{holiday.employee}</td>
                <td className="px-4 py-2">{holiday.startDate}</td>
                <td className="px-4 py-2">{holiday.endDate}</td>
                <td className="px-4 py-2">{holiday.reason}</td>
                <td className="px-4 py-2">{holiday.status}</td>
                <td className="px-4 py-2">{holiday.approvedBy}</td>
              </tr>
            ))}
            {holidays.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No holiday requests submitted.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HolidayFormPage;