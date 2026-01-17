import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  BarChart3,
  Home,
  DollarSign,
  Users,
  FileText,
  Settings,
  Download,
  Filter,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";

const PayrollReports = () => {
  const [selectedStaff, setSelectedStaff] = useState("Select Staff");
  const [staffOpen, setStaffOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");

  const payrollData = [
    {
      year: 2080,
      month: "Chaitra",
      regularHours: "12h",
      post: "Nurse City",
      amount: "Rs. 18,000",
      overtime: "3h",
      otAmount: "Rs. 1,500",
      status: "Paid",
    },
    {
      year: 2081,
      month: "Baisakh",
      regularHours: "12h",
      post: "Nurse City",
      amount: "Rs. 18,000",
      overtime: "3h",
      otAmount: "Rs. 1,500",
      status: "Pending",
    },
  ];

  const staffMembers = ["Kushal", "Anita", "Ramesh", "Sita"];

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* HEADER */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Payroll Management
          </h2>

          {/* CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">

            {/* STAFF SELECT */}
            <div className="w-full sm:max-w-xs">
              <label className="text-sm font-semibold text-slate-600 mb-1 block">
                Staff Member
              </label>
              <div className="relative">
                <button
                  onClick={() => setStaffOpen(!staffOpen)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 flex items-center justify-between text-sm"
                >
                  <span className="text-slate-700">{selectedStaff}</span>
                  <ChevronDown
                    size={16}
                    className={`transition ${staffOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {staffOpen && (
                  <div className="absolute z-20 w-full bg-white border rounded-md mt-1 shadow">
                    {staffMembers.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedStaff(s);
                          setStaffOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-100"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-white border rounded-md text-sm flex items-center gap-1">
                <Filter size={14} /> Filter
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm flex items-center gap-1">
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-4 border-b text-sm">
            {["summary", "details", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-500"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* SUMMARY */}
          {activeTab === "summary" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Salary", value: "Rs. 36,000", icon: DollarSign },
                { label: "OT Hours", value: "6h", icon: Clock },
                { label: "SSF", value: "Rs. 5,860", icon: TrendingUp },
                { label: "Net", value: "Rs. 41,860", icon: AlertCircle },
              ].map((c, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs text-slate-500">{c.label}</p>
                    <p className="text-lg font-bold text-slate-800">{c.value}</p>
                  </div>
                  <c.icon className="text-blue-600" size={20} />
                </div>
              ))}
            </div>
          )}

          {/* TABLE */}
          <div className="bg-white border rounded-lg overflow-x-auto">
            <div className="px-4 py-2 border-b font-semibold text-slate-700">
              Payment History
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["Year", "Month", "Hours", "Post", "Amount", "OT", "Status"].map(
                    (h) => (
                      <th key={h} className="px-3 py-2 text-left font-semibold">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {payrollData.map((r, i) => (
                  <tr key={i} className="border-t hover:bg-slate-50">
                    <td className="px-3 py-2">{r.year}</td>
                    <td className="px-3 py-2">{r.month}</td>
                    <td className="px-3 py-2">{r.regularHours}</td>
                    <td className="px-3 py-2">{r.post}</td>
                    <td className="px-3 py-2 font-semibold text-blue-600">
                      {r.amount}
                    </td>
                    <td className="px-3 py-2">{r.overtime}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          r.status === "Paid"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PayrollReports;
