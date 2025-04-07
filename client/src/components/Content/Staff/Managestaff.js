import React, { useEffect, useState } from 'react';
import { fetchstaff } from '../../Fetch/Fetchstaff';

    

const Managestaff = () => {
    let [data,setdata] = useState(null);
    const [active,setactive] = useState(null);
    
    useEffect(() => {
        fetchstaff(setdata);
    }, []);
   
  
  return (
    <div className="w-full">
        <span className='mx-6 font-bold text-xl dark:text-white'>Manage Your Staff</span>
            <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
            
                            
            <form class="max-w-md my-4 mx-auto">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Staffs" required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>


                

                <div class="inline-flex rounded-md shadow-xs" role="group">
                    <button type="button" onClick={()=>setactive("Active")} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                        Active Staffs
                    </button>
            
                    <button type="button" onClick={()=>setactive("Terminated")} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                        Terminated Staffs
                    </button>
                </div>

                {active === "Active" ? (
                    // Render Active Staffs
                    <div className=' mt-6'>
                        {/*  1st row */}
                    <div className=' mt-6'>
                                    <span className='mx-6 font-bold text-xl dark:text-white'>Active Staffs</span>
                                    <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
                    </div>

                            <div className=" w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Full Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Duty Location
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Position
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Access to login?
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        More Details
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Terminate
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((datas,index)=>(
                                      
                                    <tr  key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {datas.Fname} {datas.Mname?datas.Mname:""} {datas.Lname} 
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {datas.phno}
                                    </td>
                                    <td className="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <b> Garima Bank</b><br/> Machhapokhari-16, Kathmandu
                                    </td>
                                    <td className="py-4">
                                        <select className='border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white' required>
                                            <option value="">None</option>
                                            <option value="securityguard">Security Guard</option>
                                            <option value="manager">Manager</option>
                                            <option value="finance">Finance</option>
                                            <option value="ceo">CEO</option>
                                        </select>
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                        <select className='border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white' required>
                                            <option value="">None</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>

                                    </td>

                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</a>
                                    </td>

                                    <td className="px-6 py-4">
                                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Terminate</button>
                                    </td>
                                </tr>
                                
                            ))}
                           </tbody>
                        </table>
                    </div>
                    <br />
                    </div>
                ) : active === "Terminated" ? (
                    // Render Terminated Staffs
                    <div className=' mt-6'>
                    {/*  2nd row */}
                    <div className=' mt-6'>
                                    <span className='mx-6 font-bold text-xl dark:text-white'>Terminated Staffs</span>
                                    <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
                    </div>
            
                    <div className=" w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Full Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Duty Location
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Position
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Access to login?
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        More Details
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Re-Hire
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Jane Cooper
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        123456
                                    </td>
                                    <td className="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                       <b>Nurse City </b><br/> Samakhusi, Kathmandu
                                    </td>
                                    <td className="py-4">
                                        <select className='border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white' required>
                                            <option value="">None</option>
                                            <option value="securityguard">Security Guard</option>
                                            <option value="manager">Manager</option>
                                            <option value="finance">Finance</option>
                                            <option value="ceo">CEO</option>
                                        </select>
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                        <select className='border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 dark:text-white' required>
                                            <option value="">None</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>

                                    </td>

                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</a>
                                    </td>

                                    <td className="px-6 py-4">
                                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Hire Again?</button>
                                    </td>
                                </tr>
                                
                            
                            </tbody>
                        </table>

                        
                    </div>
                    </div>
                ) : null}

                    
                    
                    
    </div>
  )
}

export default Managestaff