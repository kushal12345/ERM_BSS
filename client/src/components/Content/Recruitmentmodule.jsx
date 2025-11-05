import React, { useState, useEffect } from "react";

const RecruitmentModule = ({ jobData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Applied, Interviewed, Hired, Rejected
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(jobData || []);
  }, [jobData]);

  // Filter based on search and status
  const filteredData = data.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" || d.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (index, value) => {
    const updated = [...data];
    updated[index].status = value;
    setData(updated);
  };

  return (
    <div className="w-full h-full p-3 pt-5 overflow-hidden bg-white dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
      <h2 className="mx-6 font-bold text-xl dark:text-white">
        Recruitment Module
      </h2>
      <hr className="mx-6 my-2 border border-gray-300 dark:border-gray-700" />

      {/* Filters */}
      <div className="flex justify-between mx-6 my-3">
        <div className="flex space-x-2">
          {["Applied", "Interviewed", "Hired", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-white ${
                statusFilter === status ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              {status}
            </button>
          ))}
          <button
            onClick={() => setStatusFilter("")}
            className="px-3 py-1 rounded-lg bg-gray-500 text-white"
          >
            All
          </button>
        </div>
        <input
          type="text"
          placeholder="Search Applicants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-1"
        />
      </div>

      {/* Table */}
      <div className="max-w-full h-[70%] overflow-x-auto">
        <div className="relative shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left table-fixed text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center align-middle">
                <th className="px-2 py-1">ID</th>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Email</th>
                <th className="px-2 py-1">Phone</th>
                <th className="px-2 py-1">Position Applied</th>
                <th className="px-2 py-1">Resume</th>
                <th className="px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 dark:text-gray-300">
                    No applicants found.
                  </td>
                </tr>
              ) : (
                filteredData.map((applicant, index) => (
                  <tr
                    key={index}
                    className={`text-center align-middle border-b border-gray-200 dark:border-gray-700 ${
                      applicant.status === "Hired"
                        ? "bg-green-200"
                        : applicant.status === "Rejected"
                        ? "bg-red-200"
                        : applicant.status === "Interviewed"
                        ? "bg-yellow-200"
                        : ""
                    }`}
                  >
                    <td className="px-2 py-1 font-medium dark:text-white">{index + 1}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{applicant.name}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{applicant.email}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{applicant.phone}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">{applicant.position}</td>
                    <td className="px-2 py-1 font-medium dark:text-white">
                      <a href={applicant.resume} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        View
                      </a>
                    </td>
                    <td className="px-2 py-1">
                      <select
                        value={applicant.status || ""}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        className="h-8 w-full p-1 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewed">Interviewed</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentModule;
