import React, { useState, useEffect } from "react";
import InvoiceSample from "../Invoice/Newinvoice";

// Mock client data (you can fetch from API)
const clients = [
  { id: 1, name: "ABC Pvt. Ltd", phone: "9841449298", address: "Kathmandu" },
  { id: 2, name: "XYZ Company", phone: "9841556677", address: "Lalitpur" },
];

const InvoiceSystem = () => {
  const [dateSystem, setDateSystem] = useState("bs"); // 'bs' or 'ad'
  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Automatically generate invoices at end of month
  useEffect(() => {
    const newInvoices = clients.map((client) => ({
      ...client,
      month: dateSystem === "bs" ? "Falgun 2081" : "March 2025",
      amount: 20000, // default amount
      status: "Pending",
    }));
    setInvoices(newInvoices);
  }, [dateSystem]);

  const handleEdit = (id) => {
    const invoice = invoices.find((inv) => inv.id === id);
    setEditingInvoice(invoice);
  };

  const handleSave = () => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === editingInvoice.id ? { ...editingInvoice } : inv
      )
    );
    setEditingInvoice(null);
  };

  const handleChange = (field, value) => {
    setEditingInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = (id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: "Confirmed" } : inv
      )
    );
  };

  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#f5f6fa] p-4 dark:bg-[#1b1e23]">
      <h1 className="text-center text-2xl font-bold mb-4 dark:text-white">
        Invoice Management
      </h1>

      {/* Date System Toggle */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded ${
            dateSystem === "bs" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => setDateSystem("bs")}
        >
          B.S
        </button>
        <button
          className={`px-4 py-2 rounded ${
            dateSystem === "ad" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => setDateSystem("ad")}
        >
          A.D
        </button>
      </div>

      {/* Invoice Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#202528] dark:text-white">
            <tr>
              <th className="px-4 py-3">Client Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="bg-white dark:bg-[#202528] border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3">{inv.name}</td>
                <td className="px-4 py-3">{inv.phone}</td>
                <td className="px-4 py-3">{inv.address}</td>
                <td className="px-4 py-3">{inv.month}</td>
                <td className="px-4 py-3">
                  {editingInvoice?.id === inv.id ? (
                    <input
                      type="number"
                      value={editingInvoice.amount}
                      onChange={(e) => handleChange("amount", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-24 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    inv.amount
                  )}
                </td>
                <td className="px-4 py-3">{inv.status}</td>
                <td className="px-4 py-3 flex gap-2">
                  {editingInvoice?.id === inv.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => { handleEdit(inv.id); setShowModal(true); }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleConfirm(inv.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InvoiceSample showModal={showModal } onClose={() => setShowModal(false)} />
    </div>
  );
};

export default InvoiceSystem;
