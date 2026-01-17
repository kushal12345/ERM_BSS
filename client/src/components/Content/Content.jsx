import React from "react";
import { Users, BanknoteArrowUp, BanknoteArrowDown, Siren, ChevronDown } from "lucide-react";
import { Card, CardDash } from "../../components/ui/card";
import ColumnChart from "../lib/ColumnChart.jsx";
import ClicksLineChart from "../lib/LineChart.jsx";

const Dashboard = ({ userRole }) => {
  const renderDashboard = () => {
    switch (userRole) {
      case "admin":
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="p-6 h-full w-full overflow-y-scroll no-scrollbar dark:bg-[#0f1114] bg-gray-50">
      {renderDashboard()}
    </div>
  );
};

/* ------------------ ADMIN DASHBOARD ------------------ */
const AdminDashboard = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">Dashboard</h1>

    {/* SUMMARY CARDS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {[
        { label: "Total Staff", value: 300, icon: Users, color: "text-blue-600 bg-blue-100" },
        { label: "Total Income", value: "Rs. 1,20,000", icon: BanknoteArrowUp, color: "text-green-600 bg-green-100" },
        { label: "Total Expenses", value: "Rs. 80,000", icon: BanknoteArrowDown, color: "text-red-600 bg-red-100" },
        { label: "Emergency", value: "No Alerts", icon: Siren, color: "text-yellow-500 bg-yellow-100" },
      ].map((card) => (
        <Card key={card.label}>
          <CardDash className="p-4 grid grid-cols-3 gap-2 items-center">
            <div className="col-span-2">
              <p className="text-xs text-gray-500">{card.label}</p>
              <p className="text-xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`flex items-center justify-center p-2 rounded-full ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </CardDash>
        </Card>
      ))}
    </div>

    {/* Monthly Staff Overview Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Leads Card */}
      <div className="shadow-xl p-4 bg-white dark:bg-gray-800 rounded-lg">
        <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Monthly Staff Overview</p>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4 border-b border-gray-300 dark:border-gray-600 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 flex items-center justify-center rounded-full">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h5 className="text-xl font-semibold text-gray-900 dark:text-white">3.4k</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">Leads per week</p>
              </div>
            </div>
            <span className="inline-flex items-center text-green-600 dark:text-green-400 text-xs font-medium">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                <path d="M12 6v12m0-12 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" />
              </svg>
              42.5%
            </span>
          </div>

          <ColumnChart />

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
            >
              Last 7 days
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md px-3 py-2 text-sm font-medium gap-1"
            >
              Leads Report
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Users Card */}
      <div className="shadow-xl p-4 bg-white dark:bg-gray-800 rounded-lg">
        <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Users This Week</p>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white">32.4k</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">Users this week</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 6v12m0-12 4 4-4 4-4-4" stroke="currentColor" strokeWidth="2" />
              </svg>
              12%
            </div>
          </div>

          <ClicksLineChart />

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
            >
              Last 7 days
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md px-3 py-2 text-sm font-medium gap-1"
            >
              Users Report
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
