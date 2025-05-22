import React from 'react'

const DashboardMain = () => {
  return (
    <div>
             <div className="w-full pt-5 h-screen  bg-[#F5F6FA] dark:bg-[#212528] no-scrollbar">
                <span className='mx-6 font-bold text-xl  dark:text-white'>Dashboard</span>
                    {/*  1st row */}
                    <div className="grid grid-cols-4 gap-4 m-4">
                       
                    <div className="max-w-sm p-6 border rounded-lg  bg-white dark:bg-[#202528] dark:border-black dark:text-white border-gray-200 grid grid-rows-3 ">
                                <div className=''>
                                    <h2 className="font-bold  text-green-700 flex justify-center"> Net Profit</h2>
                                </div>

                                <div className='flex flex-wrap'>
                                    <span className='w-full text-xl text-left'>
                                    <b>NRS 3,00,000</b>
                                    </span>
                                    <br/>
                                    <span className='w-full text-sm text-left text-gray-500 dark:text-gray-400 font-bold'>
                                        Month: Mangsir
                                    </span>
                                </div>

                                <div className="flex  justify-center">
                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm mt-1 px-2 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View More</button>
                                </div>

                    </div>

                            <div className="max-w-sm p-6 border  rounded-lg bg-white dark:bg-[#202528] dark:border-black dark:text-white border-gray-200 grid grid-rows-3 ">
                                <div>
                                    <h2 className="font-bold text-yellow-700 flex justify-center">Unreceived Payment</h2>
                                </div>

                                 <div className='flex flex-wrap'>
                                    <span className='w-full text-xl text-left'>
                                    <b>NRS 13,00,000</b>
                                    </span>
                                    <br/>
                                    <span className='w-full text-sm text-left text-gray-500 dark:text-gray-400 font-bold'>
                                        Month: Mangsir
                                    </span>
                                </div>

                                <div className="flex justify-center">
                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm mt-1 px-2 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View More</button>
                                </div>                                
                            
                            </div>
                            <div className="max-w-sm p-6 border  rounded-lg bg-white dark:bg-[#202528] dark:border-black dark:text-white border-gray-200 grid grid-rows-3 ">
                                <div>
                                    <h2 className="font-bold text-blue-700 flex justify-center">Message</h2>
                                </div>

                                <div>
                                    <span>
                                        <b>From:</b> Chinkaji Kumal
                                    </span>
                                    <br/>
                                    <span>
                                        <b>Message:</b> Advanced
                                    </span>
                                </div>

                                <div className="flex justify-center">
                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm mt-1 px-2 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View More</button>
                                </div>                                
                            
                            </div>

                            
                            <div className="max-w-sm p-6 border  rounded-lg bg-white dark:bg-[#202528] dark:border-black dark:text-white border-gray-200 grid grid-rows-3 ">
                                <div>
                                    <h2 className="font-bold text-red-700 flex justify-center">Emergency Event</h2>
                                </div>

                                <div>
                                    <span>
                                        Guard Replacement
                                    </span>
                                    <br/>
                                    <span>
                                        <b>Location:</b> Yak and Yeti
                                    </span>
                                </div>

                                <div className="flex justify-center">
                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm mt-1 px-2 py-1 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View More</button>
                                </div>                                
                            
                            </div>
                        
                    </div>

                    <span className="font-bold text-xl p-5 dark:text-white">Finance Section</span>
                {/* */}
                <div className="grid grid-cols-3 gap-4 m-4 ">
                       
                        <div className="p-6 col-span-2  border  rounded-lg shadow-sm bg-white dark:bg-[#202528] dark:border-black dark:text-white border-gray-200">
                            <div>
                                    <h3 className="mb-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">Payout History</h3>
                            </div>

                                

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:text-white">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                    <thead className="text-xs text-gray-700 uppercase dark:bg-[#202528] dark:border-black dark:text-white bg-gray-50 ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Staff name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Months
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Salary
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Submitted Dress
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Ram Sapkota
                                            </th>
                                            <td className="px-6 py-4">
                                                Kartik
                                            </td>
                                            <td className="px-6 py-4">
                                                18500
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Ram Sapkota
                                            </th>
                                            <td className="px-6 py-4">
                                                Kartik
                                            </td>
                                            <td className="px-6 py-4">
                                                18500
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Ram Sapkota
                                            </th>
                                            <td className="px-6 py-4">
                                                Kartik
                                            </td>
                                            <td className="px-6 py-4">
                                                18500
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  dark:text-white">
                                                Ram Sapkota
                                            </th>
                                            <td className="px-6 py-4">
                                                Kartik
                                            </td>
                                            <td className="px-6 py-4">
                                                18500
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>

                            
                            </div>

                           
                            <div className=" p-6 border border-gray-200 rounded-lg shadow-sm bg-white dark:bg-[#202528] dark:border-black dark:text-white border-gray-200  grid grid-rows-5">
                                <div>
                                    <h3 className="mb-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">Messages</h3>
                                </div>

                                <div>
                                    <b>From: Chinkaji</b>
                                </div>

                                <div>
                                    <ul>
                                        <li>Ram Sapkota 3000</li>
                                        <li>Narayan Limbu 10000</li>
                                    </ul>
                                </div>

                                <div className="mt-3">
                                    <b>From: Prem Luitel</b>
                                </div>

                                <div>
                                    <ul>
                                        <li>Ram Sapkota 3000</li>
                                        <li>Narayan Limbu 10000</li>
                                    </ul>
                                </div>

                            
                            </div>
                        
                </div>



                {/* */}
                <div className="grid grid-cols-2 gap-4 m-4">
                    <div>

                    </div>

                    <div>

                    </div>
                </div>


                </div>
    </div>
  )
}

export default DashboardMain