import React from 'react'

const PaymentHistory = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll  no-scrollbar bg-[#EAEBF4]  ">

        <div>
            <h3 className="mb-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">Payout History</h3>
        </div>
       
        <div className="p-6 col-span-2  border  rounded-lg shadow-sm bg-white dark:bg-[#202528] dark:border-black dark:text-white border-gray-200">
                 <p className='text-md font-bold mb-5'>2081 (Baisakh)</p>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:text-white">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                    <thead className="text-sm text-gray-900 uppercase dark:bg-[#202528] dark:border-black dark:text-white bg-gray-50 ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Staff name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Advanced Payment
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Salary
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Duty Location
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Attendanace
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Dress
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Voucher
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
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
                                                18500
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
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
                                                18500
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
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
                                                18500
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
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
                                                18500
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                            </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>

                            
        </div>


        

    </div>
  )
}

export default PaymentHistory