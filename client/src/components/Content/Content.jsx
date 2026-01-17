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
    <div className="h-full w-full p-6 overflow-y-scroll no-scrollbar dark:bg-[#0f1114] bg-gray-50">
      {renderDashboard()}
    </div>
  );
};

/* ------------------ ADMIN DASHBOARD ------------------ */
const AdminDashboard = () => (
  <div>
    <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>

    {/* SUMMARY CARDS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {[
        ["Total Staff", 300, Users, "text-blue-600", "bg-blue-100"],
        ["Total Income", "Rs. 1,20,000", BanknoteArrowUp, "text-green-600", "bg-green-100"],
        ["Total Expenses", "Rs. 80,000", BanknoteArrowDown, "text-red-600", "bg-red-100"],
        ["Emergency", "No Alerts", Siren, "text-yellow-600", "bg-yellow-100"],
      ].map(([title, value, Icon, iconColor, iconBg]) => (
        <Card key={title}>
          <CardDash className="grid grid-cols-3 gap-2 p-2">
            <div className="col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
              <p className="text-xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="flex items-center justify-center p-2 rounded-full">
              <Icon className={`size-8 ${iconColor}`} />
            </div>
          </CardDash>
        </Card>
      ))}
    </div>

    {/* CHART CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 p-0">
      {/* Leads Overview Card */}
      <div className="shadow-xl p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-blue-100 flex items-center justify-center rounded-full">
              <Users className="size-6 text-blue-600" />
            </div>
            <div>
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white">3.4k</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">Leads generated per week</p>
            </div>
          </div>

          <span className="inline-flex items-center text-green-600 text-xs font-medium">
            <svg className="size-4 mr-1" viewBox="0 0 24 24" fill="none">
              <path d="M12 6v12m0-12 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" />
            </svg>
            42.5%
          </span>
        </div>

        <ColumnChart />

        <div className="flex justify-between items-center pt-4">
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            Last 7 days <ChevronDown className="size-4" />
          </button>

          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-transparent rounded-md hover:bg-blue-50">
            Leads Report
            <svg className="size-4 ml-1" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Users Overview Card */}
      <div className="shadow-xl p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">32.4k</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">Users this week</p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 font-medium text-green-600">
            <svg className="size-5 mr-1" viewBox="0 0 24 24" fill="none">
              <path d="M12 6v12m0-12 4 4m-4-4-4 4" stroke="currentColor" strokeWidth="2" />
            </svg>
            12%
          </div>
        </div>

        <ClicksLineChart />

        <div className="flex justify-between items-center pt-4">
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            Last 7 days <ChevronDown className="size-4" />
          </button>

          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-transparent rounded-md hover:bg-blue-50">
            Users Report
            <svg className="size-4 ml-1" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
