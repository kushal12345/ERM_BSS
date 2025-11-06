import React, { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportGenerator = () => {
  const reportTypes = ["Attendance", "Duty Log", "Inventory", "Client Communication"];

  // Sample data for demonstration
  const sampleData = {
    Attendance: [
      { staff: "Staff 1", date: "2025-11-06", status: "Present", checkIn: "09:00", checkOut: "18:00" },
      { staff: "Staff 2", date: "2025-11-06", status: "Absent", checkIn: "-", checkOut: "-" },
    ],
    "Duty Log": [
      { staff: "Staff 1", date: "2025-11-06", shift: "Morning", location: "Gate 1", status: "Completed" },
      { staff: "Staff 2", date: "2025-11-06", shift: "Evening", location: "Gate 2", status: "Pending" },
    ],
    Inventory: [
      { name: "Uniform Shirt", category: "Uniform", quantity: 100, status: "Available" },
      { name: "Boots", category: "Footwear", quantity: 50, status: "Low Stock" },
    ],
    "Client Communication": [
      { client: "Client A", staff: "Staff 1", type: "Call", date: "2025-11-06", time: "10:00", notes: "Follow-up" },
      { client: "Client B", staff: "Staff 2", type: "Email", date: "2025-11-06", time: "11:00", notes: "Inquiry" },
    ],
  };

  const [reportType, setReportType] = useState(reportTypes[0]);
  const [filterDate, setFilterDate] = useState("");
  const [previewData, setPreviewData] = useState(sampleData[reportType]);

  const handleReportChange = (e) => {
    const type = e.target.value;
    setReportType(type);
    setPreviewData(sampleData[type]);
    setFilterDate("");
  };

  const handleFilter = () => {
    if (!filterDate) {
      setPreviewData(sampleData[reportType]);
      return;
    }
    const filtered = sampleData[reportType].filter((row) => row.date === filterDate);
    setPreviewData(filtered);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(previewData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, reportType);
    XLSX.writeFile(wb, `${reportType}_Report.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const columns = Object.keys(previewData[0] || {}).map((key) => ({ header: key, dataKey: key }));
    doc.autoTable({
      columns,
      body: previewData,
      startY: 20,
    });
    doc.text(`${reportType} Report`, 14, 15);
    doc.save(`${reportType}_Report.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-[#212528] rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-bold dark:text-white text-center mb-4">Report Generator</h2>

      {/* Report Selection */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={reportType}
          onChange={handleReportChange}
          className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
        >
          {reportTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-3 border rounded-lg dark:bg-[#2b2e33] dark:text-white"
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filter
        </button>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Export Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>

      {/* Preview Table */}
      <div className="overflow-auto max-h-[500px] mt-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {Object.keys(previewData[0] || {}).map((key) => (
                <th key={key} className="px-4 py-2 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {previewData.length === 0 ? (
              <tr>
                <td colSpan={Object.keys(previewData[0] || {}).length} className="text-center py-4 dark:text-gray-300">
                  No data available for selected filters.
                </td>
              </tr>
            ) : (
              previewData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {Object.keys(row).map((col) => (
                    <td key={col} className="px-4 py-2">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportGenerator;
