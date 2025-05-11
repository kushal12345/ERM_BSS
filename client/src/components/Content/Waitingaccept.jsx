import React from 'react';

const Modalhire = ({ show, onClose, employee,setSelectedEmployee,setIsHiring }) => {
  if (!show) return null;

  const close = () => {
    setIsHiring(false);
    setSelectedEmployee(null);
    onClose()
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Employee Details</h3>
          <button onClick={close} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">✖</button>
        </div>
        <div>
        <select name="post"  className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >Select Duty Post</option>
            <option value="NorthCity">North City Multipurpose</option>
            <option value="Gyansanskar">Gyansanskar School</option>
            <option value="Nist">Nist</option>
            <option value="Namss">Namss School</option>
        </select>
        <select name="shift"  className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >Select Shift</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
        </select>
        
        <select name="hrs"  className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >Select Hours</option>
            <option value="8">8</option>
            <option value="12">12</option>
        </select>
        <input name="salary"  className="p-2 mx-2 my-2 border border-black rounded" placeholder="Salary" required/>
        <select name="starttime"  className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >Starting Time</option>
            <option value="8">1</option>
            <option value="12">2</option>
            <option value="8">3</option>
            <option value="12">4</option>
            <option value="8">5</option>
            <option value="12">6</option>
            <option value="8">7</option>
            <option value="12">8</option>
            <option value="8">9</option>
            <option value="12">10</option>
            <option value="8">11</option>
            <option value="12">12</option>
        </select>

        <select name="startAMPM"  className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>

        <select name="endtime"  className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >Ending Time</option>
            <option value="8">1</option>
            <option value="12">2</option>
            <option value="8">3</option>
            <option value="12">4</option>
            <option value="8">5</option>
            <option value="12">6</option>
            <option value="8">7</option>
            <option value="12">8</option>
            <option value="8">9</option>
            <option value="12">10</option>
            <option value="8">11</option>
            <option value="12">12</option>
        </select>

        <select name="endAMPM"  className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>

        <input name="Dress"  className="p-2 mx-2 my-2 border border-black rounded" placeholder="Dress Price" required/>
        <input name="JoinedDate"  className="p-2 mx-2 my-2 border border-black rounded" placeholder="Joined Date" required/>

          <button onClick={onClose} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Hire</button>
        </div>
      </div>
    </div>
  );
};

export default Modalhire;
