import React from 'react'
import { FaFolderOpen } from "react-icons/fa";

const Documents = () => {
  return (
    <div className="w-full h-full p-3 pt-5 overflow-hidden bg-[#fff] dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
        <span className='mx-6 font-bold text-xl dark:text-white'>Documents</span>
        <hr className='mx-6 my-2 border border-gray-300  dark:border-gray-700' />
        <div className='flex  justify-between mx-6 my-3'>
            <div className='flex space-x-2'>
                <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>All</button>
                <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>Pending</button>
                <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'>Approved</button>
            </div>
            <div>
                <input type='text' placeholder='Search' className='border border-gray-300 dark:border-gray-700 rounded-lg p-1' />
            </div>
        </div>

        

        <div className="max-w-full h-[80%] pt-4 overflow-x-auto">
            <div className='grid grid-cols-8  gap-4'>
                {Array(8).fill(0).map((_, index) => (
                    <div key={index} className='aspect-square flex flex-wrap items-center justify-center rounded-lg p-4 hover:bg-gray-300 dark:hover:bg-gray-300 cursor-pointer'>
                        <div key={index} className='aspect-square rounded-lg p-4 '>
                            <FaFolderOpen color='blue' className='text-5xl text-gray-400 dark:text-gray-400' />
                        </div>
                        <span className='dark:text-white'>Folder</span>    
                    </div>
                ))}
            </div>

        </div>        
    </div>
  )
}

export default Documents