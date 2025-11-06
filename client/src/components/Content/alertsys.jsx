import React, { useState } from "react";

const AlertSystem = () => {
  const alertTypes = ["Info", "Warning", "Critical"];

  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "Info",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAlert = (e) => {
    e.preventDefault();
    const newAlert = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toLocaleString(),
      status: "Unread",
    };
    setAlerts((prev) => [newAlert, ...prev]);
    setFormData({ title: "", message: "", type: "Info" });
  };

  const markAsRead = (id) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, status: "Read" } : alert))
    );
  };

  const deleteAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-[#212528] rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold dark:text-white text-center mb-4">Alert System</h2>

      {/* Add Alert Form */}
      <div className="p-6 bg-gray-50 dark:bg-[#1f2226] rounded-xl shadow-md">
        <form onSubmit={handleAddAlert} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Alert Title"
            required
            className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
          />
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
          >
            {alertTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Alert
          </button>
        </form>
      </div>

      {/* Alerts Table */}
      <div className="overflow-auto max-h-[500px] mt-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Timestamp</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 dark:text-gray-300">
                  No alerts created yet.
                </td>
              </tr>
            ) : (
              alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">{alert.title}</td>
                  <td className="px-4 py-2">{alert.message}</td>
                  <td className="px-4 py-2 font-semibold
                    {alert.type === 'Info' ? 'text-blue-600 dark:text-blue-400' : 
                     alert.type === 'Warning' ? 'text-yellow-500 dark:text-yellow-400' :
                     'text-red-600 dark:text-red-400'}
                  ">{alert.type}</td>
                  <td className="px-4 py-2">{alert.timestamp}</td>
                  <td className={`px-4 py-2 font-semibold ${alert.status === 'Unread' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {alert.status}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {alert.status === "Unread" && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertSystem;
