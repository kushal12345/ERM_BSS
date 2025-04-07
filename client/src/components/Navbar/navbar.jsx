import React from 'react'
import logo from '../assets/chest.png'

const Navbar = ({loginuser}) => {
  return (
    <div className='w-full h-full  overflow-hidden no-scrollbar'>
        <nav className="bg-[#EDEDF4] dark:bg-[#131518]  overflow-hidden no-scrollbar dark:shadow-lg">
            <div className="flex flex-wrap items-center  justify-between max-w-screen-xl mx-auto px-4 py-1">
                <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                         <span className="self-center flex justify-center text-xl font-bold whitespace-nowrap text-black dark:text-white">ERM System</span>
                </a>
                <div className="flex  items-center justify-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
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