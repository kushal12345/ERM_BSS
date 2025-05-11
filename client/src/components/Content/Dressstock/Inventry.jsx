import React from 'react'

const Inventry = ( { data={data},isCheckedad={isCheckedad},handleCheckboxClickad={handleCheckboxClickad}} ) => {
  return (
    <div className='py-5'>
                  

        <div className='grid grid-cols-3 gap-4 mx-6 my-3'>

            <div className="relative col-span-1 shadow-md sm:rounded-lg">
                    <span className='mx-6 font-bold text-xl dark:text-white'>Current Dress Stock</span>
                    <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
                    <table className="min-w-full text-sm text-left table-fixed rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='text-center align-middle'>
                                <th scope="col" className="w-1/10">ID</th>
                                <th scope="col" className="w-3/10">Dress Type</th>
                                <th scope="col" className="w-2/10">Numbers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((datas, index) => (
                                <tr key={index} className={`text-center  text-white align-middle bg-[#4aacff] dark:border-gray-700 border-gray-200`}>
                                    <th scope="row" className="px-2 py-1  font-medium  whitespace-nowrap dark:text-white">{index + 1}</th>
                                    <td className="px-2 py-1 font-medium  whitespace-nowrap dark:text-white">Jackets </td>
                                    <td className="px-0 py-1 font-medium  whitespace-nowrap dark:text-white">15</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
            </div> 

            <div className='col-span-2'>
                    <span className='mx-6 font-bold text-xl dark:text-white'>Buy History</span>
                    <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
                    <table className="min-w-full text-sm text-left table-fixed rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='text-center align-middle'>
                                <th scope="col" className="w-1/10">Date</th>
                                <th scope="col" className="w-1/10">Vendor</th>
                                <th scope="col" className="w-3/10">Dress Type</th>
                                <th scope="col" className="w-2/10">Unit Price</th>
                                <th scope="col" className="w-2/10">Quantity</th>
                                <th scope="col" className="w-2/10">Total Amount</th>
                                <th scope="col" className="w-2/10">Bill</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((datas, index) => (
                                <tr key={index} className={`text-center align-middle ${isCheckedad[index] ? "bg-green-400" : "bg-red-400"} dark:border-gray-700 border-gray-200`}>
                                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">2080/12/14</th>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Keshar </td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">Jackets</td>
                                    <th scope="row" className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">800</th>
                                    <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">50</td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">40000</td>
                                    <td className="px-0 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"><span className='text-blue-900'>View</span></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
            </div>
        </div>

        <div className='pt-5'>
            <span className='mx-6 font-bold text-xl dark:text-white'>Price of dress</span>
            <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
            <table className="min-w-full text-sm text-left table-fixed rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-center align-middle'>
                        <th scope="col" className="w-1/10">ID</th>
                        <th scope="col" className="w-3/10">Dress Type</th>
                        <th scope="col" className="w-2/10">Numbers</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((datas, index) => (
                        <tr key={index} className={`text-center  text-white align-middle bg-[#4aacff] dark:border-gray-700 border-gray-200`}>
                            <th scope="row" className="px-2 py-1  font-medium  whitespace-nowrap dark:text-white">{index + 1}</th>
                            <td className="px-2 py-1 font-medium  whitespace-nowrap dark:text-white">Jackets </td>
                            <td className="px-0 py-1 font-medium  whitespace-nowrap dark:text-white">15</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

        
    </div>
  )
}

export default Inventry