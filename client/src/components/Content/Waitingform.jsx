import React, { useState,useEffect } from 'react';
import { fetchstaff } from '../Fetch/Fetchstaff';
import Modal from './Modal';

const Waitingform = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [data,setdata] = useState(null);

    useEffect(() => {
              fetchstaff(setdata);
          }, []);

    const employees = Array(5).fill({
        id: 1,
        name: "Kushal Luitel",
        phone: "9841449298",
        fatherName: "Prem Luitel",
        height: "5'3\"",
        weight: "53",
        permanentAddress: "Kathmandu",
        temporaryAddress: "Kathmandu"
    });

    const handleView = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

  
  return (
    <div className="py-5 px-3 bg-white dark:bg-gray-800">
      <h1 className="text-2xl my-5 font-bold text-gray-800 dark:text-white">Employee Waiting List</h1>

      <div className="relative shadow-md pt-5 sm:rounded-lg">
        <table className="min-w-full text-sm text-left table-fixed rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th className="w-1/10">ID</th>
              <th className="w-3/10">Employee Name</th>
              <th className="w-2/10">Phone No</th>
              <th className="w-3/10">Father's name</th>
              <th className="w-2/10">Height</th>
              <th className="w-1/10">Weight</th>
              <th className="w-1/10">Permanent Address</th>
              <th className="w-1/10">Temporary Address</th>
              <th className="w-1/10">Hire?</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="text-center bg-red-400 dark:border-gray-700 border-gray-200">
                <th className="px-2 py-2 text-gray-900 dark:text-white">{emp.id}</th>
                <td className="px-2 py-1 text-gray-900 dark:text-white">{emp.name}</td>
                <td className="px-0 py-1 text-gray-900 dark:text-white">{emp.phone}</td>
                <td className="px-2 py-1 text-gray-900 dark:text-white">{emp.fatherName}</td>
                <td className="px-0 py-1 text-gray-900 dark:text-white">{emp.height}</td>
                <td className="px-2 py-1 text-gray-900 dark:text-white">{emp.weight}</td>
                <td className="px-0 py-1 text-gray-900 dark:text-white">{emp.permanentAddress}</td>
                <td className="px-2 py-1 text-gray-900 dark:text-white">{emp.temporaryAddress}</td>
                <td className="px-0 py-1 text-blue-600 cursor-pointer" onClick={() => handleView(data)}>View</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} employee={data} />
    </div>
  );
};

export default Waitingform;
