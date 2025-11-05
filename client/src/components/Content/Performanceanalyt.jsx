import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PerformanceAnalytics = () => {
  const [activeTab, setActiveTab] = useState('Analytics');
  const [performanceData, setPerformanceData] = useState([
    { employee: 'John Doe', rating: 80 },
    { employee: 'Jane Smith', rating: 95 },
    { employee: 'Alice Johnson', rating: 70 },
    { employee: 'Bob Brown', rating: 60 },
  ]);

  const barData = {
    labels: performanceData.map(d => d.employee),
    datasets: [
      {
        label: 'Performance Rating (%)',
        data: performanceData.map(d => d.rating),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  const pieData = {
    labels: ['Excellent (80-100)', 'Good (60-79)', 'Needs Improvement (<60)'],
    datasets: [
      {
        data: [
          performanceData.filter(d => d.rating >= 80).length,
          performanceData.filter(d => d.rating >= 60 && d.rating < 80).length,
          performanceData.filter(d => d.rating < 60).length,
        ],
        backgroundColor: ['#10B981', '#3B82F6', '#EF4444'],
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-xl h-[90vh] overflow-y-scroll no-scrollbar">
      <span className="mx-2 text-xl font-bold dark:text-white">Performance Analytics</span>
      <hr className="mx-2 my-2 border border-gray-300 dark:border-gray-700" />

      {/* Tabs */}
      <div className="flex space-x-2 mx-2 my-3">
        <button
          className={`px-4 py-1 rounded-lg font-medium ${activeTab === 'Analytics' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          onClick={() => setActiveTab('Analytics')}
        >
          Analytics
        </button>
        <button
          className={`px-4 py-1 rounded-lg font-medium ${activeTab === 'Records' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          onClick={() => setActiveTab('Records')}
        >
          Records
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'Analytics' && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold dark:text-white mb-2">Performance Ratings (Bar)</h2>
            <Bar data={barData} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold dark:text-white mb-2">Performance Distribution (Pie)</h2>
            <Pie data={pieData} />
          </div>
        </div>
      )}

      {activeTab === 'Records' && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Employee</th>
                <th className="px-4 py-2">Performance Rating (%)</th>
                <th className="px-4 py-2">Remark</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((p, idx) => (
                <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{p.employee}</td>
                  <td className="px-4 py-2">{p.rating}</td>
                  <td className="px-4 py-2">
                    {p.rating >= 80 ? 'Excellent' : p.rating >= 60 ? 'Good' : 'Needs Improvement'}
                  </td>
                </tr>
              ))}
              {performanceData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No performance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PerformanceAnalytics;
