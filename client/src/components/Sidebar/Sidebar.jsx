// SidebarCom.jsx
import React, { useState, useEffect } from "react";
import logo from "../assets/chest.png";
import { House, Banknote, UserRoundPlus, MessageSquareDot, NotebookPen, Bell, Shirt, BookCopy, FileUser, Warehouse, Users, Cog, Share2, BanknoteArrowUp, Wallet, NotebookText, Receipt, BanknoteX, Gauge, UserRoundSearch, UserCog, BrainCircuit } from 'lucide-react';
import NepaliDate from "nepali-date";

// Menu configuration
const menuConfig = [
  { icon: <House size={16} />, label: "Dashboard", page: "dashboard", roles: ["admin", "hr", "finance", "operations"] },
  {
    icon: <Banknote size={16} />,
    label: "Payout & Finance",
    key: "payout",
    roles: ["admin", "finance"],
    children: [
      { icon: <BanknoteArrowUp size={16} />, label: "Salary", page: "Salary" },
      { icon: <Wallet size={16} />, label: "Advance Payment", page: "AdvancePayment" },
      { icon: <NotebookText size={16} />, label: "Payroll Reports", page: "PayrollReport" },
      { icon: <Receipt size={16} />, label: "Invoice", page: "invoice" },
      { icon: <Banknote size={16} />, label: "Training Fees", page: "TrainingFeeColl" },
      { icon: <BanknoteX size={16} />, label: "Expense Tracking", page: "expensetracker" },
    ],
  },
  {
    icon: <Users size={16} />,
    label: "HR & Staff",
    key: "staffClient",
    roles: ["admin", "hr"],
    children: [
      { icon: <Users size={16} />, label: "Staff List", page: "StaffList" },
      { icon: <Gauge size={16} />, label: "Performance / Evaluation", page: "performanceandeval" },
      { icon: <UserRoundSearch size={16} />, label: "Recruitment Module", page: "Recruitment" },
      { icon: <UserCog size={16} />, label: "Shift Scheduling", page: "ShiftScheduling" },
      { icon: <BrainCircuit size={16} />, label: "Training & Certification Tracking", page: "TrainingCert" },
    ],
  },
  {
    icon: <Cog size={16} />,
    label: "Operations",
    key: "opsForms",
    roles: ["admin", "operations"],
    children: [
      { icon: <UserRoundPlus size={16} />, label: "New Admission", page: "NewAdmission" },
      { icon: <MessageSquareDot size={16} />, label: "Message", page: "message" },
      { icon: <NotebookPen size={16} />, label: "Assign Task", page: "assigntask" },
      { icon: <Warehouse size={16} />, label: "Client List", page: "manageclient" },
      { icon: <Shirt size={16} />, label: "Dress Stock", page: "dressstock" },
      { icon: <FileUser size={16} />, label: "Visitor Log", page: "VisitorsLog" },
      { icon: <Bell size={16} />, label: "Notification Center", page: "NotificationCenter" },
      { icon: <BookCopy size={16} />, label: "Duty Logbook", page: "DutyLogbook" },
      { icon: <Warehouse size={16} />, label: "Inventory Management", page: "InventoryManagement" },
      { icon: <FileUser size={16} />, label: "Client Communication Log", page: "ClientCommLog" },
    ],
  },
  {
    icon: <Share2 size={16} />,
    label: "Shared Modules",
    key: "financeReports",
    roles: ["admin", "finance", "hr", "operations"],
    children: [
      { label: "Mobile Attendance 📱", page: "MobileAttendance" },
      { label: "Report Generator 🧾", page: "ReportGenerator" },
      { label: "Alert System 🔔", page: "AlertSystem" },
      { label: "Calendar View 🗓️", page: "CalendarView" },
    ],
  },
];

export default function SidebarCom({ setPage, userRole = "admin" }) {
  const [dropdowns, setDropdowns] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = dateTime.toLocaleDateString("en-CA");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const toggleDropdown = (key) =>
    setDropdowns((p) => ({ ...p, [key]: !p[key] }));

  const go = (page) => {
    setPage(page);
    setActivePage(page);
    setMobileOpen(false);
  };

  // NavButton
  const NavButton = ({ children, onClick, isActive }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full rounded-md p-2 px-4  text-left text-sm transition
        ${isActive
          ? "bg-blue-600 text-white"
          : "text-white hover:bg-white/20 hover:text-white"
        }`}
    >
      {children}
    </button>
  );

  // SubItem
  const SubItem = ({ icon, label, page }) => (
    <li key={page}>
      <button
        onClick={() => go(page)}
        className={`w-full flex items-center ml-3 gap-2 rounded-md p-2 text-left text-sm transition
          ${activePage === page
            ? "bg-blue-500 text-white"
            : "text-white hover:bg-white/20 hover:text-white"
          }`}
      >
        {icon}
        {label}
      </button>
    </li>
  );

  const Nepalidate = new NepaliDate();

  return (
    <>
      {/* Mobile top bar */}
      <div className="sm:hidden flex items-center justify-between bg-[#0100B9] text-white border-b dark:bg-[#131518] dark:border-gray-800">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-7" />
          <span className="font-semibold text-sm">Bauddhanath</span>
        </div>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setMobileOpen((s) => !s)}
          className="rounded-md p-2 text-white hover:bg-white/20"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={`fixed top-0 left-0 z-50 flex w-full h-screen flex-col border-r border-gray-200 bg-[#0100B9] text-white transition-transform dark:border-gray-800 dark:bg-[#131518] ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          } sm:static sm:translate-x-0`}
      >
        {/* HEADER */}
        <div className=" top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-[#0100B9] p-4 dark:border-gray-800 dark:bg-[#131518]">
          <img src={logo} alt="logo" className="h-8" />
          <div>
            <div className="text-sm font-semibold text-white">Bauddhanath Security</div>
            <div className="text-xs text-white/80">Admin Panel</div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 pb-5 no-scrollbar">
          <ul className="space-y-1 m-0 p-0">
            {menuConfig.map((item) => {
              if (!item.roles.includes(userRole)) return null;

              if (item.children) {
                return (
                  <li key={item.key}>
                    <div className="flex items-center justify-between">
                      <NavButton
                        onClick={() => toggleDropdown(item.key)}
                        isActive={dropdowns[item.key]}
                      >
                        {item.icon}
                        {item.label}
                      </NavButton>
                      <button
                        onClick={() => toggleDropdown(item.key)}
                        className="rounded-md p-2 text-white hover:bg-white/20"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${dropdowns[item.key] ? "rotate-180" : ""}`}
                          viewBox="0 0 10 6"
                        >
                          <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                      </button>
                    </div>
                    {dropdowns[item.key] && (
                      <ul className="mt-1 pl-4 space-y-0.5">
                        {item.children.map((child) => (
                          <SubItem key={child.page} icon={child.icon} label={child.label} page={child.page} />
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.page}>
                  <NavButton
                    onClick={() => go(item.page)}
                    isActive={activePage === item.page}
                  >
                    {item.icon}
                    {item.label}
                  </NavButton>
                </li>
              );
            })}
            <li className="h-6" />
          </ul>
        </nav>

        {/* FOOTER */}
        <div className="sticky bottom-0 shrink-0 border-t border-gray-200 bg-[#0100B9] p-2 dark:border-gray-800 dark:bg-[#131518]">
          <div className="text-xs text-white/80">Time: {formattedTime}</div>
          <div className="text-sm font-medium text-white">English Date: {formattedDate} </div>
          <div className="text-sm font-medium text-white">Nepali Date {Nepalidate.format("YYYY-MM-DD")} </div>
        </div>
      </aside>
    </>
  );
}
