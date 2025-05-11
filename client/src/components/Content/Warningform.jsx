import React, { useState } from 'react';

const EmployeeWarningPage = () => {
  const [warnings, setWarnings] = useState([]);
  const [form, setForm] = useState({
    employee: '',
    date: '',
    title: '',
    post: '',
    description: '',
    severity: 'Low',
    actionTaken: '',
    issuedBy: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWarning = { ...form, id: warnings.length + 1 };
    setWarnings([newWarning, ...warnings]);
    setForm({
      employee: '',
      date: '',
      title: '',
      post: '',
      description: '',
      severity: 'Low',
      actionTaken: '',
      issuedBy: ''
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl space-y-6">
      <h1 className="text-2xl  font-bold text-gray-800 dark:text-white">Employee Warning Management</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <select name="employee" value={form.employee} onChange={handleChange} className="p-2 border rounded" required>
            <option value="" disabled>Select Employee</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Alice Johnson">Alice Johnson</option>
            <option value="Bob Brown">Bob Brown</option>
        </select>

        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 border rounded" required />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Warning Title" className="p-2 border rounded" required />
        <select name="severity" value={form.severity} onChange={handleChange} className="p-2 border rounded">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select name="post" value={form.post} onChange={handleChange} className="p-2 border rounded" required>
            <option value="" disabled>Select Duty Post</option>
            <option value="NorthCity">North City Multipurpose</option>
            <option value="Gyansanskar">Gyansanskar School</option>
            <option value="Nist">Nist</option>
            <option value="Namss">Namss School</option>
        </select>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded col-span-1 md:col-span-2" required />
        <input name="actionTaken" value={form.actionTaken} onChange={handleChange} placeholder="Action Taken (optional)" className="p-2 border rounded col-span-1 md:col-span-2" />
        <select name="issuedBy" value={form.issuedBy} onChange={handleChange} className="p-2 border rounded col-span-1 md:col-span-2" required>
            <option value="" disabled>Select Issued By</option>
            <option value="Chinkaji">Chinkaji</option>
            <option value="Premluitel">Prem Luitel</option>
            <option value="Kushalluitel">Kushal Luitel</option>
            <option value="Kritanluitel">Kritan Luitel</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto">Issue Warning</button>
      </form>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Severity</th>
              <th className="px-4 py-2">Action Taken</th>
              <th className="px-4 py-2">Issued By</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {warnings.map((warn) => (
              <tr key={warn.id} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{warn.id}</td>
                <td className="px-4 py-2">{warn.employee}</td>
                <td className="px-4 py-2">{warn.date}</td>
                <td className="px-4 py-2">{warn.title}</td>
                <td className="px-4 py-2">{warn.description}</td>
                <td className="px-4 py-2">{warn.severity}</td>
                <td className="px-4 py-2">{warn.actionTaken}</td>
                <td className="px-4 py-2">{warn.issuedBy}</td>
                <td className="px-4 py-2"><span className='text-blue-600'>Delete</span></td>
              </tr>
            ))}
            {warnings.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No warnings issued yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeWarningPage;
