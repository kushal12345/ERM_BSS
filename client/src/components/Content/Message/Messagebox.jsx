import React from 'react';

const Messagebox = () => {
  return (
    <div className="flex flex-col px-1 h-full bg-white rounded-lg shadow-md overflow-hidden">

      {/* Chat Header */}
      <div className="flex-none bg-gray-200 rounded-t-md flex flex-col justify-center items-center p-1">
        <h2 className="text-xl font-bold">Chat with Support</h2>
        <div className=' flex-1 items-center justify-center'>
            <div className='relative flex items-center justify-center'>
                <span className="absolute left-14 top-1 w-3 h-3 rounded-full border-2 border-green-500 shadow-[0_4px_10px_rgba(34,197,94,1)] bg-green-300"></span>
            </div>

            <div>
                <p className="text-black text-sm font-bold">Online</p>
            </div>
        </div>
       
      </div>

      {/* Chat Body - scrollable */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-3 ">
        {Array(50).fill(0).map((_, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                index % 2 === 0
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-300 text-gray-800 rounded-bl-none'
              }`}
            >
              {index % 2 === 0 ? 'My Message' : 'Incoming Message'}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Input */}
      <div className="flex-none bg-gray-100 rounded-b-md flex items-center px-3 py-2 space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default Messagebox;
