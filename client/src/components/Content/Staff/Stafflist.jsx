import React, { useState, useEffect } from "react";

// Sample staff data
const sampleStaff = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  fname: `First${i + 1}`,
  mname: i % 2 === 0 ? `M${i + 1}` : "",
  lname: `Last${i + 1}`,
  phone: `9800000${i + 1}`,
  post: i % 3 === 0 ? "Supervisor" : "Security Guard",
  shift: i % 2 === 0 ? "Day" : "Night",
}));

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Replace with API fetch
    setStaffData(sampleStaff);
  }, []);

  // Filtered staff based on search
  const filteredStaff = staffData.filter(
    (s) =>
      s.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.post.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th className="px-3 py-2 border">ID</th>
              <th className="px-3 py-2 border">Full Name</th>
              <th className="px-3 py-2 border">Phone</th>
              <th className="px-3 py-2 border">Post</th>
              <th className="px-3 py-2 border">Shift</th>
            </tr>
          </thead>
          <tbody>
            {currentStaff.map((s) => (
              <tr key={s.id} className="text-center bg-gray-50 dark:bg-gray-900">
                <td className="px-2 py-1 border">{s.id}</td>
                <td className="px-2 py-1 border">{`${s.fname} ${s.mname ? s.mname + " " : ""}${s.lname}`}</td>
                <td className="px-2 py-1 border">{s.phone}</td>
                <td className="px-2 py-1 border">{s.post}</td>
                <td className="px-2 py-1 border">{s.shift}</td>
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
    </div>
  );
};

export default StaffList;
