import React from 'react'

const Ssf = () => {
  return (
    <div>
            <div className='w-full flex justify-center items-center'>
                <span className='font-bold my-3 text-xl '>SSF Forms</span>
            </div>

            

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SSF ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                POST
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Letter for SSF <br/>
                                Download
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Download ID
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Jane Cooper
                            </th>
                            <td className="px-6 py-4">
                                123456
                            </td>
                            <td className="px-6 py-4">
                                Manager
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Download</a>
                            </td>
                            <td className="px-6 py-4">
                                 <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Download</a>
                            </td>
                        </tr>
                        
                       
                    </tbody>
                </table>

                <div className='w-full my-4 flex justify-center items-center'>
                <div className='flex gap-4'>    
                    <div>
                        <input type="text" id="Fnamessf" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Full Name" required />
                    </div>

                    <div>
                        <input type="text" id="ssfid" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="SSF ID" required />
                    </div>
        
                    <div>
                        <input type="Lname" id="postssf" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="POST" required />
                    </div>

                    <div>
                        <input type="file" id="reportssf" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                    </div>

                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Submit</button>
                    </div>
                </div>
            </div>
            </div>
            
    </div>
  )
}

export default Ssf