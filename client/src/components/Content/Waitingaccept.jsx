import React,{useState,useEffect} from 'react';
import { fetchClient } from '../Fetch/FetchClient';
import api from '../../utils/api.js';

const Modalhire = ({ show, onClose, employee,setSelectedEmployee,setIsHiring }) => {
  
  const [data, setData] = useState(null);

  const [active, setactive] = useState(false);
  
  const [user, setUser] = useState({
    post: '',
    shift: '',
    hrs: '',
    salary: '',
    starttime: '',
    startAMPM: '',
    endtime: '',
    endAMPM: '',
    Dress: '',
    JoinedDate: ''
  });
  
  useEffect(() => {
    fetchClient(setData);
  }, []);

  if (!show) return null;

  const close = () => {
    setIsHiring(false);
    setSelectedEmployee(null);
    onClose()
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('employeeId', employee._id);
    formData.append('post', user.post);
    formData.append('shift', user.shift);
    formData.append('hrs', user.hrs);
    formData.append('salary', user.salary);
    formData.append('starttime', user.starttime);
    formData.append('startAMPM', user.startAMPM);
    formData.append('endtime', user.endtime);
    formData.append('endAMPM', user.endAMPM);
    formData.append('Dress', user.Dress);
    formData.append('JoinedDate', user.JoinedDate);

    try {
      const response = await api.post('/api/hire',formData,{
        headers: {
                    'Content-Type': 'multipart/form-data'
                }
      });
      console.log('Response:', response);
      if (response.status === 201) {
        const result = response.data.data;
        console.log('Hire successful:', result);
        close();
      } else {
        console.error('Hire failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during hire:', error);
    }
  }
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Employee Details</h3>
          <button onClick={close} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">✖</button>
        </div>
        <div>

        <form onSubmit={handleSubmit} encType='multipart/form-data'>

        <select name="post"  value={user.post} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >Select Duty Post</option>
            {data && data.map((client, index) => (
              <option key={index} value={client.Oname}>{client.Oname}</option>
            ))} 
        </select>
        <select name="shift"  value={user.shift} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
            <option value="" >Select Shift</option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
        </select>


        <select name="jobtype"  value={user.jobtype} onChange={handleChange} className="p-2 w-[80%] mx-2 my-2 border rounded" required>
            <option value="" >Select Job Type</option>
            <option value="securityguard">Security Guard</option>
            <option value="manager">Manager</option>
            <option value="finance">Finance</option>
            <option value="receptionist">Receptionist</option>
            <option value="ceo">CEO</option>
        </select>
          <hr className='mx-2 my-4 border border-gray-300 dark:border-gray-600'/>

          <div class="inline-flex rounded-md shadow-xs" role="group">
                        <button type="button" onClick={()=>setactive("daily")} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            Daily
                        </button>

                        <button type="button" onClick={()=>setactive("overtime")} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            Overtime
                        </button>
                    </div>
    
            {
            active === "overtime" ? 
            <div className='my-3'>
              <p>Overtime</p>
              
              <input name="salary"  value={user.salary} onChange={handleChange} className="p-2 w-[80%] mx-2 my-2 border border-black rounded" placeholder="Salary" required/>
              <select name="starttime"  value={user.starttime} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                  <option value="" >Starting Time</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>

              <select name="startAMPM" value={user.startAMPM} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                  <option value="" >AM/PM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
              </select>

              <select name="endtime"  value={user.endtime} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                  <option value="" >Ending Time</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>

              <select name="endAMPM" value={user.endAMPM} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                  <option value="" >AM/PM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
              </select>
            </div>
            :
              <div className='my-3'>
                <p className='mx-3'>Daily</p>


                <select name="hrs"  value={user.hrs} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                    <option value="" >Select Hours</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                </select>
                <input name="salary"  value={user.salary} onChange={handleChange} className="p-2 mx-2 my-2 border border-black rounded" placeholder="Salary" required/>
                <select name="starttime"  value={user.starttime} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                    <option value="" >Starting Time</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>

                <select name="startAMPM" value={user.startAMPM} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                    <option value="" >AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>

                <select name="endtime"  value={user.endtime} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                    <option value="" >Ending Time</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>

                <select name="endAMPM" value={user.endAMPM} onChange={handleChange} className="p-2 mx-2 my-2 border rounded" required>
                    <option value="" >AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>

              </div>
            }
           


       <hr className='mx-2 my-4 border border-gray-300 dark:border-gray-600'/>
        
        <input name="Dress" value={user.Dress} onChange={handleChange} className="p-2 mx-2 my-2 border border-black rounded" placeholder="Dress Price" required/>
        <input name="JoinedDate" value={user.JoinedDate} onChange={handleChange} className="p-2 mx-2 my-2 border border-black rounded" placeholder="Joined Date" required/>

          <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Hire</button> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modalhire;
