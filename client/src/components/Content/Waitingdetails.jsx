import React,{useState} from 'react';
import Modalhire from './Waitingaccept';

const Modaldetails = ({ show, onClose, employee, setSelectedEmployee ,setIsHiring }) => {

  const [showModal, setShowModal] = useState(false);
  const [data,setdata] = useState(false);
  
  if (!show) return null;



  const handleData =(emp) => {
    setIsHiring(true);
    setSelectedEmployee(emp);
    console.log(emp);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Employee Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">✖</button>
        </div>
        <div className=''>
          {
            Array.isArray(employee) && employee.map((employee, index) => (
                <div key={index} className="mb-4 overflow-y-scroll max-h-72">
                   <div className="space-y-2 text-gray-800 dark:text-white">
                        <p><strong>Full Name:</strong> {employee.Fname} {employee.Mname} {employee.Lname}</p>
                        <p><strong>Phone:</strong> {employee.phno}</p>
                        <p><strong>Father's Name:</strong> {employee.fathname}</p>
                        <p><strong>Mother's Name:</strong> {employee.mothname}</p>
                        <p><strong>Grandfather's Name:</strong> {employee.grandfathname}</p>
                        <p><strong>Marital Status:</strong> {employee.marrital}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Gender:</strong> {employee.gender}</p>
                        <p><strong>Education:</strong> {employee.edu}</p>
                        <p><strong>Citizenship No:</strong> {employee.docno}</p>
                        <p><strong>Issued District:</strong> {employee.IssueDistrict}</p>
                        <p><strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
                        <p><strong>Permanent Address:</strong> {employee.PerTol}, {employee.PerMun}, {employee.PerDist}, State {employee.PerState}</p>
                        <p><strong>Temporary Address:</strong> {employee.TempTol}, {employee.TempMun}, {employee.TempDist}, State {employee.TempState}</p>
                    </div> 
                    <button onClick={() => handleData(employee)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Hire</button>
                </div>
                
          
          ))}

        </div>
      </div>
    </div>
  );
};

export default Modaldetails;
