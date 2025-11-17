import React from 'react'
import { Button } from "flowbite-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Datepicker } from "flowbite-react";
import { Select } from "flowbite-react";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const InvoiceAdd = ({setPage}) => {
  return (
    <div>
         <div className='grid grid-rows-2 gap-4'>
            <div className='flex justify-between'>
                <div className='flex items-center hover:cursor-pointer' >
                    <FaArrowLeftLong className='ml-6 ' onClick={() => setPage("invoiceview")}  />
                    <span className='mx-2 font-bold text-xl dark:text-white'>New</span>
                </div>

                <div className='flex flex-wrap'>
                    <Button size="sm" color="light">Clear</Button>
                    <Button className='bg-[#3B82F6] mx-3 text-lg text-white' size="sm" onClick={()=>{setPage("invoiceadd")}}>+ Save</Button>
                </div>
                
            </div>
            <hr className='mx-6 my-1 border border-gray-300 dark:border-gray-700' />
            <div className=' mx-6 my-1 max-h-[70vh] overflow-y-scroll no-scrollbar'>
                <div className='my-6'>
                    <form>
                        <div className='grid grid-rows-3 gap-4 px-6'>
                            <div className="relative grid grid-cols-2 gap-4">
                                {/* Left Side */}
                                <div className="flex flex-col">
                                    <span className="text-5xl font-bold text-blue-600">INVOICE</span>
                                    <span className="text-xl font-bold mt-3 text-blue-600">Invoice No: #001</span>
                                    <span className="text-xl font-bold mt-3 text-blue-600">Date</span>
                                    <span className="text-sm font-bold"><Datepicker className="w-[150px] text-black" /></span>
                                    <span className="text-xl font-bold mt-3 text-blue-600">Issue Month</span>
                                    <span className="text-sm font-bold">
                                        <Select id="issue_month" className="w-[150px] text-black">
                                                <option value="" disabled>Select Month</option>
                                            {months.map((month, index) => (
                                                <option key={index}>{month}</option>
                                            ))}
                                        </Select>
                                    </span>

                                    
                                </div>

                                {/* Right Side */}
                                <div className='pl-6 flex flex-col'>
                                     <div className="flex flex-col">
                                        <span className="text-xl font-bold text-blue-600">Supplier</span>
                                        <span className="text-sm mt-1 font-bold">Bauddhanath Security Services Pvt. Ltd.</span>
                                        <span className="text-sm mt-1 font-bold">Machhapokhari-16, Kathmandu</span>
                                        <span className="text-sm mt-1 font-bold">01-4961313,9851017622</span>
                                        <span className="text-sm mt-1 font-bold">bauddhanath.services2019@gmail.com</span>
                                        <span className="text-sm mt-1 font-bold">Pan no: 600831059 </span>
                                    </div>

                                    <div className="flex flex-col mt-6">
                                        <span className="text-xl font-bold text-blue-600">Client</span>
                                        <span className="text-sm mt-1 font-bold">North City Multipurpose Pvt. Ltd.</span>
                                        <span className="text-sm mt-1 font-bold">Samakhusi, Kathmandu</span>
                                        <span className="text-sm mt-1 font-bold">01-4961313,9851017622</span>
                                        <span className="text-sm mt-1 font-bold">Pan no: 600831059 </span>
                                    </div>
                                </div>

                                {/* Vertical Line Divider */}
                                <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300"></div>
                            </div>


                            <div>
                                <table className="min-w-full mt-6 text-sm text-left table-fixed rtl:text-right text-black dark:text-gray-400">
                                    <thead className="text-md text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className='text-center border-b-4 border-blue-500 align-middle'>
                                            <th scope="col" className="w-1/10">S.N</th>
                                            <th scope="col" className="w-3/10">Item</th>
                                            <th scope="col" className="w-2/10">Description</th>
                                            <th scope="col" className="w-3/10">Quantity</th>
                                            <th scope="col" className="w-2/10">Unit Price</th>
                                            <th scope="col" className="w-1/10">VAT(13%)</th>
                                            <th scope="col" className="w-1/10">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr  className={`text-center align-middle"bg-green-400"  dark:border-gray-700 border-gray-200`}>
                                                <th scope="row" className="px-2 pt-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</th>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Security Guard</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">8 hrs per Day for 30 days</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">3</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">NRS 30,000</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">NRS 3,900</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">NRS 33,900</td>                                            
                                            </tr>

                                              <tr  className={`text-center align-middle"bg-green-400"  dark:border-gray-700 border-gray-200`}>
                                                <th scope="row" className="px-2 pt-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">2</th>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Cleaner</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">8 hrs per Day for 30 days</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">3</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">NRS 30,000</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">NRS 3,900</td>
                                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">NRS 33,900</td>                                            
                                            </tr>
                                             <tr  className={`text-center  text-lg align-middle `}>
                                                <th scope="row" className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">Discount</td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">NRS 0</td>                                            
                                            </tr>
                                            <tr  className={`text-center  text-lg align-middle `}>
                                                <th scope="row" className="px-2 pt-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">Total Exc. VAT</td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">NRS 33,900</td>                                            
                                            </tr>
                                            <tr  className={`text-center  text-lg align-middle `}>
                                                <th scope="row" className="px-2 pt-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">VAT</td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">NRS 33,900</td>                                            
                                            </tr>
                                            <tr  className={`text-center  text-lg align-middle `}>
                                                <th scope="row" className="px-2 pt-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">Total</td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">NRS 33,900</td>                                            
                                            </tr>
                                            <tr  className={`text-center  text-lg align-middle `}>
                                                <th scope="row" className="px-2 pt-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">Due Amount</td>
                                                <td className="px-2 pt-2 font-medium text-gray-900 border-b-4 border-blue-500 whitespace-nowrap dark:text-white">NRS 33,900</td>                                            
                                            </tr>
                                    </tbody>
                                </table>

                              
                            </div>

                           <div className='grid grid-rows-2 mt-6 gap-4'>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col  p-3'>
                                        <span className="text-sm mt-1 font-bold">Thank Your For Your Purchase.</span>
                                    </div>
                                    <div className='flex flex-col items-end  p-3'>
                                        <span className="text-xl font-bold text-blue-600">Payment Method</span>
                                        <span className="text-sm mt-1 font-bold">Cash</span>
                                    </div>
                                </div>

                                <div className='flex flex-col items-center p-3'>                                    
                                   <hr/>
                                    <span className="text-xl font-bold text-blue-600">Terms and Conditions</span>
                                    <span className="text-sm mt-1 font-bold">This is a computer generated invoice and does not require a signature.</span>
                                </div>
                                
                           </div>

                        </div>
                    </form>

                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default InvoiceAdd