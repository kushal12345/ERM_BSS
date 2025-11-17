import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { fetchVisitors } from "../Fetch/Fetchvisitors";

const TrainingFeeTab = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
      fetchVisitors(setVisitors);
  }, []);

  
  const approvePayment = async (id) => {
    try {
      await api.put(`/api/visitor/${id}`, {
        VerificationStatus: "Approved",
      });

      setVisitors((prev) =>
        prev.map((v) => (v._id === id ? { ...v, VerificationStatus: "Approved" } : v))
      );
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#212528] rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Financial Verification Panel
      </h2>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-2 py-2 text-left">Name</th>
            <th className="px-2 py-2 text-left">Category</th>
            <th className="px-2 py-2 text-left">Training Fee</th>
            <th className="px-2 py-2 text-left">Voucher</th>
            <th className="px-2 py-2 text-left">Payment Status</th>
            <th className="px-2 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors
            .filter((v) => v.PhysicalTest === "failed" && v.TrainingFee > 0)
            .map((v) => (
              <tr key={v._id} className="border-b">
                <td className="px-2 py-2">{v.Fname}</td>
                <td className="px-2 py-2">{v.Category}</td>
                <td className="px-2 py-2">{v.TrainingFee}</td>

                <td className="px-2 py-2">
                  {v.Voucher ? (
                    <a
                      href={`/${v.Voucher}`}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      View Voucher
                    </a>
                  ) : (
                    "Not Uploaded"
                  )}
                </td>

                <td className="px-2 py-2">
                  {v.VerificationStatus || "Pending"}
                </td>

                <td className="px-2 py-2">
                  <button
                    disabled={!v.Voucher}
                    onClick={() => approvePayment(v._id)}
                    className={`px-3 py-1 rounded text-white 
                      ${v.VerificationStatus === "Approved"
                        ? "bg-green-500"
                        : v.Voucher
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                      }
                    `}
                  >
                    {v.VerificationStatus === "Approved" ? "Approved" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingFeeTab;

