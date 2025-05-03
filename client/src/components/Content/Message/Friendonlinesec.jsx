import React from 'react'

const Friendonlinesec = () => {
  return (
    <div>
        <div className="flex justify-center items-center mb-2">
            <h2 className="text-xl font-bold">Colleagues</h2>
            </div>
            <hr className="border-b-2 my-2 border-gray-900" />
            <ul className="pl-5 mb-4 space-y-2">
            <li className="text-gray-900 relative font-bold">
            <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-green-500 shadow-[0_4px_10px_rgba(34,197,94,1)] bg-green-300"></span>
            Colleague 1
            </li>
            <li className="text-gray-900 relative font-bold">
            <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-red-600 bg-red-300"></span>
            Colleague 2
            </li>
            <li className="text-gray-900 relative font-bold">
            <span className="absolute left-28 top-2 w-3 h-3 rounded-full border-2 border-green-500 shadow-[0_4px_10px_rgba(34,197,94,1)] bg-green-300"></span>
            Colleague 3
            </li>
            </ul>
            <p className="text-gray-600">This is the content of message 2.</p>
    </div>
  )
}

export default Friendonlinesec