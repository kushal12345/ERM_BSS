import React, { useState, useEffect } from "react";
import { fetchstaff } from "../../Fetch/Fetchstaff";
import api from "../../../utils/api";


const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewmodalstaff, setViewmodalstaff] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleViewModal = (staff) => {
    setViewmodalstaff(staff);
    setShowViewModal(true);
  };


  const handleTerminate = async (empID) => {
    console.log(`Terminating employee with ID: ${empID}`);
    try {
      const response = await api.post(`/api/employees/${empID}`);
      
    } catch (error) {
      console.error("Error terminating staff:", error);
      alert("An error occurred while terminating staff.");
    }
  };

    useEffect(() => {
    fetchstaff(setStaffData, "all");
  }, [handleTerminate]);


  // Filtered staff based on search
  const filteredStaff = staffData.filter(
    (s) =>
      s.Fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.Lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phno.toLowerCase().includes(searchTerm.toLowerCase())  ||
      s.TempDist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.TempMun.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.TempAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.Post.toLowerCase().includes(searchTerm.toLowerCase())   ||
      s.edu.toLowerCase().includes(searchTerm.toLowerCase()) 
      );

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-[#212528] shadow-xl rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Staff List</h2>

      {/* Search */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or post..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-1/3 dark:bg-gray-700 dark:text-white"
        />
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0">
            <tr className="text-center">
              <th className="px-3 py-2 border">Full Name</th>
              <th className="px-3 py-2 border">Phone</th>
              <th className="px-3 py-2 border">Temporary Location</th>
              <th className="px-3 py-2 border">Post</th>
              <th className="px-3 py-2 border">Shift</th>
              <th className="px-3 py-2 border">Actions</th>
              <th className="px-3 py-2 border">Terminate</th>
            </tr>
          </thead>
          <tbody>
            {currentStaff.map((s) => (
              <tr key={s.id} className="text-center bg-gray-50 dark:bg-gray-900">
                <td className="px-2 py-1 border">{`${s.Fname} ${s.Mname ? s.Mname + " " : ""}${s.Lname}`}</td>
                <td className="px-2 py-1 border">{s.phno}</td>
                <td className="px-2 py-1 border">{`${s.TempDist}, ${s.TempMun}, ${s.TempAddress}`}</td>
                <td className="px-2 py-1 border">{s.Post}</td>
                <td className="px-2 py-1 border">{s.Shift}</td>
                <td className="px-2 py-1 border">
                  <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={()=>handleViewModal(s)}>
                    View
                  </button>
                </td>
                <td className="px-2 py-1 border">
                  <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700" onClick={()=>{handleTerminate(s._id)}}>
                    Terminate
                  </button>
                </td>
              </tr>
            ))}
            {currentStaff.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      {/* View Modal */}
      {/* VIEW MODAL OUTPUT VERSION */}
        {/* VIEW MODAL CLEAN & REFINED DESIGN */}
{showViewModal && viewmodalstaff && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center 
                  rounded-full bg-gray-200 dark:bg-gray-700 
                  text-gray-700 dark:text-gray-300 
                  hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        onClick={() => setShowViewModal(false)}
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Staff Details
      </h2>

      {/* Profile Photo */}
      <div className="flex justify-center mb-6">
        <img
          src={
            viewmodalstaff?.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Profile"
          className="h-32 w-32 rounded-full object-cover border shadow"
        />
      </div>

      {/* DETAILS GRID */}
      <div className="space-y-6">

        {/* Personal Info */}
        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><span className="font-medium">First Name:</span> {viewmodalstaff?.Fname}</div>
            <div><span className="font-medium">Middle Name:</span> {viewmodalstaff?.Mname || "-"}</div>
            <div><span className="font-medium">Last Name:</span> {viewmodalstaff?.Lname}</div>
            <div><span className="font-medium">Email:</span> {viewmodalstaff?.email}</div>
            <div><span className="font-medium">Phone:</span> {viewmodalstaff?.phno}</div>
            <div><span className="font-medium">Blood Group:</span> {viewmodalstaff?.bg || "-"}</div>
            <div><span className="font-medium">Date of Birth:</span> {viewmodalstaff?.dob || "-"}</div>
            <div><span className="font-medium">Gender:</span> {viewmodalstaff?.gender || "-"}</div>
            <div><span className="font-medium">Marital Status:</span> {viewmodalstaff?.marrital || "-"}</div>
          </div>
        </section>

        {/* Temporary Address */}
        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Temporary Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-sm">
            <div><span className="font-medium">State:</span> {viewmodalstaff?.TempState || "-"}</div>
            <div><span className="font-medium">District:</span> {viewmodalstaff?.TempDist || "-"}</div>
            <div><span className="font-medium">Municipality:</span> {viewmodalstaff?.TempMun || "-"}</div>
            <div><span className="font-medium">Ward:</span> {viewmodalstaff?.TempAddress || "-"}</div>
            <div><span className="font-medium">Tol:</span> {viewmodalstaff?.TempTol || "-"}</div>
          </div>
        </section>

        {/* Permanent Address */}
        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Permanent Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-sm">
            <div><span className="font-medium">State:</span> {viewmodalstaff?.PerState || "-"}</div>
            <div><span className="font-medium">District:</span> {viewmodalstaff?.PerDist || "-"}</div>
            <div><span className="font-medium">Municipality:</span> {viewmodalstaff?.PerMun || "-"}</div>
            <div><span className="font-medium">Ward:</span> {viewmodalstaff?.PerAddress || "-"}</div>
            <div><span className="font-medium">Tol:</span> {viewmodalstaff?.PerTol || "-"}</div>
          </div>
        </section>

        {/* Document Info */}
        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Document Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
            <div><span className="font-medium">Type:</span> {viewmodalstaff?.doctype || "-"}</div>
            <div><span className="font-medium">Number:</span> {viewmodalstaff?.docno || "-"}</div>
            <div><span className="font-medium">Issued District:</span> {viewmodalstaff?.IssueDistrict || "-"}</div>
            <div><span className="font-medium">Issue Date:</span> {viewmodalstaff?.IssueDate || "-"}</div>
          </div>
          {viewmodalstaff?.docfile && (
            <a
              href={viewmodalstaff.docfile}
              target="_blank"
              className="text-blue-600 underline text-sm mt-2 block"
            >
              View Document
            </a>
          )}
        </section>

        {/* Family Info */}
        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Family Details</h3>
          {["Huswif", "moth", "fath", "grandfath"].map((role) => (
            <div key={role} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
              <div><span className="font-medium">{role === "Huswif" ? "Spouse" : role.charAt(0).toUpperCase() + role.slice(1)} Name:</span> {viewmodalstaff?.[role + "name"] || "-"}</div>
              <div><span className="font-medium">Phone:</span> {viewmodalstaff?.[role + "phno"] || "-"}</div>
              <div>
                {viewmodalstaff?.[role + "docfile"] ? (
                  <a href={viewmodalstaff[role + "docfile"]} className="text-blue-500 underline">Document</a>
                ) : <span>-</span>}
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Educational Qualification</h3>
          <p>{viewmodalstaff?.edu || "-"}</p>
        </section>

      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default StaffList;
