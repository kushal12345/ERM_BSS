import React from 'react'
import Friendonlinesec from './Friendonlinesec'
import Messagebox from './Messagebox'

const Chatsection = () => {
  return (
    <div className='grid grid-cols-5 h-[100%] gap-4'>
        {/* Chat Section */}
        <div className="col-span-4 h-[100%] bg-white rounded-lg shadow-md overflow-hidden">
          <Messagebox/>
        </div>

        {/* Colleagues Sidebar */}
        <div className="bg-gray-200 h-[100%] rounded-lg shadow-md p-4 overflow-y-auto">
            <Friendonlinesec/>
        </div>
    </div>
  )
}

export default Chatsection