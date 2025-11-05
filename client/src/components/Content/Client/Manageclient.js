import React,{useEffect, useState} from 'react'
import { Datepicker } from 'flowbite-react';
import api from '../../../utils/api';
import { fetchClient } from '../../Fetch/FetchClient';


const Manageclient = () => {
    const [active,setactive] = useState(null);
    const [clients,setClients] = useState(null);
    
    const [user,setUser] = useState({
        Oname: '',
        Pno: '',
        OAdd: '',
        Cname: '',
        Phno: '',
        Ann: 0,
        dashbon: false,
        vat: false,
        constdate: '',
        conendate: '',
        NSG: 0,
        NCleaner: 0,
        NBouncer: 0,
        NEP: 0,
        NES: 0,
        file_contract: ''
    });

    useEffect(() => {
        fetchClient(setClients);
    }, []);

    const handleDateChange = (date) => {
        setUser({
            ...user,
            constdate: date,
            conendate: date
        });
    }

    const handleFileChange = (event) => {
        setUser({
            ...user,
            file_contract: event.target.files[0]
        });
    }

  

    const handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        setUser ((prevUser ) => ({
            ...prevUser ,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit =  async(event) => {
        event.preventDefault();
        console.log(user);

       const required = ['Oname','Pno','OAdd','Cname','Phno','Ann','constdate','conendate','vat','SG','Cleaner','Bouncer','EP','ES','file_contract'];
       const empty = required.filter(key => user[key] === '');
            if(empty.length > 0){
                alert(`Please enter ${empty}`);
                return;
            }
            if(user.file_contract === ''){
                alert('Please upload contract file');
                return;
            }
            if(user.dashbon === true){
                user.dashbon = 'Yes';
            }else{
                user.dashbon = 'No';
            }
            const formData = new FormData();
        
            for(const key in user){
                if (user[key] !== undefined && user[key] !== "") {
                    formData.append(key, user[key]);
                }
            }
            
            try {
                const response = await api.post('/api/client/add',formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    });

                    console.log(response);
                   
                    setUser({
                        Oname: '',
                        Pno: '',
                        OAdd: '',
                        Cname: '',
                        Phno: '',
                        Ann: 0,
                        dashbon: false,
                        vat: false,
                        constdate: '',
                        conendate: '',
                        SG: '',
                        NSG: 0,
                        Cleaner: '',
                        NCleaner: 0,
                        Bouncer: '',
                        NBouncer: 0,
                        EP: '',
                        NEP: 0,
                        ES: '',
                        NES: 0,
                        file_contract: ''
                    });
            } catch (error) {
                console.log(error);
            }



    }




  return (
    <div className="w-full h-screen p-3 overflow-y-scroll bg-[#fff] border border-gray-200 dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
        <span className='mx-6  font-bold text-xl dark:text-white '>Manage Your Clients</span>
            <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
            
                

                <div class="inline-flex rounded-md shadow-xs" role="group">
                    <button type="button" onClick={()=>setactive("AddClient")} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                        Add Clients
                    </button>
            
                    <button type="button" onClick={()=>setactive("ListClient")} class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                        List Clients
                    </button>
                </div>

                {active === "AddClient" ? (
                    // Render Active Staffs
                    <div className=' mt-6'>
                        {/*  1st row */}
                    <div className=' mt-6'>
                                    <span className='mx-6 font-bold text-xl dark:text-white'>Add Client</span>
                                    <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
                    </div>

                    <div className=" w-full relative overflow-x-auto ">
                        {/* Add clients form */}
                        <form className="w-[80%] mx-auto" onSubmit={handleSubmit} enctype="multipart/form-data">

                            <div className='flex  gap-4'>    
                                <div>
                                    <label htmlFor="Oname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Office Name <span className='font-bold text-red-600'>*</span></label>
                                    <input type="text" id="Oname" value={user.Oname} onChange={handleChange} name='Oname'  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Name Of Office" required />
                                </div>

                    
                                <div>
                                    <label htmlFor="Pno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pan No: <span className='font-bold text-red-600'>*</span></label>
                                    <input type="number" id="Pno" name='Pno' value={user.Pno} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Pan No" required />
                                </div>
                            </div>
                        
                        
                            <div className=' gap-4'>  
                                <div className='w-full mt-3 flex'>
                                    <label htmlFor="OAdd" className="block text-sm font-medium text-gray-900 dark:text-white">Office Location <span className='font-bold text-red-600'>*</span></label><br/>    
                                </div> 
                                <div className="mb-5 flex gap-4">
                                    <div>
                                        <input type="text" id="OAdd" name='OAdd' value={user.OAdd} onChange={handleChange}  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder='Address' required />   
                                    </div>

                                </div>
                            </div>

                            <div className='flex mb-4 gap-4'>    
                                <div>
                                    <label htmlFor="Cname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client Name <span className='font-bold text-red-600'>*</span></label>
                                    <input type="text" id="Cname" name='Cname' value={user.Cname} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Client Name" required />
                                </div>

                    
                                <div>
                                    <label htmlFor="Phno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No <span className='font-bold text-red-600'>*</span></label>
                                    <input type="number" id="Phno" name='Phno' value={user.Phno} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Phone no" required />
                                </div>
                            </div>

                            <div className='flex mb-4 gap-4'>    
                                <div>
                                    <label htmlFor="Ann" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contracted Annuity <span className='font-bold text-red-600'>*</span></label>
                                    <input type="text" id="Ann" name='Ann' value={user.Ann} onChange={handleChange}  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Contracted Annuity" required />
                                </div>

                     
                                <div className='flex items-center'>
                                <div class="flex  items-center">
                                    <input  id="dashbon" name='dashbon' type="checkbox" value={user.dashbon} onChange={handleChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="dashbon" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Include Dashain Bonus?</label>
                                </div>
                                <div class="flex  items-center">
                                    <input  id="vat" name='vat' type="checkbox" value={user.vat} onChange={handleChange} class="w-4 ml-3 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="vat" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Include VAT?</label>
                                </div>
                                </div>
                            </div>

                            <div className='flex mb-4 gap-4'>    
                               
                                <div className='flex items-center gap-4'> 
                                    <div>
                                                        <label htmlFor="constdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contract Start Date <span className='font-bold text-red-600'>*</span></label>
                                                            <div className="relative max-w-sm">
                                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                                </svg>
                                                            </div>
                                                            <div>
                                                            <Datepicker
                                                                id="constdate"
                                                                name="constdate"
                                                                value={user.constdate}
                                                                onSelectedDateChanged={handleDateChange}
                                     //                           selected={user.dob ? new Date(user.dob) : null} // Convert string to Date object
                                                            />
                                                        </div>
                                                            </div>
                                    </div>

                                    <div>
                                                        <label htmlFor="conendate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contract End Date <span className='font-bold text-red-600'>*</span></label>
                                                            <div className="relative max-w-sm">
                                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                <Datepicker
                                                                    id="conendate"
                                                                    name="conendate"
                                                                    value={user.conendate}
                                                                    onSelectedDateChanged={handleDateChange}
                                        //                           selected={user.dob ? new Date(user.dob) : null} // Convert string to Date object
                                                                />
                                                                </div>
                                                            </div>
                                    </div>
                                </div>
                            </div>

                           

                            <div className='flex mb-4 px-2 gap-4'>    
                                <div>
                                    <label htmlFor="doctype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Service Requested <span className='font-bold text-red-600'>*</span></label>
            
                                    <div class="flex  items-center">
                                        <label for="SG" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Security Guard</label>
                                        <input type="number" id="NSG" name='NSG' value={user.NSG} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm my-2 rounded-md focus:ring-blue-500 focus:border-blue-500 block mx-3 h-6 w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="No of Services"  />

                                    </div>
                                    <div class="flex  items-center">
                                        <label for="Cleaner" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cleaner</label>
                                        <input type="number" id="NCleaner" name='NCleaner' value={user.NCleaner} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm my-2 rounded-md focus:ring-blue-500 focus:border-blue-500 block mx-3 h-6 w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="No of Services"  />

                                    </div>
                                    <div class="flex  items-center">
                                        <label for="Bouncer" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bouncer</label>
                                        <input type="number" id="NBouncer" name='NBouncer' value={user.NBouncer} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm my-2 rounded-md focus:ring-blue-500 focus:border-blue-500 block mx-3 h-6 w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="No of Services"  />

                                    </div>
                                    <div class="flex  items-center">
                                        <label for="EP" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Executive Protection</label>
                                        <input type="number" id="NEP" name='NEP' value={user.NEP} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm my-2 rounded-md focus:ring-blue-500 focus:border-blue-500 block mx-3 h-6 w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="No of Services"  />

                                    </div>
                                    <div class="flex  items-center">
                                        <label for="ES" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Event Security</label>
                                        <input type="number" id="NES" name='NES' value={user.NES} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm my-2 rounded-md focus:ring-blue-500 focus:border-blue-500 block mx-3 h-6 w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="No of Services"  />

                                    </div>
                                </div>
                                
                                <div >
                                                                        
                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_contract">Upload Contract <span className='font-bold text-red-600'> *</span></label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_contract" name='file_contract'  onChange={handleFileChange} type="file"/>

                                </div>
                   
                            </div>
                            <div className='flex items-center justify-center w-[50%]  mb-4 px-2 gap-4'>
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                    <br />
                    </div>
                ) : active === "ListClient" ? (
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
                                    <span className='mx-6 font-bold text-xl dark:text-white'>List of Clients</span>
                                    <hr className='mx-6 my-2 border border-gray-300 dark:border-gray-700' />
                    </div>
                    {
                        clients && clients.map((client, index) => (
                            <div key={index} className=" w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full overflow-scroll  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className='text-center align-middle'>
                                            <th scope="col" className=" px-2 py-3">
                                                Office  Name
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                Pan No
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                Location
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                Client Name
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                Phone No
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                Contracted  Annuity 
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                Dashain Bonus
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                Contract  Interval
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                VAT
                                            </th>
                                            <th scope="col" className="px-2 py-3">
                                                Services
                                            </th>
                                        
                                            <th scope="col" className="px-2 py-3">
                                                Contract File
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="  text-center align-middle odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {client.Oname}
                                            </th>
                                            <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {client.Pno}
                                            </td>
                                            <td className="px-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {client.OAdd}
                                            </td>
                                            <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {client.Cname}
                                            </td>
                                            
                                            <td className="px-2 py-4">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {client.Phno}
                                                </td>

                                            </td>

                                            <td className="px-2 py-4">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {client.Ann}
                                                </td>
                                            </td>

                                            <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {client.dashbon ? 'Yes' : 'No'}
                                            </td>

                                            <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                { client.constdate.split('T')[0]} <br/> {client.conendate.split('T')[0]}
                                            </td>

                                            <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {client.vat ? 'Yes' : 'No'}
                                            </td>

                                            <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {client.NSG > 0 ? <b>Security Guard : {client.NSG}</b>  : null} <br/>
                                                {client.NCleaner > 0 ? <b>Cleaner : {client.NCleaner}</b>  : null} <br/>
                                                {client.NBouncer > 0 ? <b>Bouncer : {client.NBouncer}</b>  : null} <br/>
                                                {client.NEP > 0 ? <b>Executive Protection : {client.NEP}</b>  : null} <br/>
                                                {client.NES > 0 ? <b>Event Security : {client.NES}</b>  : null} <br/>
                                            </td>
                                            <td className="px-2 py-4">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <a className=''>View</a>
                                                </td>
                                            </td>
                            
                                        </tr>
                                        
                                    
                                    </tbody>
                                </table>

                                
                            </div>
                        ))
                    }
                    
                    </div>
                ) : null}   
                    
    </div>
  )
}

export default Manageclient