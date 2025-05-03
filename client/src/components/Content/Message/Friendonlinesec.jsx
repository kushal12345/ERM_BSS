import React from 'react'

const Friendonlinesec = () => {
  return (
    <div>
        <div>
            {/* Online */}
            <div className="flex justify-center items-center mb-2">
                <h2 className="text-md font-bold">Online</h2>
            </div>
                <hr className="border-b-1 my-2 border-gray-900" />
                <ul className="pl-5 mb-4 space-y-2">
                <li className="text-gray-900 relative px-2 py-1 font-bold hover:text-white hover:bg-gray-400 hover:rounded-lg cursor-pointer">
                <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-green-500 shadow-[0_4px_10px_rgba(34,197,94,1)] bg-green-300"></span>
                Colleague 1
                </li>
                <li className="text-gray-900 relative px-2 py-1 font-bold hover:text-white hover:bg-gray-400 hover:rounded-lg cursor-pointer">
                <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-green-500 bg-green-300 shadow-[0_4px_10px_rgba(34,197,94,1)]"></span>
                Colleague 2
                </li>
                <li className="text-gray-900 relative px-2 py-1 font-bold hover:text-white hover:bg-gray-400 hover:rounded-lg cursor-pointer">
                <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-green-500 shadow-[0_4px_10px_rgba(34,197,94,1)] bg-green-300"></span>
                Colleague 3
                </li>
                </ul>
        </div>
        {/* Offline */}
        <div>
        <div className="flex justify-center items-center mb-2">
            <h2 className="text-md font-bold">Offline</h2>
        </div>
            <hr className="border-b-1 my-2 border-gray-900" />
            <ul className="pl-5 mb-4 space-y-2">
            <li className="text-gray-900 relative px-2 py-1 font-bold hover:text-white hover:bg-gray-400 hover:rounded-lg cursor-pointer">
            <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-red-600 bg-red-300 shadow-[0_4px_10px_rgba(239,68,68,1)] "></span>
            Colleague 1
            </li>
            <li className="text-gray-900 relative px-2 py-1 font-bold hover:text-white hover:bg-gray-400 hover:rounded-lg cursor-pointer">
            <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-red-600 bg-red-300 shadow-[0_4px_10px_rgba(239,68,68,1)]"></span>
            Colleague 2
            </li>
            <li className="text-gray-900 relative px-2 py-1 font-bold hover:text-white hover:bg-gray-400 hover:rounded-lg cursor-pointer">
            <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-red-600 bg-red-300 shadow-[0_4px_10px_rgba(239,68,68,1)]"></span>
            Colleague 3
            </li>
            </ul>
        </div>
    </div>
  )
}

export default Friendonlinesec