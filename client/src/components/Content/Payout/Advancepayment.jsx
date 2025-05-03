import React,{useState} from 'react'

const Advancepayment = () => {
     const [active,setactive] = useState(null);
            const [isCheckedad, setIsCheckedad] = useState(Array(2).fill(false));
            const [isChecked, setIsChecked] = useState(Array(2).fill(false));
    
            
            const handleCheckboxClick = (index) => {
               setIsChecked((prev) => {
                    const newCheckedState = [...prev];
                    newCheckedState[index] = !newCheckedState[index]; // Toggle the checkbox state for the specific index
                    return newCheckedState;
               });
            };
            
            const handleCheckboxClickad = (index) => {
                setIsCheckedad((prev) => {
                  const newCheckedState = [...prev];
                  newCheckedState[index] = !newCheckedState[index]; // Toggle the checkbox state for the specific index
                  return newCheckedState;
                });
              };
    
  return (
    <div className="w-full h-screen p-3 overflow-y-scroll bg-[#fff] border border-gray-200 dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
    <span className='mx-6  font-bold text-xl dark:text-white '>Advance Payout</span>
        <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
        
            

            <div class="inline-flex rounded-md shadow-xs" role="group">
                <button type="button" onClick={()=>setactive("bs")} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    B.S
                </button>
        
                <button type="button" onClick={()=>setactive("ad")} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    A.D
                </button>
            </div>

            {active === "bs" ? (
                // Render Active Staffs
                <div className=' mt-6'>
                {/*  2nd row */}
                <form class="max-w-md my-4 mx-auto">   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Clients" required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                <div className=' mt-6'>
                                <span className='mx-6 font-bold text-xl dark:text-white'>Advanced Payment For Staffs [Nepali Date]</span><br/>
                                <span className='mx-6 font-bold text-xl dark:text-white'>Month: Falgun</span><br/>
                                <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
                </div>
        
                <div className=" w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full overflow-scroll  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='text-center align-middle'>
                                <th scope="col" className=" px-2 py-3">
                                    Staff  Name
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Phone No
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Duty Location
                                </th>

                                <th scope="col" className="px-2 py-3">
                                    Advance Payment
                                </th>  
                               
                                
                                <th scope="col" className="px-2 py-3">
                                    Received By
                                </th>

                                <th scope="col" className="px-2 py-3">
                                    Upload Voucher
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Status
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {['div1', 'div2'].map((div, index) => (
                            <tr key={index} className={`text-center align-middle ${isChecked[index] ? "bg-green-400" : "bg-red-400"} dark:border-gray-700 border-gray-200`}>
                                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Jane Cooper</th>
                                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">9841449298</td>
                                <td className="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Samakhusi,<br /> Kathmandu</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">15000</td>
                                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Prem Luitel</td>
                                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Upload</button>
                                </td>
                               
                                <td className="px-2 py-4">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" checked={isChecked[index]} onClick={() => handleCheckboxClick(index)} />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    </label>
                                </td>
                            </tr>
                        ))}
                        
                        </tbody>
                    </table>

                    
                </div>
                </div>
            ) : active === "ad" ? (
                // Render Terminated Staffs
                <div className=' mt-6'>
                {/*  2nd row */}
                <form class="max-w-md my-4 mx-auto">   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Clients" required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                <div className=' mt-6'>
                                <span className='mx-6 font-bold text-xl dark:text-white'>Advanced Payment For Staffs [English Date]</span><br/>
                                <span className='mx-6 font-bold text-xl dark:text-white'>Month: March</span>
                                <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
                </div>
        
                <div className=" w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full overflow-scroll  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='text-center align-middle'>
                                <th scope="col" className=" px-2 py-3">
                                    Staff  Name
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Phone No
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Duty Location
                                </th>

                                <th scope="col" className="px-2 py-3">
                                    Advance Payment
                                </th>  
                               
                                
                                <th scope="col" className="px-2 py-3">
                                    Received By
                                </th>

                                <th scope="col" className="px-2 py-3">
                                    Upload Voucher
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    Status
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {['div1', 'div2'].map((div, index) => (
                            <tr key={index} className={`text-center align-middle ${isChecked[index] ? "bg-green-400" : "bg-red-400"} dark:border-gray-700 border-gray-200`}>
                                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Jane Cooper</th>
                                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">9841449298</td>
                                <td className="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Samakhusi,<br /> Kathmandu</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">15000</td>
                                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Prem Luitel</td>
                                <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Upload</button>
                                </td>
                               
                                <td className="px-2 py-4">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" checked={isChecked[index]} onClick={() => handleCheckboxClick(index)} />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    </label>
                                </td>
                            </tr>
                        ))}
                        
                        </tbody>
                    </table>

                    
                </div>
                </div>
            ) : null}   
                
</div>
  )
}

export default Advancepayment