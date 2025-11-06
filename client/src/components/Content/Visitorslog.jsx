import { useState } from "react";
import React from "react";

const VisitorsLog = () => {
  const initialForm = {
    fullName: "",
    referrer: "",
    tempAddress: "",
    permAddress: "",
    category: "Civil",
    pastExperience: "",
    education: "",
    height: "",
    weight: "",
    age: "",
    phone: "",
  };

  const [activeTab, setActiveTab] = useState("form"); // "form" or "list"
  const [formData, setFormData] = useState(initialForm);
  const [visitors, setVisitors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({ ...prev, category: e.target.value, pastExperience: "" }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const visitor = { ...formData, id: Date.now(), physicalTest: null, trainingFee: null };
    setVisitors((prev) => [...prev, visitor]);
    setFormData(initialForm);
    setActiveTab("list"); // switch to list tab after adding
  };

  // Modal / Hire handlers
  const handleHireClick = (visitor) => {
    setSelectedVisitor(visitor);
    setModalOpen(true);
  };

  const handlePhysicalTest = (status) => {
    setSelectedVisitor((prev) => ({ ...prev, physicalTest: status }));
    setVisitors((prev) =>
      prev.map((v) => (v.id === selectedVisitor.id ? { ...v, physicalTest: status } : v))
    );
  };

  const handleTrainingFeeChange = (e) => {
    const fee = e.target.value;
    setSelectedVisitor((prev) => ({ ...prev, trainingFee: fee }));
    setVisitors((prev) =>
      prev.map((v) => (v.id === selectedVisitor.id ? { ...v, trainingFee: fee } : v))
    );
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVisitor(null);
  };

  return (
    <div className="max-w-6xl mx-auto h-[80vh] overflow-y-auto no-scrollbar p-6 bg-white dark:bg-[#212528] rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold dark:text-white text-center mb-4">Visitors Management</h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab("form")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "form"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Add Visitor
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "list"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          Visitors List
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "form" ? (
        <form onSubmit={handleSubmitForm} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Referrer Name</label>
            <input
              type="text"
              name="referrer"
              value={formData.referrer}
              onChange={handleChange}
              placeholder="Enter referrer name"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Temporary Address</label>
            <input
              type="text"
              name="tempAddress"
              value={formData.tempAddress}
              onChange={handleChange}
              placeholder="Enter temporary address"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Permanent Address</label>
            <input
              type="text"
              name="permAddress"
              value={formData.permAddress}
              onChange={handleChange}
              placeholder="Enter permanent address"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Category</label>
            <div className="flex space-x-4 mt-1">
              {["EX Army", "EX Police", "Civil"].map((cat) => (
                <label key={cat} className="flex items-center space-x-2 dark:text-white">
                  <input
                    type="radio"
                    value={cat}
                    checked={formData.category === cat}
                    onChange={handleCategoryChange}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Past Experience if Civil */}
          {formData.category === "Civil" && (
            <div className="flex flex-col">
              <label className="font-semibold dark:text-white mb-1">
                Past Security Experience
              </label>
              <input
                type="text"
                name="pastExperience"
                value={formData.pastExperience}
                onChange={handleChange}
                placeholder="Enter past company experience"
                className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Education Qualification</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Enter education qualification"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Enter height"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white mb-1">Phone No</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Save Visitor
            </button>
          </div>
        </form>
      ) : (
        /* Visitors List Tab */
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Physical Test</th>
                <th className="px-4 py-2 text-left">Training Fee</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">{v.fullName}</td>
                  <td className="px-4 py-2">{v.category}</td>
                  <td className="px-4 py-2">{v.physicalTest || "-"}</td>
                  <td className="px-4 py-2">{v.trainingFee || "-"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleHireClick(v)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Hire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedVisitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#212528] rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="text-xl font-semibold dark:text-white">Hire Visitor</h3>
            <p className="dark:text-white">
              Inspect physical test for <strong>{selectedVisitor.fullName}</strong>
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handlePhysicalTest("qualified")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                ✅ Qualified
              </button>
              <button
                onClick={() => handlePhysicalTest("failed")}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ❌ Failed
              </button>
            </div>

            {selectedVisitor.physicalTest === "failed" && (
              <div className="mt-4 flex flex-col">
                <label className="mb-1 font-semibold dark:text-white">Training Fee</label>
                <input
                  type="number"
                  value={selectedVisitor.trainingFee || ""}
                  onChange={handleTrainingFeeChange}
                  className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorsLog;
