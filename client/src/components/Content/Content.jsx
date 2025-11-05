import React from "react";
import { BarChart3, Users, Briefcase, FileText, TrendingUp } from "lucide-react";

const Dashboard = ({ userRole }) => {
  const renderDashboard = () => {
    switch (userRole) {
      case "finance":
        return <FinanceDashboard />;
      case "hr":
        return <HRDashboard />;
      case "operations":
        return <OperationsDashboard />;
      case "admin":
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="p-6  w-full overflow-y-scroll no-scrollbar dark:bg-[#0f1114] bg-gray-50 h-[80%]">
      {renderDashboard()}
    </div>
  );
};

/* ------------------ ADMIN DASHBOARD ------------------ */
const AdminDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6 dark:text-white">Admin Dashboard</h1>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card title="Total Staff" value="245" color="blue" />
      <Card title="Total Clients" value="38" color="green" />
      <Card title="Monthly Revenue" value="Rs. 12,50,000" color="yellow" />
      <Card title="Active Branches" value="4" color="purple" />
    </div>

    {/* Analytics & Reports */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Placeholder title="📊 Company Analytics Overview" />
      <Placeholder title="🔐 User Role & Permission Control" />
    </div>

    {/* System Section */}
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Placeholder title="🗄️ Audit Log / Activity Tracking" />
      <Placeholder title="📦 Backup & Data Export" />
    </div>
  </div>
);

/* ------------------ FINANCE DASHBOARD ------------------ */
const FinanceDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6 dark:text-white">Accounts / Finance Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card title="Total Payouts" value="Rs. 3,50,000" color="green" />
      <Card title="Pending Invoices" value="Rs. 1,20,000" color="yellow" />
      <Card title="Total Expenses" value="Rs. 80,000" color="red" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Placeholder title="📈 Financial Trends (Bar Chart)" />
      <Placeholder title="💳 Expense Tracker Summary" />
    </div>

    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Placeholder title="📅 Salary Schedule Overview" />
      <Placeholder title="🧾 Tax & Deductions Dashboard" />
    </div>
  </div>
);

/* ------------------ HR DASHBOARD ------------------ */
const HRDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6 dark:text-white">Human Resource Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card title="Total Staffs" value="245" color="blue" />
      <Card title="On Leave" value="12" color="yellow" />
      <Card title="Open Positions" value="5" color="purple" />
      <Card title="Training Sessions" value="3 Active" color="green" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Placeholder title="📁 Employee Profile Overview" />
      <Placeholder title="⏰ Shift Schedule Summary" />
    </div>

    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Placeholder title="🏅 Training & Certification Tracker" />
      <Placeholder title="📈 Performance Analytics" />
    </div>
  </div>
);

/* ------------------ OPERATIONS DASHBOARD ------------------ */
const OperationsDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6 dark:text-white">Reception / Operations Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card title="Active Clients" value="32" color="green" />
      <Card title="Pending Tasks" value="6" color="red" />
      <Card title="New Admissions" value="4" color="blue" />
      <Card title="Notifications" value="8 Unread" color="yellow" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Placeholder title="🧾 Visitor Log / Gate Entry Record" />
      <Placeholder title="🕒 Duty Logbook Summary" />
    </div>

    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Placeholder title="🧥 Inventory & Dress Stock" />
      <Placeholder title="📞 Client Communication Log" />
    </div>
  </div>
);

/* ------------------ REUSABLE COMPONENTS ------------------ */
const Card = ({ title, value, color }) => (
  <div
    className={`p-5 rounded-xl shadow-sm border dark:border-gray-700 bg-white dark:bg-[#1c1f24] flex flex-col justify-between`}
  >
    <div>
      <h3 className={`font-semibold text-${color}-700 dark:text-${color}-400`}>
        {title}
      </h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  </div>
);

const Placeholder = ({ title }) => (
  <div className="p-6 bg-white dark:bg-[#1c1f24] border dark:border-gray-700 rounded-xl h-60 flex items-center justify-center text-gray-400 dark:text-gray-500">
    {title}
  </div>
);

export default Dashboard;
