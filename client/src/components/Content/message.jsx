import React, { useState, useEffect, useRef } from "react";

// Dummy staff list (replace with API later)
const staffList = [
  { id: 1, name: "Ram Thapa", role: "Supervisor", online: true },
  { id: 2, name: "Sita Lama", role: "Guard", online: false },
  { id: 3, name: "Bikash Shrestha", role: "HR Officer", online: true },
  { id: 4, name: "Mina Gurung", role: "Finance", online: true },
  { id: 5, name: "Kiran Magar", role: "Operations", online: false },
];

const MessagePage = ({ currentUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  const filteredStaff = staffList.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const msg = {
      sender: currentUser.name,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), msg],
    }));
    setNewMessage("");
  };

 useEffect(() => {
  // Only scroll if there are messages for the current selected user
  if (selectedUser && messages[selectedUser.id]?.length > 0) {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages, selectedUser]);
  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 dark:bg-[#18191A] rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {/* LEFT SIDEBAR - Staff List */}
      <div className="w-1/4 min-w-[250px] bg-white dark:bg-[#1f2124] border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-[#2a2b2e] text-gray-900 dark:text-gray-100 focus:outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              onClick={() => setSelectedUser(staff)}
              className={`flex items-center justify-between p-3 cursor-pointer transition ${
                selectedUser?.id === staff.id
                  ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <div>
                <div className="font-medium">{staff.name}</div>
                <div className="text-xs text-gray-500">{staff.role}</div>
              </div>
              <span
                className={`h-3 w-3 rounded-full ${
                  staff.online ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-[#1f2124]">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {selectedUser.name}
                </div>
                <div className="text-xs text-gray-500">
                  {selectedUser.online ? "Online" : "Offline"}
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 dark:bg-[#18191A]">
              {(messages[selectedUser.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === currentUser.name ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-2 text-sm shadow ${
                      msg.sender === currentUser.name
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className="text-[10px] opacity-70 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white dark:bg-[#1f2124] border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onFocus={() => setTyping(true)}
                onBlur={() => setTyping(false)}
                className="flex-1 p-2 rounded-md bg-gray-100 dark:bg-[#2a2b2e] text-gray-900 dark:text-gray-100 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>

            {/* Typing Indicator */}
            {typing && (
              <div className="text-xs px-4 py-1 text-gray-500 dark:text-gray-400 italic">
                You are typing...
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Select a staff to start chatting 💬
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
