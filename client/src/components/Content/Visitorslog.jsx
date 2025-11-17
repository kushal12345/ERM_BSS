import { useEffect, useState } from "react";
import React from "react";
import api from "../../utils/api";
import { fetchVisitors } from "../Fetch/Fetchvisitors";
import TrainingFeeForm from "./Trainingfeecoll";
import { FaEdit } from "react-icons/fa";


const VisitorsLog = () => {
  const initialForm = {
    Fname: "",
    Refname: "",
    TempAddress: "",
    PermAddress: "",
    Category: "Civil",
    PastExperience: "",
    EducationQualification: "",
    Height: "",
    Weight: "",
    PhysicalTest: "",
    TrainingFee: "",
    Age: "",
    Phone: "",
  };
  const [staffData, setStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");  
  const [activeTab, setActiveTab] = useState("form");
  const [formData, setFormData] = useState(initialForm);
  const [visitors, setVisitors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [trainingModalOpen, setTrainingModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  useEffect(() => {
    fetchVisitors(setVisitors);
  }, [activeTab,formData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Category: e.target.value,
      PastExperience: "",
    }));
  };

  // Submit form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/visitor", formData);
      
      setVisitors((prev) => [...prev, res.data]);
      setFormData(initialForm);
      setActiveTab("list");
      
    } catch (error) {
      console.error("Error submitting visitor:", error);
    }
  };

  const handleTrainingFee = (visitor) => {
    setSelectedVisitor(visitor);
    setTrainingModalOpen(true);

  }

  

  // Hire modal
  const handleHireClick = (visitor) => {
    setSelectedVisitor(visitor);
    setModalOpen(true);
  };

  const handlePhysicalTest = async (status) => {
  try {
    await api.put(`/api/visitor/${selectedVisitor._id}`, {
      PhysicalTest: status,
      TrainingFee: status === "qualified" ? "" : selectedVisitor.TrainingFee,
    });

    setSelectedVisitor(prev => ({
      ...prev,
      PhysicalTest: status,
      TrainingFee: status === "qualified" ? "" : prev.TrainingFee,
    }));

    setVisitors(prev =>
      prev.map(v =>
        v._id === selectedVisitor._id
          ? { ...v, PhysicalTest: status, TrainingFee: status === "qualified" ? "" : v.TrainingFee }
          : v
      )
    );
  } catch (error) {
    console.error("Failed to update physical test:", error);
  }
};


  const handleTrainingFeeChange = async (e) => {
    const fee = e.target.value;

    try {
      await api.put(`/api/visitor/${selectedVisitor._id}`, {
        TrainingFee: fee,
      });

      setSelectedVisitor((prev) => ({
        ...prev,
        TrainingFee: fee,
      }));

      setVisitors((prev) =>
        prev.map((v) =>
          v._id === selectedVisitor._id ? { ...v, TrainingFee: fee } : v
        )
      );
    } catch (err) {
      console.error("Failed to update training fee:", err);
    }
  };
    useEffect(() => {
      setStaffData(visitors);
    }, [visitors]);
  
    console.log(staffData);

   // Filtered staff based on search
  const filteredStaff = staffData.filter((s) => {
  const term = searchTerm.toLowerCase();
const createdDate = new Date(s.createdAt).toISOString().slice(0, 10);

  return (
    s.Fname.toLowerCase().includes(term) ||
    s.Category.toLowerCase().includes(term) ||
    s.EducationQualification.toLowerCase().includes(term) ||
    s.PhysicalTest.toLowerCase().includes(term) ||
    s.TempAddress.toLowerCase().includes(term) ||     // location added
    s.PermAddress.toLowerCase().includes(term)   ||
     createdDate.includes(term)     // location added
  );
});

   // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVisitor(null);
  };
  return (
    <div className="w-full mx-auto h-[80vh] overflow-y-auto no-scrollbar p-4 bg-white dark:bg-[#212528] rounded-lg shadow-xl space-y-4">
      <h2 className="text-3xl font-bold dark:text-white text-center mb-4">
        Visitors Management
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab("form")}
          className={`px-2 py-2 font-semibold ${
            activeTab === "form"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Add Visitor
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={`px-2 py-2 font-semibold ${
            activeTab === "list"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Visitors List
        </button>
      </div>

      {/* FORM TAB */}
      {activeTab === "form" ? (
        <form onSubmit={handleSubmitForm} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="Fname"
              value={formData.Fname}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Referrer */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Referrer Name
            </label>
            <input
              type="text"
              name="Refname"
              value={formData.Refname}
              onChange={handleChange}
              placeholder="Enter referrer name"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Temp Address */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Temporary Address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="TempAddress"
              value={formData.TempAddress}
              onChange={handleChange}
              placeholder="Enter temporary address"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Perm Address */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Permanent Address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="PermAddress"
              value={formData.PermAddress}
              onChange={handleChange}
              placeholder="Enter permanent address"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Category <span className="text-red-600">*</span>
            </label>
            <div className="flex space-x-4 mt-1">
              {["EX Army", "EX Police", "Civil"].map((cat) => (
                <label key={cat} className="flex items-center space-x-2 dark:text-white">
                  <input
                    type="radio"
                    value={cat}
                    checked={formData.Category === cat}
                    onChange={handleCategoryChange}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Past Exp */}
          {formData.Category === "Civil" && (
            <div className="flex flex-col">
              <label className="font-semibold dark:text-white mb-1">
                Past Security Experience
              </label>
              <input
                type="text"
                name="PastExperience"
                value={formData.PastExperience}
                onChange={handleChange}
                placeholder="Enter past company experience"
                className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {/* Education */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Education Qualification <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="EducationQualification"
              value={formData.EducationQualification}
              onChange={handleChange}
              placeholder="Enter education qualification"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Height */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="Height"
              value={formData.Height}
              onChange={handleChange}
              placeholder="Enter height"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Weight */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              name="Weight"
              value={formData.Weight}
              onChange={handleChange}
              placeholder="Enter weight"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Age
            </label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              placeholder="Enter age"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">
              Phone No <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Save Visitor
            </button>
          </div>
        </form>
      ) : (
        /* VISITORS LIST TAB */
        <div className="overflow-auto">
          {/* Search */}
            <div className="flex items-center justify-center">
              <b className="mr-2">Search:</b>
              <input
                type="text"
                placeholder="Search by name or post..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded-lg w-1/3 dark:bg-gray-700 dark:text-white"
              />
              
            </div>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
              <tr>
                <th className="px-2 py-2 text-left">Date</th>
                <th className="px-2 py-2 text-left">Full Name</th>
                <th className="px-2 py-2 text-left">Category</th>
                <th className="px-2 py-2 text-left">Temporary Address</th>
                <th className="px-2 py-2 text-left">Permanent Address</th>
                <th className="px-2 py-2 text-left">Physical Test</th>
                <th className="px-2 py-2 text-left">Training Fee</th>
                <th className={`px-2 py-2 text-left`}>Payment</th>
                <th className="px-2 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentStaff.map((v) => (
                <tr key={v._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-2 py-2">{new Date(v.createdAt).toLocaleDateString()}</td>
                  <td className="px-2 py-2">{v.Fname}</td>
                  <td className="px-2 py-2">{v.Category}</td>
                  <td className="px-2 py-2">{v.TempAddress}</td>
                  <td className="px-2 py-2">{v.PermAddress}</td>
                  <td className="px-2 py-2">{v.PhysicalTest || "-"}</td>
                  <td className="px-2 py-2">{v.TrainingFee || "-"}</td>
                  <td className={`px-2 py-2`}>
                   <button
                        onClick={() => handleTrainingFee(v)}
                        className={`px-2 py-1 rounded-lg text-white ${
                          v.PhysicalTest === "failed" && v.TrainingFee > 0
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-400 cursor-not-allowed"
                        } ${!v.Voucher ? "bg-red-500 hover:bg-red-600" : ""}`}
                        disabled={!(v.PhysicalTest === "failed" && v.TrainingFee > 0)}
                      >
                        {!v.Voucher ? "Not Paid" : "Paid"}
                  </button>

                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={()=>{if(v.VerificationStatus === 'Approved') alert('Now you can Hire Staff')}}
                      className={`px-3 py-1 bg-gray-500 text-white rounded-lg  ${v.VerificationStatus === 'Approved' ? `bg-green-500 hover:bg-green-600` : v.VerificationStatus === 'Rejected' ? 'bg-red-500 disabled' : 'bg-yellow-400 disabled'}`}
                    >
                      {v.VerificationStatus === 'Approved' ? "Hire" : "Pending"}
                    </button>
                  </td>
                    <td className="py-2 cursor-pointer" onClick={() => handleHireClick(v)}><FaEdit/></td>
                </tr>
              ))}
            </tbody>
          </table>
              <span className="text-sm flex items-center justify-center text-gray-500 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
          {/* Pagination Controls */}
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white disabled:opacity-50"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
        </div>
      )}

      {/* MODAL */}
      {modalOpen && selectedVisitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#212528] rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="text-xl font-semibold dark:text-white">Hire Visitor</h3>

            <p className="dark:text-white">
              Inspect physical test for <strong>{selectedVisitor.Fname}</strong>
            </p>

            <div className="flex space-x-4">
              <button
                onClick={() => handlePhysicalTest("qualified")}
                className="px-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                ✅ Qualified
              </button>

              <button
                onClick={() => handlePhysicalTest("failed")}
                className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ❌ Failed
              </button>
            </div>

            {/* Training fee input only if failed */}
            {selectedVisitor.PhysicalTest === "failed" && (
              <div className="mt-4 flex flex-col">
                <label className="mb-1 font-semibold dark:text-white">
                  Training Fee
                </label>
                <input
                  type="number"
                  value={selectedVisitor.TrainingFee || ""}
                  onChange={handleTrainingFeeChange}
                  className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="px-2 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {
        trainingModalOpen && selectedVisitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <TrainingFeeForm visitor={selectedVisitor} onClose={() => setTrainingModalOpen(false)} />
        </div>
        )
      }
    </div>
  );
};

export default VisitorsLog;
