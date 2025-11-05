import React,{useEffect, useState} from 'react';
import { Datepicker } from 'flowbite-react';
import api from '../../utils/api';


const NewAdmission =  () => {
    const [temppic,settemppic] = useState(null);

    const [user,setUser] = useState({
        image: "",
        Fname: "",
        Mname: "",
        Lname: "",
        email: "",
        phno: "",
        bg: "",
        dob: "",
        gender: "",
        TempState: "",
        TempDist: "",
        TempMun: "",
        TempAddress: "",
        TempTol: "",            
        PerState: "",
        PerDist: "",
        PerMun: "",
        PerAddress: "",
        PerTol: "",
        doctype: "",
        docno: "",
        IssueDistrict: "",
        IssueDate: "",
        docfile: "",
        marrital: "",
        Huswifname: "",
        famphno: "",
        famdocfile: "",
        mothname: "",
        mothphno: "",
        mothdocfile: "",
        fathname: "",
        fathphno: "",
        fathdocfile: "",
        grandfathname: "",
        grandfathno: "",
        grandfathdocfile: "",
        edu: "",
        termsaggree: ""

    });

   
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser ({
            ...user,
            [name]: type === 'checkbox' ? checked : value // Handle checkbox separately
        });
    };
    
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setUser ({
            ...user,
            [name]: files[0] // Store the entire file object
        });
    };

    const handleImageChange = (e) => {
        const image = e.target.files[0].name;
        if(image){
            settemppic(URL.createObjectURL(e.target.files[0]));
        }
        setUser({
            ...user,
            image: image
        });
    }

    const handleDateChange = (date) => {
        if (!date) {
        setUser({ ...user, dob: "" });
        return;
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');

        const localDate = `${year}-${month}-${day}`;

        setUser({ ...user, dob: localDate });
        
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
         // Validate email and phone number formats
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number
 
         if (!emailPattern.test(user.email)) {
             alert("Please enter a valid email address.");
             return;
         }
 
         if (!phonePattern.test(user.phno)) {
             alert("Please enter a valid phone number.");
             return;
         }
    
        // Define Required fields
        const requiredFields = [ 
            'Fname', 'Mname', 'Lname', 'email', 'phno', 'bg', 'dob', 'gender',
            'TempState', 'TempDist', 'TempMun', 'TempAddress', 'TempTol',            
            'PerState', 'PerDist', 'PerMun', 'PerAddress', 'PerTol',
            'doctype', 'docno', 'IssueDistrict', 'IssueDate', 'docfile',
            'marrital', 'Huswifname', 'famphno', 'famdocfile', 'mothname',
            'fathname', 'grandfathname', 'edu', 'termsaggree','image'
        ];
    
        // Check if required fields of user are empty
        const emptyFields = requiredFields.filter(field => !user[field]);
        console.log('requiredFields:', user);
        if (emptyFields.length > 0) {
            console.log('Please fill all the required fields');
            return;
        }
    
        // Create FormData object
        const formData = new FormData();
        for (const key in user) {
            if (user[key] !== undefined && user[key] !== "") {
                formData.append(key, user[key]);
            }
        }
    
        try {
            const response = await api.post("/api/newadmission", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Reset the form or redirect the user
            setUser ({
                image: null,
                Fname: "", Mname: "", Lname: "", email: "", phno: "", bg: "", dob: "",
                gender: "", TempState: "", TempDist: "", TempMun: "", TempAddress: "",
                TempTol: "", PerState: "", PerDist: "", PerMun: "", PerAddress: "",
                PerTol: "", doctype: "", docno: "", IssueDistrict: "", IssueDate: "",
                docfile: null, marrital: "", Huswifname: "", famphno: "", famdocfile: null,
                mothname: "", mothphno: "", mothdocfile: null, fathname: "", fathphno: "",
                fathdocfile: null, grandfathname: "", grandfathno: "", grandfathdocfile: null,
                edu: "", termsaggree: false // Reset checkbox to false
            });
            settemppic(null);
    
        } catch (error) {
            console.error('Error:', error);
            alert("There was an error submitting the form. Please try again.");
        }
    };
     
  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#fff] border border-gray-200 dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
           
            <form className="w-[80%] mx-auto" onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className="my-3 w-full flex justify-center"> 
                <span className="font-bold text-lg dark:text-white">New Admission</span>
            </div>
            <span className='font-semibold text-xs text-red-600'>All feilds marked with * are mandatory</span>

            <hr/>
            <div className="my-5 flex gap-4 justify-between">
                <div className='flex gap-4'>    
                    <div>
                        <label htmlFor="Fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name <span className='font-bold text-red-600'>*</span></label>
                        <input type="text" id="Fname" name='Fname' value={user.Fname} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="First Name" required />
                    </div>

                    <div>
                        <label htmlFor="Mname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
                        <input type="text" id="Mname" name='Mname' value={user.Mname} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Middle Name" />
                    </div>
        
                    <div>
                        <label htmlFor="Lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name <span className='font-bold text-red-600'>*</span></label>
                        <input type="text" id="Lname" name='Lname' value={user.Lname} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Last Name" required />
                    </div>
                </div>

                <div className="rounded-full border hover:bg-gray-500 transition duration-300 ease-in-out w-36 h-36 flex items-center justify-center absolute right-24 z-10">
                    <div onClick={() => document.getElementById('image').click()} className="cursor-pointer">
                        <img 
                            className="rounded-full w-full h-full object-cover" 
                            src={temppic ? `${temppic}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            alt="Profile" 
                            name="image"
                        />
                    </div>
                    <input type="file" id="image" name='image' accept='image/*' onChange={handleImageChange} onClick={(e) => {e.target.value = null}} className="hidden" />
                </div>
            </div>
    

            <div className="mb-5 flex gap-4">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address <span className='font-bold text-red-600'>*</span></label>
                    <input type="email" id="email" name='email' value={user.email} onChange={handleChange} className="shadow-xs bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" required />
                </div>
    
                <div>
                    <label htmlFor="phno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No <span className='font-bold text-red-600'>*</span></label>
                    <input type="phno" id="phno" name='phno' value={user.phno} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Phone No" required />
                </div>

                <div>
                    <label htmlFor="bg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Group</label>
                        <select  id="bg" name='bg' onChange={handleChange} value={user.bg} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Blood Group</option>
                            <option value="AP">A+</option>
                            <option value="AN">A-</option>
                            <option value="BP">B+</option>
                            <option value="BN">B-</option>
                            <option value="ABP">AB+</option>
                            <option value="ABN">AB-</option>
                            <option value="OP">O+</option>
                            <option value="ON">O-</option>
                        </select>                </div>
            </div>
    
            <div className="mb-5 flex gap-4">
    
                <div>
                    <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth <span className='font-bold text-red-600'>*</span></label>
                        <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <div>
                        <Datepicker
                            id="dob"
                            name="dob"
                            value={user.dob}
                            onSelectedDateChanged={handleDateChange}
                            selected={user.dob ? new Date(user.dob) : null} // Convert string to Date object
                        />
                    </div>
                        </div>
                </div>
    
                <div>
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender <span className='font-bold text-red-600'>*</span></label>
                        <select  id="gender" name='gender' value={user.gender} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose your Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                </div>
                
            </div>
            <hr/>
            <div className='my-4'>
                <span className='text-lg font-semibold'>Temporary Address <span className='font-bold text-red-600'>*</span> </span>
            </div>

            <div className="mb-5 flex gap-4">
                <div>
                    <label htmlFor="TempState" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                    <input type="text" id="TempState" name='TempState' value={user.TempState} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

                <div>
                    <label htmlFor="TempDist" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District</label>
                    <input type="text" id="TempDist" name='TempDist' value={user.TempDist} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

                <div>
                    <label htmlFor="TempMun" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub/metropolitan</label>
                    <input type="text" id="TempMun" name='TempMun' value={user.TempMun} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

                <div>
                    <label htmlFor="TempAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ward No</label>
                    <input type="text" id="TempAddress" name='TempAddress' value={user.TempAddress} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

                <div>
                    <label htmlFor="TempTol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tol</label>
                    <input type="text" id="TempTol" name='TempTol' value={user.TempTol} onChange={handleChange}  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

            </div>
            <hr/>
            <div className='my-4'>
                <span className='text-lg font-semibold'>Permanent Address <span className='font-bold text-red-600'>*</span></span>
            </div>

            <div className="mb-5 flex gap-4">
                <div>
                    <label htmlFor="PerState" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                    <input type="text" id="PerState" value={user.PerState} onChange={handleChange} name='PerState' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

                <div>
                    <label htmlFor="PerDist" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District</label>
                    <input type="text" id="PerDist" value={user.PerDist} onChange={handleChange} name='PerDist' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

                <div>
                    <label htmlFor="PerMun" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub/metropolitan</label>
                    <input type="text" id="PerMun" value={user.PerMun} onChange={handleChange} name='PerMun' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

                <div>
                    <label htmlFor="PerAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ward No</label>
                    <input type="text" id="PerAddress" value={user.PerAddress} onChange={handleChange} name='PerAddress' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

                <div>
                    <label htmlFor="PerTol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tol</label>
                    <input type="text" id="PerTol" value={user.PerTol} onChange={handleChange} name='PerTol' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                </div>

            </div>
            <hr/>
            <div className='my-4'>
                <span className='text-lg font-semibold'>Document Types <span className='font-bold text-red-600'>*</span></span>
            </div>
           
            <div className="mb-5 flex gap-4">
                <div>
                        <label htmlFor="doctype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document Types</label>
                            <select  id="doctype" value={user.doctype} onChange={handleChange} name='doctype' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Types of Documents</option>
                                <option value="Citizenship">Citizenship</option>
                                <option value="Passport">Passport</option>
                            </select>
                </div>

                <div>
                    <label htmlFor="docno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document No</label>
                    <input type="text" id="docno" value={user.docno} onChange={handleChange} name='docno' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                </div>

                <div>
                    <label htmlFor="IssueDistrict" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issued District</label>
                    <input type="text" id="IssueDistrict" value={user.IssueDistrict} onChange={handleChange} name='IssueDistrict' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                </div>

                <div>
                    <label htmlFor="IssueDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issued Date</label>
                    <input type="text" id="IssueDate" value={user.IssueDate} onChange={handleChange} name='IssueDate' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                </div>

                <div>
                    <label htmlFor="docfile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload File</label>
                    <input type="file" id="docfile"  onChange={handleFileChange} name='docfile' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                </div>

            </div>

            <div className='my-4'>
                <div>
                        <label htmlFor="marrital" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marritial Status <span className='font-bold text-red-600'>*</span></label>
                            <select  id="marrital" value={user.marrital} name='marrital' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value="">Not Selected</option>
                            <option value="Married">Married</option>
                            <option value="Unmarried">Unmarried</option>
                            <option value="Divorded">Divorced</option>
                            </select>
                </div>

            </div>
            <hr/>
            <div className='my-4'>
                <span className='text-lg font-semibold'>Family Details <span className='font-bold text-red-600'>*</span></span>
                
                <div className="my-5 flex gap-4">
                    <div className='flex w-[10%] gap-4 items-center font-semibold mr-4'>
                        <span>Husband/Wife</span> 
                    </div>

                    <div>
                        <label htmlFor="Huswifname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" id="Huswifname" value={user.Huswifname} onChange={handleChange} name='Huswifname' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                    </div>

                    <div>
                        <label htmlFor="famphno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
                        <input type="text" id="famphno" value={user.famphno} onChange={handleChange} name='famphno' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                    </div>

                    <div>
                        <label htmlFor="famdocfile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Citizenship</label>
                        <input type="file" id="famdocfile"  onChange={handleFileChange} name='famdocfile' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                    </div>

                </div>


                <div className="my-5 flex gap-4">
                    <div className='flex w-[10%] gap-4 items-center font-semibold mr-4'>
                        <span>Mother</span> 
                    </div>

                    <div>
                        <label htmlFor="mothname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" id="mothname" value={user.mothname} onChange={handleChange} name='mothname' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                    </div>

                    <div>
                        <label htmlFor="mothphno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
                        <input type="Number" id="mothphno" value={user.mothphno} onChange={handleChange} name='mothphno' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  />   
                    </div>
                    <div>
                        <label htmlFor="mothdocfile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Citizenship</label>
                        <input type="file" id="mothdocfile"  onChange={handleFileChange} name='mothdocfile' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
                    </div>

                </div>

                <div className="my-5 flex gap-4">
                    <div className='flex w-[10%] gap-4 items-center font-semibold mr-4'>
                        <span>Father</span> 
                    </div>

                    <div>
                        <label htmlFor="fathname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" id="fathname" value={user.fathname} onChange={handleChange} name='fathname' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                    </div>

                    <div>
                        <label htmlFor="fathphno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
                        <input type="Number" id="fathphno" value={user.fathphno} onChange={handleChange} name='fathphno' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  />   
                    </div>

                    <div>
                        <label htmlFor="fathdocfile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Citizenship</label>
                        <input type="file" id="fathdocfile" name='fathdocfile'  onChange={handleFileChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  />
                    </div>
                </div>

                <div className="my-5 flex gap-4">
                    <div className='flex w-[10%] gap-4 items-center font-semibold mr-4'>
                        <span>Grandfather</span> 
                    </div>

                    <div>
                        <label htmlFor="grandfathname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" id="grandfathname" value={user.grandfathname} onChange={handleChange} name='grandfathname' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />   
                    </div>

                    <div>
                        <label htmlFor="grandfathno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
                        <input type="Number" id="grandfathno" value={user.grandfathno} onChange={handleChange} name='grandfathno' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"  />   
                    </div>
                    <div>
                        <label htmlFor="grandfathdocfile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Citizenship</label>
                        <input type="file" id="grandfathdocfile" onChange={handleFileChange} name='grandfathdocfile' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
                    </div>

                </div>
            </div>

            <hr/>

            <div className='my-4'>
                <div className='my-4'>
                    <span className='text-lg font-semibold'>Educational Details <span className='font-bold text-red-600'>*</span></span>
                </div>
                <div>
                    <label htmlFor="edu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Educational Qualification</label>
                        <select  id="edu" name='edu' value={user.edu} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose your Qualification</option>
                            <option value="No">No</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="SLC">SLC</option>
                            <option value="+2">+2</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                        </select>
                        
                </div>
            </div>

            <hr/>

           
            <div className="flex my-5 items-start mb-5">
                <div className="flex items-center h-5">
                    <input id="terms" type="checkbox" name="termsaggree" checked={user.termsaggree} onChange={handleChange} className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
            </form>
    
    
        </div>
  )
}

export default NewAdmission