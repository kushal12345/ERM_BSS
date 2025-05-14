import React from 'react'
import logo from '../assets/chest.png'
import { Dropdown, DropdownItem } from "flowbite-react";


const Navbar = ({loginuser}) => {
    const [svgcolor, setSvgColor] = React.useState("#000000");
  return (
    <div className='w-full h-full  overflow-hidden no-scrollbar'>
        <nav className="bg-[#EDEDF4] dark:bg-[#131518]  overflow-hidden no-scrollbar dark:shadow-lg">
            <div className="flex flex-wrap items-center  justify-between max-w-screen-xl mx-auto px-4 py-1">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                         <span className="self-center flex justify-center text-xl font-bold whitespace-nowrap text-black dark:text-white">ERM System</span>
                </a>
                <div className="flex  items-center justify-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                        <button
                            className="group flex items-center p-2 rounded-lg transition-colors duration-200 
                                    text-gray-800 dark:text-white 
                                    hover:bg-gray-100 dark:hover:bg-gray-700 
                                    active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <svg
                            className="size-6 mx-2 text-gray-800 dark:text-white group-hover:text-blue-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                            />
                            </svg>
                        </button>
                        )}
                        color="white"
                        size="sm"
                    >
                        <DropdownItem>Dashboard</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Earnings</DropdownItem>
                        <DropdownItem>Sign out</DropdownItem>
                    </Dropdown>

                    {loginuser
                    ?
                    <span className='text-md text-black font-bold dark:text-white '>{loginuser ? loginuser.uname: null}</span>   
                    :
                    <a href="#" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 light:bg-blue-600 light:hover:bg-blue-700 focus:outline-none light:focus:ring-blue-800 dark:text-white">Login</a>
                    }
                    <button data-collapse-toggle="mega-menu" type="button" className="inline-flex  items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                
            </div>
        </nav>

    </div>
  )
}

export default Navbar