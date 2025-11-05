import React,{useState,useEffect} from 'react'
import { fetchstaff } from "../../Fetch/Fetchstaff";
import { fetchClient } from '../../Fetch/FetchClient';
const AssignTask = () => {

       const [isCheckedad, setIsCheckedad] = useState([]);
        let [data,setdata] = useState(null);
        let [clientData,setClientData] = useState(null);
        
        useEffect(() => {
                fetchstaff(setdata,"all");
                fetchClient(setClientData);
            }, []);
           
        const handleCheckboxClickad = (index) => {
            setIsCheckedad((prev) => {
                const newCheckedState = [...prev];
                newCheckedState[index] = !newCheckedState[index]; // Toggle the checkbox state for the specific index
                return newCheckedState;
            });
        };

  return (
    <div className="w-full h-full p-3 overflow-hidden bg-[#fff] dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
    <span className='mx-6 font-bold text-xl dark:text-white'>Assign Task</span>
    <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
    

    <div className="max-w-full h-[80%] overflow-x-auto">
        <div className="relative shadow-md sm:rounded-lg">
            <table className="min-w-full text-sm text-left table-fixed rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-center align-middle'>
                        <th scope="col" className="w-1/10">ID</th>
                        <th scope="col" className="w-3/10">Employee Name</th>
                        <th scope="col" className="w-2/10">Phone No</th>
                        <th scope="col" className="w-3/10">Post</th>
                        <th scope="col" className="w-3/10">Salary</th>
                        <th scope="col" className="w-3/10">Location</th>
                        <th scope="col" className="w-2/10">Job Type</th>
                        <th scope="col" className="w-1/10">Shift</th>
                        <th scope="col" className="w-1/10">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((datas, index) => (
                        <tr key={index} className={`text-center align-middle ${isCheckedad[index] ? "bg-green-400" : "bg-red-400"} dark:border-gray-700 border-gray-200`}>
                            <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                            <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{datas.Fname?datas.Fname:""} {datas.Mname?datas.Mname:""} {datas.Lname?datas.Lname:""} </td>
                            <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{datas.phno?datas.phno:""}</td>
                            <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <select className='h-8 w-44 border border-gray-300 px-2 py-1 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white' required>
                                            <option value="">None</option>
                                            {clientData && clientData.map((client, index) => (
                                                <option key={index} value={client.Oname}>{client.Oname}</option>
                                            ))}
                                </select>
                            </td>
                            <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"> 
                                <select className='h-8 w-32 border border-gray-300 px-2 py-1 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white' required>
                                            <option value="">None</option>
                                            <option value="securityguard">Securitiy Guard</option>
                                            <option value="manager">Manager</option>
                                            <option value="finance">Finance</option>
                                            <option value="receptionist">Receptionist</option>
                                            <option value="ceo">CEO</option>
                                        </select>
                            </td>
                            <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Day</td>
                            <td className="px-2 py-1">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="peer sr-only" checked={isCheckedad[index]} onClick={() => handleCheckboxClickad(index)} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default AssignTask