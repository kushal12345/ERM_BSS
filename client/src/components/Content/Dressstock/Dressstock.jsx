import { useState,useEffect } from "react";
import React from 'react';
import { fetchstaff } from "../../Fetch/Fetchstaff";
import Inventry from "./Inventry";
import Distributetoguard from "./Distributetoguard";

const Dressstock = () => {
    const [isCheckedad, setIsCheckedad] = useState(Array(100).fill(true));
    let [data,setdata] = useState(null);
    let [stockshow,setstockshow] = useState(false);
    
    useEffect(() => {
            fetchstaff(setdata);
        }, []);
       
    const handleCheckboxClickad = (index) => {
        setIsCheckedad((prev) => {
            const newCheckedState = [...prev];
            newCheckedState[index] = !newCheckedState[index]; // Toggle the checkbox state for the specific index
            return newCheckedState;
        });
    };

    return (
        <div className="w-full h-full p-3 overflow-hidden bg-[#fff] dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
            <span className='mx-6 font-bold text-xl dark:text-white'>Dress Stock</span>
            <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
            <div className='flex justify-between mx-6 my-3'>
                <div className='flex space-x-2'>
                    <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg' onClick={ () => setstockshow(true)}>Inventry Stock</button>
                    <button className='bg-[#3B82F6] text-white px-3 py-1 rounded-lg'onClick={ () => setstockshow(false)}>Distributed to Guard</button>
                </div>
                <div>
                    <input type='text' placeholder='Search' className='border border-gray-300 dark:border-gray-700 rounded-lg p-1' />
                </div>
            </div>

            <div className="max-w-full h-[80%] overflow-x-auto">
                {
                    stockshow ? (
                        <Inventry data={data} isCheckedad={isCheckedad} handleCheckboxClickad={handleCheckboxClickad} />
                    ) : (
                        <Distributetoguard data={data} isCheckedad={isCheckedad} handleCheckboxClickad={handleCheckboxClickad} />
                    )

                }
            </div>
        </div>
    );
}

export default Dressstock;