// SidebarCom.jsx
import React, { useEffect, useState } from "react";
import logo from "../assets/chest.png";

export default function SidebarCom({ setPage, userRole = "admin" }) {
  const [dropdowns, setDropdowns] = useState({
    payout: false,
    staffClient: false,
    opsForms: false,
    financeReports: false,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("");

  const toggleDropdown = (key) =>
    setDropdowns((p) => ({ ...p, [key]: !p[key] }));

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const go = (page) => {
    setPage(page);
    setActivePage(page);
    setMobileOpen(false);
  };

  const NavButton = ({ children, onClick, isActive }) => (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300"
      }`}
    >
      {children}
    </button>
  );

  const SubItem = ({ label, page }) => (
    <li key={page}>
      <button
        onClick={() => go(page)}
        className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
          activePage === page
            ? "bg-blue-50 dark:bg-blue-800 text-blue-700 dark:text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-300"
        }`}
      >
        {label}
      </button>
    </li>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sm:hidden flex items-center justify-between p-2 bg-white dark:bg-[#131518] border-b dark:border-gray-800">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-7" />
          <span className="font-semibold text-sm dark:text-white">
            Bauddhanath
          </span>
        </div>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setMobileOpen((s) => !s)}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={`fixed top-0 left-0 z-50 w-52 h-screen transform transition-transform bg-white dark:bg-[#131518] border-r border-gray-200 dark:border-gray-800 flex flex-col ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:static`}
      >
        {/* HEADER (fixed) */}
        <div className="shrink-0 flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-[#131518] z-10">
          <img src={logo} alt="logo" className="h-8" />
          <div>
            <div className="text-sm font-semibold text-black dark:text-white">
              Bauddhanath Security
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Admin Panel
            </div>
          </div>
        </div>

        {/* MIDDLE SCROLLABLE AREA */}
        <nav className="flex-1 pb-5 overflow-y-auto px-2 py-3 no-scrollbar">
          <ul className="space-y-1  m-0 p-0">
            {/* Dashboard */}
            <li>
              <NavButton
                onClick={() => go("dashboard")}
                isActive={activePage === "dashboard"}
              >
                Dashboard
              </NavButton>
            </li>

            {/* Payout */}
            <li>
              <div className="flex items-center justify-between">
                <NavButton onClick={() => toggleDropdown("payout")}>
                  Payout & Finance
                </NavButton>
                <button
                  onClick={() => toggleDropdown("payout")}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      dropdowns.payout ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </div>
              <ul
                className={`mt-1 pl-4 space-y-0.5 ${
                  dropdowns.payout ? "block" : "hidden"
                }`}
              >
                {[
                  ["Salary", "Salary"],
                  ["Advance Payment", "AdvancePayment"],
                  ["Payroll Reports", "PayrollReport"],
                  ["Invoice", "invoice"],
                  ["Expense Tracking 💳", "expensetracker"],
                ].map(([label, page]) => (
                  <SubItem key={page} label={label} page={page} />
                ))}
              </ul>
            </li>

            {/* HR */}
            <li>
              <div className="flex items-center justify-between">
                <NavButton onClick={() => toggleDropdown("staffClient")}>
                  HR & Staff
                </NavButton>
                <button
                  onClick={() => toggleDropdown("staffClient")}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      dropdowns.staffClient ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </div>
              <ul
                className={`mt-1 pl-4 space-y-0.5 ${
                  dropdowns.staffClient ? "block" : "hidden"
                }`}
              >
                {[
                  ["Staff List", "StaffList"],
                  ["Performance / Evaluation", "performanceandeval"],
                  ["Recruitment Module 🧍", "Recruitment"],
                  ["Shift Scheduling ⏰", "ShiftScheduling"],
                  ["Training & Certification Tracking 🏅", "TrainingCert"],
                ].map(([label, page]) => (
                  <SubItem key={page} label={label} page={page} />
                ))}
              </ul>
            </li>
          
            {/* Operations */}
            {["admin", "operations"].includes(userRole) && (
              <li>
                <div className="flex items-center justify-between">
                  <NavButton onClick={() => toggleDropdown("opsForms")}>Operations</NavButton>
                  <button
                    onClick={() => toggleDropdown("opsForms")}
                    aria-expanded={dropdowns.opsForms}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg className={`w-4 h-4 transform transition-transform ${dropdowns.opsForms ? "rotate-180" : ""}`} viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                </div>

                <ul className={`mt-1 pl-4 space-y-0.5 ${dropdowns.opsForms ? "block" : "hidden"}`}>
                  {[
                    ["New Admission", "NewAdmission"],
                    ["Message", "message"],
                    ["Assign Task", "assigntask"],
                    ["Client List", "manageclient"],
                    ["Dress Stock", "dressstock"],
                    ["Visitor Log 🧾", "VisitorsLog"],
                    ["Notification Center 🔔", "NotificationCenter"],
                    ["Duty Logbook 🕒", "DutyLogbook"],
                    ["Inventory Management 🧥", "InventoryManagement"],
                    ["Client Communication Log 📞", "ClientCommLog"],
                  ].map(([label, page]) => (
                    <SubItem key={page} label={label} page={page} />
                  ))}
                </ul>
              </li>
            )}

            {/* Shared Modules */}
            {["admin", "finance", "hr", "operations"].includes(userRole) && (
              <li>
                <div className="flex items-center justify-between">
                  <NavButton onClick={() => toggleDropdown("financeReports")}>Shared Modules</NavButton>
                  <button
                    onClick={() => toggleDropdown("financeReports")}
                    aria-expanded={dropdowns.financeReports}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg className={`w-4 h-4 transform transition-transform ${dropdowns.financeReports ? "rotate-180" : ""}`} viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                </div>

                <ul className={`mt-1 pl-4 space-y-0.5 ${dropdowns.financeReports ? "block" : "hidden"}`}>
                  {[
                    ["Mobile Attendance 📱", "MobileAttendance"],
                    ["Report Generator 🧾", "ReportGenerator"],
                    ["Alert System 🔔", "AlertSystem"],
                    ["Calendar View 🗓️", "CalendarView"],
                  ].map(([label, page]) => (
                    <SubItem key={page} label={label} page={page} />
                  ))}
                </ul>
              </li>
            )}

            {/* extra spacing so the last item isn't glued to footer */}
            <li className="h-6" />
          </ul>
        </nav>

        {/* FOOTER (fixed bottom) */}
        <div className="shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131518] px-3 py-3 sticky bottom-0">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Logged in as
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {userRole}
          </div>
        </div>
      </aside>
    </>
  );
}
