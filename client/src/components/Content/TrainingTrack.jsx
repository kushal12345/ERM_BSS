import React, { useState } from 'react';

const TrainingCertDashboard = () => {
  const [activeTab, setActiveTab] = useState('Add');
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState({
    employee: '',
    training: '',
    issuedBy: '',
    startDate: '',
    endDate: '',
    status: 'Ongoing',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTraining = { ...form, id: trainings.length + 1 };
    setTrainings([newTraining, ...trainings]);
    setForm({
      employee: '',
      training: '',
      issuedBy: '',
      startDate: '',
      endDate: '',
      status: 'Ongoing',
    });
  };

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-xl">
      <span className="mx-2 text-xl font-bold dark:text-white">Training & Certification Tracking</span>
      <hr className="mx-2 my-2 border border-gray-300 dark:border-gray-700" />

      {/* Tabs */}
      <div className="flex space-x-2 mx-2 my-3">
        <button
          className={`px-4 py-1 rounded-lg font-medium ${activeTab === 'Add' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          onClick={() => setActiveTab('Add')}
        >
          Add Training
        </button>
        <button
          className={`px-4 py-1 rounded-lg font-medium ${activeTab === 'List' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          onClick={() => setActiveTab('List')}
        >
          Training List
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'Add' && (
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
            <input
              type="text"
              name="employee"
              value={form.employee}
              onChange={handleChange}
              placeholder="Employee Name"
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="training"
              value={form.training}
              onChange={handleChange}
              placeholder="Training / Certification Name"
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="issuedBy"
              value={form.issuedBy}
              onChange={handleChange}
              placeholder="Issued By"
              className="p-2 border rounded"
              required
            />
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Expired">Expired</option>
            </select>
            <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 md:col-span-2">
              Add Training
            </button>
          </form>
        </div>
      )}

      {activeTab === 'List' && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Employee</th>
                <th className="px-4 py-2">Training</th>
                <th className="px-4 py-2">Issued By</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">End Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {trainings.map((t) => (
                <tr key={t.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                  <td className="px-4 py-2">{t.id}</td>
                  <td className="px-4 py-2">{t.employee}</td>
                  <td className="px-4 py-2">{t.training}</td>
                  <td className="px-4 py-2">{t.issuedBy}</td>
                  <td className="px-4 py-2">{t.startDate}</td>
                  <td className="px-4 py-2">{t.endDate}</td>
                  <td className={`px-4 py-2 font-medium ${t.status === 'Completed' ? 'text-green-600' : t.status === 'Expired' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {t.status}
                  </td>
                </tr>
              ))}
              {trainings.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No training records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrainingCertDashboard;
