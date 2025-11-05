import React, { useState } from 'react';

const EmployeeProfileDashboard = ({ employee }) => {
  // If no employee is passed, use a dummy default
  const [emp] = useState(employee || {
    name: 'John Doe',
    photo: 'https://via.placeholder.com/150',
    email: 'john.doe@example.com',
    phone: '+977 9800000000',
    department: 'Nursing',
    position: 'Senior Nurse',
    location: 'Samakhusi, Kathmandu',
    shift: 'Day',
    salary: 'NRs 50,000',
    performance: 'Good',
    holidaysTaken: 5,
  });

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 h-[90vh] overflow-y-scroll no-scrollbar rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Employee Profile</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Panel: Photo & Basic Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full md:w-1/3 flex flex-col items-center text-center">
          <img
            src={emp.photo}
            alt={emp.name}
            className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{emp.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{emp.position}</p>
          <p className="text-gray-500 dark:text-gray-400">{emp.department}</p>
          <p className="text-gray-500 dark:text-gray-400">{emp.location}</p>
        </div>

        {/* Right Panel: Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Email:</span> {emp.email}</p>
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Phone:</span> {emp.phone}</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Position:</span> {emp.position}</p>
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Department:</span> {emp.department}</p>
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Shift:</span> {emp.shift}</p>
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Location:</span> {emp.location}</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Financial & Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-lg p-2 text-center font-medium">
              Salary <br /> {emp.salary}
            </div>
            <div className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-lg p-2 text-center font-medium">
              Performance <br /> {emp.performance}
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 rounded-lg p-2 text-center font-medium">
              Holidays Taken <br /> {emp.holidaysTaken}
            </div>
          </div>
        </div>
      </div>
      {/* Second Row */}
      <div className="bg-white dark:bg-gray-800 rounded-xl mt-4 shadow p-4 flex-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Salary Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Email:</span> {emp.email}</p>
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Phone:</span> {emp.phone}</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Position:</span> {emp.position}</p>
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Department:</span> {emp.department}</p>
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Shift:</span> {emp.shift}</p>
            <p><span className="font-medium text-gray-600 dark:text-gray-300">Location:</span> {emp.location}</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Financial & Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-lg p-2 text-center font-medium">
              Salary <br /> {emp.salary}
            </div>
            <div className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-lg p-2 text-center font-medium">
              Performance <br /> {emp.performance}
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 rounded-lg p-2 text-center font-medium">
              Holidays Taken <br /> {emp.holidaysTaken}
            </div>
          </div>
        </div>
    </div>
  );
};

export default EmployeeProfileDashboard;
