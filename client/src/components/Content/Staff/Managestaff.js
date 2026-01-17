import React, { useEffect, useState } from "react";
import { fetchHired } from "../../Fetch/Fetchhired";
import { fetchTerminated } from "../../Fetch/FetchTerminated";
import { terminateEmp } from "../../Terminate/terminateemp";
import Modal from "../Modal";

const ManageStaff = () => {
  const [active, setActive] = useState("Active");
  const [data, setData] = useState([]);
  const [dataT, setDataT] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (active === "Active") {
      fetchHired(setData);
    } else if (active === "Terminated") {
      fetchTerminated(setDataT);
    }
  }, [active]);

  // Filter active staff based on search term
  const filteredData =
    active === "Active"
      ? data.filter(
          (d) =>
            d.empID?.[0]?.Fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.empID?.[0]?.Lname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.post?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : dataT.filter(
          (d) =>
            d.Fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.Lname?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  if (!data && active === "Active") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold dark:text-white">Manage Your Staff</h2>
      <hr className="my-2 border-gray-300 dark:border-gray-700" />

      {/* Search */}
      <div className="my-4 max-w-md">
        <div className="relative">
          <input
            type="search"
            placeholder="Search Staffs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={() => setActive("Active")}
          className={`rounded-l-lg border px-4 py-2 text-sm font-medium ${
            active === "Active"
              ? "bg-blue-600 text-white"
              : "border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          }`}
        >
          Active Staffs
        </button>
        <button
          type="button"
          onClick={() => setActive("Terminated")}
          className={`rounded-r-lg border px-4 py-2 text-sm font-medium ${
            active === "Terminated"
              ? "bg-blue-600 text-white"
              : "border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          }`}
        >
          Terminated Staffs
        </button>
      </div>

      {/* Active Staffs */}
      {active === "Active" && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Phone No</th>
                <th className="px-6 py-3">Duty Location</th>
                <th className="px-6 py-3">Duty Hours</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">More Details</th>
                <th className="px-6 py-3">Terminate</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((d, i) => (
                <tr
                  key={i}
                  className={`border-b ${
                    d.empID?.[0]?.Fname ? "bg-green-200" : "bg-red-400"
                  } dark:border-gray-700`}
                >
                  <td className="px-6 py-4 font-medium dark:text-white">
                    {d.empID?.[0]
                      ? `${d.empID[0].Fname} ${d.empID[0].Mname || ""} ${d.empID[0].Lname}`
                      : ""}
                  </td>
                  <td className="px-6 py-4 dark:text-white">{d.empID?.[0]?.phno || ""}</td>
                  <td className="px-6 py-4 dark:text-white">
                    <b>{d.post}</b>
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {d.hrs} Hours per {d.shift}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {d.empID?.[0]?.Fname ? `${d.salary} /- per month` : "NRs 0"}
                  </td>
                  <td className="px-6 py-4">
                    {d.empID?.[0]?.Fname && (
                      <button
                        className="text-blue-600 hover:underline dark:text-blue-500"
                        onClick={() => {
                          setSelectedEmployee(d.empID[0]);
                          setShowModal(true);
                        }}
                      >
                        Details
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {d.empID?.[0]?.Fname && (
                      <button
                        className="text-red-600 hover:underline dark:text-red-500"
                        onClick={() => terminateEmp(d.empID[0]._id, setData)}
                      >
                        Terminate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-center dark:text-gray-300">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Terminated Staffs */}
      {active === "Terminated" && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Phone No</th>
                <th className="px-6 py-3">Father's Name</th>
                <th className="px-6 py-3">Gender</th>
                <th className="px-6 py-3">Temporary Address</th>
                <th className="px-6 py-3">Re-Hire</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((d, i) => (
                <tr
                  key={i}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                >
                  <td className="px-6 py-4 dark:text-white">
                    {`${d.Fname || ""} ${d.Mname || ""} ${d.Lname || ""}`}
                  </td>
                  <td className="px-6 py-4 dark:text-white">{d.phno || ""}</td>
                  <td className="px-6 py-4 dark:text-white">{d.fathname || ""}</td>
                  <td className="px-6 py-4 dark:text-white">{d.gender || ""}</td>
                  <td className="px-6 py-4 dark:text-white">
                    {`${d.TempTol || ""} ${d.TempMun || ""} ${d.TempDist || ""}`}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-600 hover:underline dark:text-red-500"
                      onClick={() => {
                        setSelectedEmployee(d);
                        setShowModal(true);
                      }}
                    >
                      Hire Again?
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-center dark:text-gray-300">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default ManageStaff;
