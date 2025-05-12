import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";

const Invoiceview = ({setPage}) => {
  return (
    <div>
        <div className='grid grid-rows-2 gap-4'>
            <div className='flex justify-between'>
                <div className='flex items-center hover:cursor-pointer'>
                        <FaArrowLeftLong className='ml-6' />
                        <span className='mx-2 font-bold text-xl dark:text-white'>Invoice</span>
                </div>

                <div className='flex flex-wrap'>
                    <Button size="sm" color="light">Refresh</Button>
                    <button className='bg-[#3B82F6] text-white px-3 mx-1 py-1 rounded-lg' onClick={()=>{setPage("invoiceadd")}}>+ Add New Invoice</button>
                </div>
                
            </div>
            <hr className='mx-6 my-1 border border-gray-300 dark:border-gray-700' />
            <div className=' mx-6 my-1'>
                <div className='flex space-x-2'>
                    <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>All</button>
                    <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>Paid</button>
                    <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>Unpaid</button>
                </div>
                <div className='my-6'>
                    <table className="min-w-full text-sm text-left table-fixed rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 bg-gray-200 rounded-xl dark:bg-gray-700 dark:text-gray-400">
                            <tr className='text-center align-middle'>
                                <th scope="col" className="w-1/10">ID</th>
                                <th scope="col" className="w-3/10">Client</th>
                                <th scope="col" className="w-3/10">Post</th>
                                <th scope="col" className="w-2/10">Date</th>
                                <th scope="col" className="w-3/10">Expired Date</th>
                                <th scope="col" className="w-2/10">Total</th>
                                <th scope="col" className="w-1/10">Paid</th>
                                <th scope="col" className="w-1/10">Status</th>
                                <th scope="col" className="w-1/10">Payment</th>
                                <th scope="col" className="w-1/10">Created By</th>
                                <th scope="col" className="w-1/10"> </th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr className={`text-center align-middle  "bg-green-400"  dark:border-gray-700 border-gray-200`}>
                                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</th>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Kushal Luitel </td>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Mokshya Tech </td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">11/05/2025</td>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">11/06/2025</td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">NRS 30,000</td>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">NRS 0.00</td>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Draft</td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Unpaid</td>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Rana Bdr Luitel</td>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"><BsThreeDots/></td>
                                    
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Invoiceview