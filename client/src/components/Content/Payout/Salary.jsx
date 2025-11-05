import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

const SalaryRec = () => {
  const [active, setActive] = useState("bs");
  const [searchTerm, setSearchTerm] = useState("");

  const [isCheckedBS, setIsCheckedBS] = useState(Array(3).fill(false));
  const [isCheckedAD, setIsCheckedAD] = useState(Array(3).fill(false));

  const staffListBS = [
    { name: "Ramesh Shrestha", phone: "9841449298", duty: "Samakhusi, KTM", salary: 15000 },
    { name: "Anita Gurung", phone: "9808123456", duty: "Baneshwor, KTM", salary: 18000 },
    { name: "Kiran Basnet", phone: "9811122334", duty: "Maharajgunj, KTM", salary: 17000 },
  ];

  const staffListAD = [
    { name: "Hari Sharma", phone: "9841223344", duty: "Lazimpat, KTM", salary: 20000 },
    { name: "Sita Karki", phone: "9811772233", duty: "New Road, KTM", salary: 16000 },
  ];

  const handleCheckboxClick = (index, type) => {
    if (type === "bs") {
      setIsCheckedBS((prev) => {
        const copy = [...prev];
        copy[index] = !copy[index];
        return copy;
      });
    } else {
      setIsCheckedAD((prev) => {
        const copy = [...prev];
        copy[index] = !copy[index];
        return copy;
      });
    }
  };

  const filteredBS = useMemo(
    () => staffListBS.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );

  const filteredAD = useMemo(
    () => staffListAD.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );

  const renderTable = (list, checkedState, type) => (
    <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
          <tr className="text-center">
            <th className="px-3 py-3">Staff Name</th>
            <th className="px-3 py-3">Phone</th>
            <th className="px-3 py-3">Duty Location</th>
            <th className="px-3 py-3">Salary</th>
            <th className="px-3 py-3">Voucher</th>
            <th className="px-3 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s, index) => (
            <tr
              key={index}
              className="text-center border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="px-3 py-4 font-medium text-gray-900 dark:text-white">{s.name}</td>
              <td className="px-3 py-4">{s.phone}</td>
              <td className="px-3 py-4">{s.duty}</td>
              <td className="px-3 py-4">{s.salary}</td>
              <td className="px-3 py-4">
                <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-3 py-1.5 transition">
                  Upload
                </button>
              </td>
              <td className="px-3 py-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkedState[index]}
                    onChange={() => handleCheckboxClick(index, type)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 
                    peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:bg-green-500">
                  </div>
                </label>
                <span
                  className={`ml-2 text-xs font-semibold ${
                    checkedState[index] ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {checkedState[index] ? "Paid" : "Unpaid"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full h-screen p-4 overflow-y-scroll bg-white border border-gray-200 dark:bg-[#1b1e23] shadow-xl rounded-xl no-scrollbar">
      <h1 className="text-2xl font-bold mb-2 dark:text-white">Salary Payout</h1>
      <hr className="mb-4 border-gray-300 dark:border-gray-700" />

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-4 justify-center">
        <button
          type="button"
          onClick={() => setActive("bs")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            active === "bs"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          B.S
        </button>
        <button
          type="button"
          onClick={() => setActive("ad")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            active === "ad"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          A.D
        </button>
      </div>

      {/* Search Box */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:outline-none
                      dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="text-center mb-4 text-gray-700 dark:text-gray-300">
        <p className="font-semibold">
          {active === "bs" ? "Nepali Date - Month: Falgun" : "English Date - Month: March"}
        </p>
        <p className="text-xs">
          <b>Note:</b> 1% TDS automatically reduced and 32% reduction applies to SSF-registered employees.
        </p>
      </div>

      {/* Table */}
      {active === "bs"
        ? renderTable(filteredBS, isCheckedBS, "bs")
        : renderTable(filteredAD, isCheckedAD, "ad")}
    </div>
  );
};

export default SalaryRec;
