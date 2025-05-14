import React from 'react'

const PerformanceandEval = () => {
  return (
    <div className="w-full h-full p-3 pt-5 overflow-hidden bg-[#fff] dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
         <span className='mx-6 font-bold text-xl dark:text-white'>Performance and Evaluation</span>
            <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
            <div className='flex justify-between mx-6 my-3'>
                <div className='flex space-x-2'>
                    <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>Good</button>
                    <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>Better</button>
                    <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>Worst</button>
                </div>
                <div>
                    <input type='text' placeholder='Search' className='border border-gray-300 dark:border-gray-700 rounded-lg p-1' />
                </div>
            </div>

            <div className="max-w-full h-[80%] overflow-x-auto">
                <div className="relative shadow-md sm:rounded-lg">
                    <table className="min-w-full text-sm text-left table-fixed rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='text-center align-middle'>
                                <th scope="col" className="w-1/10">ID</th>
                                <th scope="col" className="w-3/10">Employee Name</th>
                                <th scope="col" className="w-2/10">Phone No</th>
                                <th scope="col" className="w-3/10">Post</th>
                                <th scope="col" className="w-2/10">Terminated</th>
                                <th scope="col" className="w-1/10">Shift</th>
                                <th scope="col" className="w-1/10">Remark</th>
                                <th scope="col" className="w-1/10">Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr  className={`text-center align-middle bg-green-400 dark:border-gray-700 border-gray-200`}>
                                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</th>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"> asdasd</td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">asd</td>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Nurse City, Samakhusi</td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">No</td>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Day</td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <ul>
                                            <li>1. smoking on Duty</li>
                                            <li>2. Drinking alcohol</li>
                                        </ul>
                                    </td>

                                    <td className="px-2 py-1">
                                        <select className='h-8 w-18 p-1 border border-gray-300 rounded-lg'>
                                            <option value="Good">Good</option>
                                            <option value="Better">Better</option>
                                            <option value="Worst">Worst</option>
                                        </select>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
  )
}

export default PerformanceandEval