import React, { useState } from "react";
import logo from "../assets/chest.png";
import { Dropdown, DropdownItem, DropdownHeader } from "flowbite-react";
import Setting from "../Content/Setting/Setting";

const Navbar = ({ loginuser }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full bg-white dark:bg-[#212528] overflow-hidden">
      {/* Navbar Container */}
      <nav className="dark:shadow-lg">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-2">
          {/* Brand */}
          <a
            href="#"
            className="flex items-center space-x-3 no-underline rtl:space-x-reverse"
          >
            <span className="text-xl font-bold text-black dark:text-white">
              ERM System
            </span>
          </a>

          {/* Right Section */}
          <div className="flex items-center justify-center space-x-2 md:space-x-3">
            {loginuser ? (
              <>
                {/* 🔔 Notification Dropdown */}
                <Dropdown
                  label=""
                  inline
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <button
                      className="border flex items-center justify-center p-2 rounded-lg transition-colors duration-200 
                        text-gray-800 dark:text-white 
                        hover:bg-gray-100 dark:hover:bg-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <svg
                        className="size-6 text-gray-800 dark:text-white group-hover:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                        />
                      </svg>
                    </button>
                  )}
                >
                  <DropdownItem className="py-2 px-3">
                    🔔 New Message from <b>Chinkaji Kumal</b>
                  </DropdownItem>
                </Dropdown>

                {/* 👤 Profile Dropdown */}
                <Dropdown
                    label=""
                    inline
                    dismissOnClick={false}
                    renderTrigger={() => (
                        <button
                        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <img
                                src={logo}
                                alt="User profile"
                                className="w-full h-full object-cover"
                            />
                        </button>
                    )}
                    >
                    {/* Header */}
                    <DropdownHeader className="py-1 px-3 border-b">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {loginuser?.uname || "User"}
                        </span>
                    </DropdownHeader>

                    {/* Menu Items */}
                    <DropdownItem className="py-1 px-3">Profile</DropdownItem>
                    <DropdownItem className="py-1 px-3" onClick={() => setShowModal(true)}>
                        Settings
                    </DropdownItem>
                    <DropdownItem className="py-1 px-3">Earnings</DropdownItem>
                    <DropdownItem className="py-1 px-3">Sign out</DropdownItem>
                    </Dropdown>

              </>
            ) : (
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none"
              >
                Login
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <button
              data-collapse-toggle="mega-menu"
              type="button"
              className="inline-flex md:hidden items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mega-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ⚙️ Settings Modal */}
      <Setting showModal={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Navbar;
