import logo from '../assets/chest.png';
import { useState } from 'react';

export function SidebarCom({setPage}) {
  
    const [dropdowns, setDropdowns] = useState({
        payout: false,
        staffClient: false,
        staff: false,
        client: false,
        admf: false,        
    });

    // Generic toggle function for dropdowns
    const toggleDropdown = (dropdown) => {
        setDropdowns((prev) => ({
            ...prev,
            [dropdown]: !prev[dropdown],
        }));
    };
    return (
        <div className="w-full h-screen overflow-y-scroll  no-scrollbar bg-[#EAEBF4]  ">     
            <button 
                data-drawer-target="sidebar-multi-level-sidebar" 
                data-drawer-toggle="sidebar-multi-level-sidebar" 
                aria-controls="sidebar-multi-level-sidebar" 
                type="button" 
                className="inline-flex items-center p-2  text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="size-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside id="sidebar-multi-level-sidebar" className="w-74 overflow-y-scroll no-scrollbar h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full overflow-y-scroll shadow-lg no-scrollbar bg-[#EAEBF4] dark:bg-[#131518] light:bg-gray-800">
                    <ul className="space-y-2  shadow-md bg-white dark:bg-[#202528] dark:border-black border-gray-200 rounded-xl  font-medium">
                        <li className='w-[100%] flex items-center justify-center'>
                            <a href="#" className="flex my-3 items-center  space-x-3 rtl:space-x-reverse">
                                <img src={logo} className="h-16" alt="Flowbite Logo" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className=" rtl:space-x-reverse">
                                <span className="self-center flex justify-center text-md font-bold whitespace-nowrap dark:text-white  w-full text-justify text-black">Bauddhanath Security </span>
                                <span className="self-center flex justify-center text-md font-bold whitespace-nowrap dark:text-white  w-full text-justify text-black">Services
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 dark:hover:bg-[#131518] light:hover:bg-gray-700 group" onClick={() => setPage('dashboard')}>
                                <svg className="size-5 text-gray-500 transition duration-75 light:text-gray-400 dark:text-white dark:hover:text-white group-hover:text-gray-900 light:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ms-3 dark:text-white">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <button 
                                type="button" 
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 light:text-white light:hover:bg-gray-700" 
                                onClick={() => toggleDropdown('payout')}
                            >
                                <svg className="shrink-0 size-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-white light:text-gray-400 light:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap dark:text-white dark:hover:text-black">Payout</span>
                                <svg className="size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${dropdowns.payout ? 'block' : 'hidden'}`}>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => setPage('Salary')}>Salary</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => setPage('AdvancePayment')}>Advance Payment</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-70 0 dark:text-white" onClick={() => setPage('Paymenthistory')}>Payment history</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={()=> setPage('PayrollReport')}>Payroll Reports</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button 
                                type="button" 
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 light:text-white light:hover:bg-gray-700" 
                                onClick={() => toggleDropdown('staffClient')}
                            >
                                <svg className="shrink-0 size-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-white light:text-gray-400 light:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .l746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap dark:text-white">Staff & Client List</span>
                                <svg className="size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            <ul className={`py-2 space-y-2 ${dropdowns.staffClient ? 'block' : 'hidden'}`}>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => {toggleDropdown('staff')}}>
                                        Staff List

                                    <svg className=" ml-3 size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
   
                                    </a>
                                        
                                        <ul className={`py-2 space-y-2 ${dropdowns.staff ? 'block' : 'hidden'}`}>
                                            <li>
                                                <a href="#" className="flex items-center w-full p-2 ml-5 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" >Staff Contracts</a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center w-full p-2 ml-5 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => setPage('managestaff')}>Manage Staffs</a>
                                            </li>
                                        </ul>
                                </li>
                                        
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => {toggleDropdown('client')}}>
                                        Client List

                                    <svg className=" ml-3 size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
   
                                    </a>
                                    <ul className={`py-2 space-y-2 ${dropdowns.client ? 'block' : 'hidden'}`}>
                                            <li>
                                                <a href="#" className="flex items-center w-full p-2 ml-5 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" >Client Contracts</a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center w-full p-2 ml-5 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => setPage('manageclient')}>Add New Client's</a>
                                            </li>
                                        </ul>

                                </li>
                            </ul>
                        </li>
                        <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group" >
                        <svg className="shrink-0 size-5 text-gray-500 transition duration-75 light:text-gray-400 dark:text-white group-hover:text-gray-900 light:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white" onClick={()=> setPage('message')}>Message</span>
                        <span className="inline-flex items-center justify-center size-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full light:bg-blue-900 dark:bg-[#131518] light:text-blue-300 dark:text-white">3</span>
                        
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group">
                        <svg className="shrink-0 size-5 text-gray-500 transition duration-75 light:text-gray-400 dark:text-white group-hover:text-gray-900 light:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white"  onClick={() => setPage('assigntask')}>Assign Task</span>
                        </a>
                        
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100  light:hover:bg-gray-700 group">
                        <svg className="shrink-0 size-5 text-gray-500 transition duration-75 light:text-gray-400 group-hover:text-gray-900  dark:text-white light:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white" onClick={() => setPage('dressstock')}>Dress Stock</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group">
                        <svg className="size-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                        </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white" onClick={() => setPage('attendance')}>Attendance</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group" onClick={() => toggleDropdown('admf')}>
                        <svg className="shrink-0 size-5 text-gray-500 transition duration-75 light:text-gray-400 dark:text-white group-hover:text-gray-900 light:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white">Forms</span>
                        <svg className="size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                        </a>
                        <ul className={`py-2 space-y-2 ${dropdowns.admf ? 'block' : 'hidden'}`}>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={()=>{setPage("NewAdmission")}}>New Admission</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={()=>{setPage("ssf")}}>SSF Forms</a>
                                </li>
                                
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => {setPage("warningpage")}}>Warning's Form</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => {setPage("holidaypage")}}>Holiday Forms</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 light:text-white light:hover:bg-gray-700 dark:text-white" onClick={() => {setPage("waitingpage")}}>Waiting List Forms</a>
                                </li>
                            </ul>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group">
                        <svg className="size-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m14 9.006h-.335a1.647 1.647 0 0 1-1.647-1.647v-1.706a1.647 1.647 0 0 1 1.647-1.647L19 12M5 12v5h1.375A1.626 1.626 0 0 0 8 15.375v-1.75A1.626 1.626 0 0 0 6.375 12H5Zm9 1.5v2a1.5 1.5 0 0 1-1.5 1.5v0a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 1 1.5-1.5v0a1.5 1.5 0 0 1 1.5 1.5Z"/>
                        </svg>


                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white">Billing</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group">
                        <svg className="size-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                        </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white">Performance/Evaluation</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group">
                        <svg className="size-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m14 9.006h-.335a1.647 1.647 0 0 1-1.647-1.647v-1.706a1.647 1.647 0 0 1 1.647-1.647L19 12M5 12v5h1.375A1.626 1.626 0 0 0 8 15.375v-1.75A1.626 1.626 0 0 0 6.375 12H5Zm9 1.5v2a1.5 1.5 0 0 1-1.5 1.5v0a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 1 1.5-1.5v0a1.5 1.5 0 0 1 1.5 1.5Z"/>
                        </svg>


                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white">Documents</span>
                        </a>
                    </li>

                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group">
                        <svg className="size-6 text-red-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.464V3.099m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C19 17.4 19 18 18.462 18H5.538C5 18 5 17.4 5 16.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.464ZM6 5 5 4M4 9H3m15-4 1-1m1 5h1M8.54 18a3.48 3.48 0 0 0 6.92 0H8.54Z"/>
                        </svg>


                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white">Incidents</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group">
                        <svg className="size-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                        </svg>


                        <span className="flex-1 ms-3 whitespace-nowrap dark:text-white">Notification</span>
                        </a>
                    </li>
                    
                    
                    </ul>
                </div>
            </aside>
        </div>
    );
}