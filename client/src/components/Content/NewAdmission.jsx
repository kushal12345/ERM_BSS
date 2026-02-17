// NewAdmission.jsx
import React, { useState, useEffect, useContext, useMemo } from "react";
import api from "../../utils/api";
import AuthContext from "../Hooks/Context/AuthContext";

const initialUser = {
  VisitorId: null,
  image: null,
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
  docfile: null,
  marrital: "",
  Huswifname: "",
  famphno: "",
  famdocfile: null,
  mothname: "",
  mothphno: "",
  mothdocfile: null,
  fathname: "",
  fathphno: "",
  fathdocfile: null,
  grandfathname: "",
  grandfathno: "",
  grandfathdocfile: null,
  edu: "",
  termsaggree: false,
};

const steps = [
  "Personal Details",
  "Family Details",
  "Educational Details",
  "Document Details",
  'Bank Details',
  'Submit'
];


export default function NewAdmission() {
  const [user, setUser] = useState({ ...initialUser });
  const [temppicUrl, setTemppicUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const { visittoadmiss, setvisittoadmiss } = useContext(AuthContext);



  // Fake field count for demo (replace with real validation later)
  const totalFields = 19;
  const filledFields = 0;

  const progress = useMemo(() => {
    return Math.round((filledFields / totalFields) * 100);
  }, [filledFields]);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };


  useEffect(() => {
    if (!visittoadmiss) return;

    setUser((prev) => ({
      ...prev,
      VisitorId: visittoadmiss._id || "",
      Fname: visittoadmiss.Fname || "",
      Mname: "",
      Lname: visittoadmiss.Lname || "",
      phno: visittoadmiss.Phone || "",
      gender: visittoadmiss.Gender?.toLowerCase() || "",
      TempAddress: visittoadmiss.TempAddress || "",
      PerAddress: visittoadmiss.PermAddress || "",
      edu: visittoadmiss.EducationQualification || "",
    }));
  }, [visittoadmiss]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((u) => ({ ...u, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUser((u) => ({ ...u, [name]: file }));

    if (name === "image") {
      const url = URL.createObjectURL(file);
      setTemppicUrl(url);
    }
  };

  const validate = () => {
    const errs = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{7,15}$/;

    const requiredFields = [
      "Fname", "Lname", "email", "phno", "dob", "gender",
      "TempState", "TempDist", "TempMun", "TempAddress", "TempTol",
      "PerState", "PerDist", "PerMun", "PerAddress", "PerTol",
      "doctype", "docno", "IssueDistrict", "IssueDate", "docfile",
      "marrital", "fathname", "grandfathname", "edu", "termsaggree"
    ];

    requiredFields.forEach((k) => {
      const val = user[k];
      if (val === null || val === undefined || val === "" || val === false) {
        errs.push(`${k} is required`);
      }
    });

    if (user.email && !emailPattern.test(user.email)) errs.push("Email is not valid");
    if (user.phno && !phonePattern.test(String(user.phno))) errs.push("Phone number is not valid (7-15 digits)");

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      const val = user[key];
      if (val === null || val === undefined || val === "") return;
      formData.append(key, val instanceof File ? val : val);
    });

    try {
      setSubmitting(true);
      await api.post("/api/newadmission", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser({ ...initialUser });
      setTemppicUrl(null);
      setvisittoadmiss(null);
      setErrors([]);
      alert("Admission created successfully.");
    } catch (err) {
      console.error(err);
      setErrors(["Server error while submitting."]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-2xl shadow border border-gray-200">

            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <p className="text-sm text-gray-500">
                Operations / New Admission
              </p>
              <p className="text-sm text-red-500 mt-1">
                Fields marked with * are required
              </p>
            </div>

            <div>
              {/* Errors */}
              {errors.length > 0 && (
                <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-3">
                  <ul className="text-sm text-red-700 dark:text-red-200 space-y-1">
                    {errors.map((er, i) => (
                      <li key={i}>• {er}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;

                return (
                  <button
                    key={step}
                    onClick={() => setCurrentStep(stepNumber)}
                    className={`px-3 py-3 text-sm font-medium transition
                      ${isActive
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {step}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="p-8 min-h-[300px]">
              {currentStep === 1 && (
                <div className="space-y-6 text-gray-700">

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="Fname">First Name <span className="text-red-500">*</span></label>
                      <input
                        id="Fname"
                        name="Fname"
                        value={user.Fname}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="Mname">Middle Name</label>
                      <input
                        id="Mname"
                        name="Mname"
                        value={user.Mname}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="Lname">Last Name <span className="text-red-500">*</span></label>
                      <input
                        id="Lname"
                        name="Lname"
                        value={user.Lname}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                  </div>

                  {/* Email, Phone, Blood Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="phno">Phone <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        id="phno"
                        name="phno"
                        value={user.phno}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="bg">Blood Group <span className="text-red-500">*</span></label>
                      <select
                        id="bg"
                        name="bg"
                        value={user.bg}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md w-full"
                      >
                        <option value="">Select</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                      </select>
                    </div>
                  </div>

                  {/* DOB, Gender, Marital Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={user.dob}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender">Gender <span className="text-red-500">*</span></label>
                      <select
                        id="gender"
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="marital">Marital Status <span className="text-red-500">*</span></label>
                      <select
                        id="marital"
                        name="marital"
                        value={user.marital}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                      >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                  </div>

                  {/* Temporary Address */}
                  <div>
                    <label className="font-medium">Temporary Address <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-2">
                      <input name="TempState" value={user.TempState} onChange={handleChange} placeholder="State" required className="p-2 border border-gray-300 rounded-md w-full" />
                      <input name="TempDist" value={user.TempDist} onChange={handleChange} placeholder="District" required className="p-2 border border-gray-300 rounded-md w-full" />
                      <input name="TempMun" value={user.TempMun} onChange={handleChange} placeholder="Sub/Metropolitan" required className="p-2 border border-gray-300 rounded-md w-full" />
                      <input name="TempAddress" value={user.TempAddress} onChange={handleChange} placeholder="Ward No" required className="p-2 border border-gray-300 rounded-md w-full" />
                      <input name="TempTol" value={user.TempTol} onChange={handleChange} placeholder="Tol" required className="p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                  </div>

                  {/* Permanent Address */}
                  <div>
                    <label className="font-medium">Permanent Address <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-2">
                      <input name="PerState" value={user.PerState} onChange={handleChange} placeholder="State" required className="p-2 border border-gray-300 rounded-md w-full" />
                      <input name="PerDist" value={user.PerDist} onChange={handleChange} placeholder="District" required className="p-2 border border-gray-300 rounded-md w-full" />
                      <input name="PerMun" value={user.PerMun} onChange={handleChange} placeholder="Sub/Metropolitan" required className="p-2 border border-gray-300 rounded-md w-full" />
                      <input name="PerAddress" value={user.PerAddress} onChange={handleChange} placeholder="Ward No" required className="p-2 border border-gray-300 rounded-md w-full" />
                      <input name="PerTol" value={user.PerTol} onChange={handleChange} placeholder="Tol" required className="p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                  </div>

                </div>

              )}

              {currentStep === 2 && (
                <div className="text-gray-600">
                  {/* Family Details */}
                  <section className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Family Details <span className="text-red-600">*</span>
                    </h3>

                    {/* Spouse */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
                      <p className="font-medium text-gray-700 dark:text-gray-300">Spouse / Husband-Wife</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <input
                          type="text"
                          name="Huswifname"
                          value={user.Huswifname}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                        <input
                          type="tel"
                          name="famphno"
                          value={user.famphno}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                        <div className="flex flex-col">
                          <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                            Upload Document
                            <input
                              type="file"
                              name="famdocfile"
                              onChange={handleFileChange}
                              accept="image/*,application/pdf"
                              className="hidden"
                            />
                          </label>
                          {user.famdocfile && (
                            <span className="text-xs text-gray-600 dark:text-gray-300 mt-1">{user.famdocfile.name}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mother */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
                      <p className="font-medium text-gray-700 dark:text-gray-300">Mother</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <input
                          type="text"
                          name="mothname"
                          value={user.mothname}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                        <input
                          type="tel"
                          name="mothphno"
                          value={user.mothphno}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                        <div className="flex flex-col">
                          <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                            Upload Document
                            <input
                              type="file"
                              name="mothdocfile"
                              onChange={handleFileChange}
                              accept="image/*,application/pdf"
                              className="hidden"
                            />
                          </label>
                          {user.mothdocfile && (
                            <span className="text-xs text-gray-600 dark:text-gray-300 mt-1">{user.mothdocfile.name}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Father */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
                      <p className="font-medium text-gray-700 dark:text-gray-300">Father</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <input
                          type="text"
                          name="fathname"
                          value={user.fathname}
                          onChange={handleChange}
                          placeholder="Full Name"
                          required
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                        <input
                          type="tel"
                          name="fathphno"
                          value={user.fathphno}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                        <div className="flex flex-col">
                          <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                            Upload Document
                            <input
                              type="file"
                              name="fathdocfile"
                              onChange={handleFileChange}
                              accept="image/*,application/pdf"
                              className="hidden"
                            />
                          </label>
                          {user.fathdocfile && (
                            <span className="text-xs text-gray-600 dark:text-gray-300 mt-1">{user.fathdocfile.name}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Grandfather */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
                      <p className="font-medium text-gray-700 dark:text-gray-300">Grandfather</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <input
                          type="text"
                          name="grandfathname"
                          value={user.grandfathname}
                          onChange={handleChange}
                          placeholder="Full Name"
                          required
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                        <input
                          type="tel"
                          name="grandfathno"
                          value={user.grandfathno}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                        <div className="flex flex-col">
                          <label className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                            Upload Document
                            <input
                              type="file"
                              name="grandfathdocfile"
                              onChange={handleFileChange}
                              accept="image/*,application/pdf"
                              className="hidden"
                            />
                          </label>
                          {user.grandfathdocfile && (
                            <span className="text-xs text-gray-600 dark:text-gray-300 mt-1">{user.grandfathdocfile.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>

                </div>
              )}

              {currentStep === 3 && (
                <div className="text-gray-600">
                  {/* Education */}
                  <section className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Educational Details <span className="text-red-600">*</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                      <label htmlFor="edu" className="text-gray-700 dark:text-gray-300 font-medium">
                        Highest Qualification
                      </label>
                      <select
                        id="edu"
                        name="edu"
                        value={user.edu}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                      >
                        <option value="">Select highest qualification</option>
                        <option>No formal education</option>
                        <option>Grade 5</option>
                        <option>Grade 8</option>
                        <option>SLC</option>
                        <option>+2</option>
                        <option>Bachelor</option>
                        <option>Master</option>
                      </select>
                    </div>
                  </section>

                </div>
              )}

              {currentStep === 4 && (
                <div className="text-gray-600">
                  {/* Document Information */}
                  <section className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Document Information <span className="text-red-600">*</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="doctype" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                          Document Type
                        </label>
                        <select
                          id="doctype"
                          name="doctype"
                          value={user.doctype}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        >
                          <option value="">Select document type</option>
                          <option value="Citizenship">Citizenship</option>
                          <option value="Passport">Passport</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="docno" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                          Document No
                        </label>
                        <input
                          id="docno"
                          name="docno"
                          value={user.docno}
                          onChange={handleChange}
                          placeholder="Document No"
                          required
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IssueDistrict" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                          Issued District
                        </label>
                        <input
                          id="IssueDistrict"
                          name="IssueDistrict"
                          value={user.IssueDistrict}
                          onChange={handleChange}
                          placeholder="Issued District"
                          required
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="IssueDate" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                          Issue Date
                        </label>
                        <input
                          id="IssueDate"
                          type="date"
                          name="IssueDate"
                          value={user.IssueDate}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mt-4">
                      <label htmlFor="docfile" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Upload Document <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="docfile"
                        type="file"
                        name="docfile"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        required
                        className="w-full text-gray-700 dark:text-gray-300"
                      />
                      {user.docfile && <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">{user.docfile.name}</div>}
                    </div>
                  </section>


                </div>
              )}

              {currentStep === 5 && (
                <section className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Bank Details <span className="text-red-600">*</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Account Holder Name */}
                    <div className="flex flex-col">
                      <label htmlFor="accountName" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Account Holder Name
                      </label>
                      <input
                        id="accountName"
                        name="accountName"
                        value={user.accountName || ""}
                        onChange={handleChange}
                        placeholder="Full Name as in bank"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                      />
                    </div>

                    {/* Bank Name */}
                    <div className="flex flex-col">
                      <label htmlFor="bankName" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Bank Name
                      </label>
                      <input
                        id="bankName"
                        name="bankName"
                        value={user.bankName || ""}
                        onChange={handleChange}
                        placeholder="Bank Name"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                      />
                    </div>

                    {/* Account Number */}
                    <div className="flex flex-col">
                      <label htmlFor="accountNo" className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Account Number
                      </label>
                      <input
                        id="accountNo"
                        name="accountNo"
                        value={user.accountNo || ""}
                        onChange={handleChange}
                        placeholder="e.g., 1234567890"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-600 transition"
                      />
                    </div>


                  </div>

                </section>

              )}

              {currentStep === 6 && (
                <div className="space-y-6 text-gray-700">
                  <h3 className="text-md font-medium dark:text-white">Submit</h3>
                  {/* Terms */}
                  <div className="flex items-start gap-3 mt-4">
                    <input id="terms" name="termsaggree" type="checkbox" checked={user.termsaggree} onChange={handleChange} required />
                    <label htmlFor="terms" className="text-sm">I agree to the terms and conditions.</label>
                  </div>

                  <div className="flex flex-col items-center justify-center mt-6">
                    <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60">
                      {submitting ? "Submitting..." : "Register New Admission"}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200">

              <button
                className="px-5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>

              <div className="flex gap-3">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  onClick={nextStep}
                  disabled={currentStep === steps.length}
                  className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-40"
                >
                  Next
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-3 space-y-6">

          {/* Image Uploads */}

          <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Profile Picture */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200 hover:ring-4 hover:ring-blue-400 transition-all duration-300 cursor-pointer">
              <img
                src={temppicUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
                <span className="text-white font-medium">Change</span>
              </div>
            </div>

            {/* Upload Button */}
            <div className="flex flex-col items-center gap-2 w-full">
              <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
                Upload Photo
                <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              {temppicUrl && (
                <button
                  type="button"
                  onClick={() => setTemppicUrl(null)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>


          {/* Progress Card */}
          <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Form Progress
            </h3>

            <div className="flex justify-between mb-2 text-sm">
              <span>Completion</span>
              <span className="text-purple-600 font-semibold">
                {progress}%
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {filledFields} of {totalFields} fields filled
            </p>
          </div>

          {/* Checklist Card */}
          <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">
              Admission Checklist
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border border-gray-400 rounded-full" />
                Personal Details
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border border-gray-400 rounded-full" />
                Upload Photo
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border border-gray-400 rounded-full" />
                Family Information
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border border-gray-400 rounded-full" />
                Educational Details
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 border border-gray-400 rounded-full" />
                Document Upload
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
