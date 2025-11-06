import React, { useState } from "react";

const NotificationCenter = () => {
  // Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", message: "New visitor registered: John Doe", read: false },
    { id: 2, type: "success", message: "Visitor Jane Smith qualified physical test", read: false },
    { id: 3, type: "warning", message: "Training fee pending for Mike Taylor", read: true },
    { id: 4, type: "error", message: "System error: Unable to sync data", read: false },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getBgColor = (type) => {
    switch (type) {
      case "info":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case "success":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "error":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-[#212528] rounded-xl shadow-xl space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white">Notification Center</h2>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Mark All as Read
        </button>
      </div>

      <div className="max-h-[500px] overflow-y-auto space-y-3">
        {notifications.length === 0 && (
          <p className="text-center dark:text-gray-300">No notifications</p>
        )}
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${
              notif.read ? "opacity-60" : "opacity-100"
            } ${getBgColor(notif.type)}`}
          >
            <div>
              <p className="font-medium">{notif.message}</p>
              {!notif.read && <span className="text-xs text-gray-500 dark:text-gray-400">New</span>}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
                  )
                }
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Mark Read
              </button>
              <button
                onClick={() => deleteNotification(notif.id)}
                className="px-2 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
