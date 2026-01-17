import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";

const Invoiceview = ({ setPage }) => {
  return (
    <div className="p-4 w-full h-full overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setPage("dashboard")}
        >
          <FaArrowLeftLong className="ml-2 size-5 text-gray-700 dark:text-white" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            Invoice
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" color="light">
            Refresh
          </Button>
          <button
            onClick={() => setPage("invoiceadd")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition"
          >
            + Add New Invoice
          </button>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 mb-4" />

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6 ml-2">
        {["All", "Paid", "Unpaid"].map((status) => (
          <button
            key={status}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition"
          >
            {status}
          </button>
        ))}
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th className="px-2 py-1 w-1/12">ID</th>
              <th className="px-2 py-1 w-2/12">Client</th>
              <th className="px-2 py-1 w-2/12">Post</th>
              <th className="px-2 py-1 w-1/12">Date</th>
              <th className="px-2 py-1 w-2/12">Expired Date</th>
              <th className="px-2 py-1 w-1/12">Total</th>
              <th className="px-2 py-1 w-1/12">Paid</th>
              <th className="px-2 py-1 w-1/12">Status</th>
              <th className="px-2 py-1 w-1/12">Payment</th>
              <th className="px-2 py-1 w-2/12">Created By</th>
              <th className="px-2 py-1 w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-green-100 dark:bg-green-900">
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                1
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                Kushal Luitel
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                Mokshya Tech
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                11/05/2025
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                11/06/2025
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                NRS 30,000
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                NRS 0.00
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                Draft
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                Unpaid
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                Rana Bdr Luitel
              </td>
              <td className="px-2 py-1 font-medium text-gray-900 dark:text-white">
                <button>
                  <BsThreeDots className="size-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoiceview;
