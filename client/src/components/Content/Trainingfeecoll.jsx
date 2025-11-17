import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { fetchVisitors } from "../Fetch/Fetchvisitors";

const TrainingFeeForm = ({visitor, onClose}) => {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [trainingFee, setTrainingFee] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visitor) {
      setSelectedVisitor(visitor);
      setTrainingFee(visitor.TrainingFee || "");
    }
  }, [visitor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVisitor) return alert("Select a visitor first");
    if (!trainingFee) return alert("Enter training fee");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("TrainingFee", trainingFee);
      if (voucher) formData.append("Voucher", voucher);

      await api.put(`/api/visitor/${selectedVisitor._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Training fee collected successfully");

      // Update local state
      setVisitors((prev) =>
        prev.map((v) =>
          v._id === selectedVisitor._id
            ? { ...v, TrainingFee: trainingFee }
            : v
        )
      );

      
      // Reset form
      setSelectedVisitor(null);
      setTrainingFee("");
      setVoucher(null);
    } catch (err) {
      console.error(err);
      alert("Failed to collect fee");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-[#212528] rounded-xl shadow-xl space-y-6">
     <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold dark:text-white">
          Training Fee Collection
        </h2>

        <button
          onClick={()=>onClose()}
          className="text-xl font-bold dark:text-white cursor-pointer"
        >
          X
        </button>
      </div>

        
      {selectedVisitor && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Visitor Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold dark:text-white mb-1">Full Name</label>
              <input
                type="text"
                value={selectedVisitor.Fname}
                readOnly
                className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold dark:text-white mb-1">Category</label>
              <input
                type="text"
                value={selectedVisitor.Category}
                readOnly
                className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold dark:text-white mb-1">Phone</label>
              <input
                type="text"
                value={selectedVisitor.Phone}
                readOnly
                className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold dark:text-white mb-1">Age</label>
              <input
                type="text"
                value={selectedVisitor.Age}
                readOnly
                className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold dark:text-white mb-1">Temporary Address</label>
              <input
                type="text"
                value={selectedVisitor.TempAddress}
                readOnly
                className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold dark:text-white mb-1">Permanent Address</label>
              <input
                type="text"
                value={selectedVisitor.PermAddress}
                readOnly
                className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
              />
            </div>
          </div>

          {/* Fee Input */}
          <div>
            <label className="font-semibold dark:text-white mb-1">Training Fee</label>
            <input
              type="number"
              value={trainingFee}
              onChange={(e) => setTrainingFee(e.target.value)}
              placeholder="Enter fee"
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400 w-full"
            />
          </div>

          {/* Voucher Upload */}
          <div>
            <label className="font-semibold dark:text-white mb-1">Upload Voucher</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setVoucher(e.target.files[0])}
              className="p-2 border rounded-lg dark:bg-[#2b2e33] dark:text-white focus:ring-2 focus:ring-blue-400 w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Collect Fee"}
          </button>
        </form>
      )}
    </div>
  );
};

export default TrainingFeeForm;
