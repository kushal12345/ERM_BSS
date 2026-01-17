import React, { useState, useEffect } from "react";
import { BsPlus, BsThreeDots } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import InvoiceSample from "../Invoice/Newinvoice";

const clients = [
  { id: 1, name: "ABC Pvt. Ltd", phone: "9841449298", address: "Kathmandu" },
  { id: 2, name: "XYZ Company", phone: "9841556677", address: "Lalitpur" },
];

const InvoiceManagement = ({ setPage }) => {
  const [dateSystem, setDateSystem] = useState("bs");
  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const newInvoices = clients.map((client) => ({
      ...client,
      month: dateSystem === "bs" ? "Falgun 2081" : "March 2025",
      amount: 20000,
      status: "Pending",
    }));
    setInvoices(newInvoices);
  }, [dateSystem]);

  const filteredInvoices =
    filter === "all" ? invoices : invoices.filter((inv) => inv.status.toLowerCase() === filter);

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setShowModal(true);
  };

  const handleSave = () => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === editingInvoice.id ? editingInvoice : inv))
    );
    setEditingInvoice(null);
    setShowModal(false);
  };

  const handleConfirm = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "Confirmed" } : inv))
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#1b1e23]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage("home")}>
          <FaArrowLeft className="text-xl dark:text-white" />
          <h1 className="text-2xl font-bold dark:text-white">Invoices</h1>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 transition"
            onClick={() => setInvoices([...invoices])}
          >
            Refresh
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-700 transition"
            onClick={() => setPage("invoiceadd")}
          >
            <BsPlus /> Add Invoice
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Invoices", value: invoices.length, color: "bg-blue-500" },
          {
            title: "Pending",
            value: invoices.filter((i) => i.status === "Pending").length,
            color: "bg-yellow-400",
          },
          {
            title: "Confirmed",
            value: invoices.filter((i) => i.status === "Confirmed").length,
            color: "bg-green-500",
          },
          { title: "Clients", value: clients.length, color: "bg-purple-500" },
        ].map((card) => (
          <div
            key={card.title}
            className={`p-2 rounded-lg shadow-md flex justify-between items-center ${card.color} text-white`}
          >
            <div >
              <p className="text-sm font-medium">{card.title}</p>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
            <div className="text-3xl opacity-30">•</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "pending", "confirmed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md font-medium capitalize ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-[#202528] text-xs uppercase text-gray-600 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((inv) => (
              <tr
                key={inv.id}
                className="bg-white dark:bg-[#202528] border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2">{inv.name}</td>
                <td className="px-4 py-2">{inv.phone}</td>
                <td className="px-4 py-2">{inv.address}</td>
                <td className="px-4 py-2">{inv.month}</td>
                <td className="px-4 py-2">
                  {editingInvoice?.id === inv.id ? (
                    <input
                      type="number"
                      value={editingInvoice.amount}
                      onChange={(e) =>
                        setEditingInvoice({ ...editingInvoice, amount: e.target.value })
                      }
                      className="border rounded px-2 py-1 w-24 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    `NRS ${inv.amount.toLocaleString()}`
                  )}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      inv.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {editingInvoice?.id === inv.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(inv)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleConfirm(inv.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                  >
                    Confirm
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <BsThreeDots />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      {showModal && (
        <InvoiceSample
          showModal={showModal}
          invoice={editingInvoice}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default InvoiceManagement;
