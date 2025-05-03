import React from 'react'

const PayrollReports = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll  no-scrollbar bg-white  ">
        <div className="w-full h-10 mt-5 overflow-hidden">
            <h1 className="text-center text-2xl font-bold">Payroll Annual Summary Reports</h1>
        </div>
        <hr className='border-b-1 my-5 mx-3 border-blue-400 '/>
        <div className="flex-1 items-center justify-left w-full h-auto px-5 overflow-y-scroll no-scrollbar">
            <form>
                <div className=" w-full bg-white rounded-lg ">
                    <label className="text-lg font-semibold mb-2">Name:</label>
                    <select className=" mx-3  w-[24%] border border-gray-300 rounded-md mb-4">
                        <option value="">Select Name</option>
                        <option value="">Kushal</option>
                        <option value="">Kritan</option>
                        <option value="">Prem</option>
                    </select>
                </div>

                <div className=" w-full my-3 flex justify-center bg-white rounded-lg ">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Generate Report</button>
                </div>
                <div className='w-full mb-2 flex justify-between'>
                    <div>
                        <span className='font-bold text-md'>Name: Kushal Bahadur Luitel</span>                        
                    </div>

                    <div>
                        <span className='font-bold text-md'>Joined Date: 2080-Chaitra-1</span>                        
                    </div>

                    <div>
                        <span className='font-bold text-md'>Terminated: Not Yet</span>                        
                    </div>
    

                </div>
                <div className="relative border border-black overflow-x-auto shadow-md sm:rounded-lg dark:text-white">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                    <thead className="text-xs text-gray-700 uppercase dark:bg-[#202528] dark:border-black dark:text-white bg-gray-50 ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Year
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Months
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Regular Hours
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                POST
                                            </th>
                                           
                                            <th scope="col" className="px-6 py-3">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                OverTime (POST)
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                OverTime Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                SSF
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="text-gray-700">
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                2080
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Chaitra
                                            </td>
                                            <td className="px-6 py-4">
                                                12 Hours
                                            </td>
                                            <td className="px-6 py-4">
                                                Nurse City
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                18000
                                            </td>
                                            <td className="px-6 py-4">
                                                3 Hours <br/> ( Gyan Sanskar )
                                            </td>

                                            <td className="px-6 py-4">
                                                1500
                                            </td>
                                            <td className="px-6 py-4">
                                                2930
                                            </td>
                                        </tr>


                                        <tr className="text-gray-700">
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                2081
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Baisakh
                                            </td>
                                            <td className="px-6 py-4">
                                                12 Hours
                                            </td>
                                            <td className="px-6 py-4">
                                                Nurse City
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                18000
                                            </td>
                                            <td className="px-6 py-4">
                                                3 Hours <br/> ( Gyan Sanskar )
                                            </td>

                                            <td className="px-6 py-4">
                                                1500
                                            </td>
                                            <td className="px-6 py-4">
                                                2930
                                            </td>
                                        </tr>
                                        
                                       
                                    </tbody>
                                </table>
                            </div>
            </form>
        </div>        
    </div>
  )
}

export default PayrollReports