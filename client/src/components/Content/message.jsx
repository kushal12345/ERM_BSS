import React from 'react';
import Chatsection from './Message/Chatsection';
const Message = () => {
  return (
    <div className=' bg-white grid grid-rows-[10%_90%] overflow-hidden rounded-lg shadow-md h-full'>
        {/* Page Header */}
        <div className=" flex justify-center items-center mb-2">
            <h1 className="text-xl font-bold">Message</h1>
        </div>

        {/* Main Content: Chat + Sidebar */}
        <div className="">
            <Chatsection  />

        </div>
    </div>


  );
};

export default Message;
