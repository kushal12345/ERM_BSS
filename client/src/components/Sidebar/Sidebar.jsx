import logo from '../assets/chest.png';
import { useState } from 'react';

export function SidebarCom({ setPage, userRole }) {
  const [dropdowns, setDropdowns] = useState({
    payout: false,
    staffClient: false,
    staff: false,
    client: false,
    admf: false,
    hrForms: false,
    opsForms: false,
    financeReports: false
  });

  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  return (
    <div className="w-full h-[100%] bg-white dark:bg-[#131518]">     
      <button 
        data-drawer-target="sidebar-multi-level-sidebar" 
        data-drawer-toggle="sidebar-multi-level-sidebar" 
        aria-controls="sidebar-multi-level-sidebar" 
        type="button" 
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="size-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="sidebar-multi-level-sidebar" className="w-74 h-[95%] overflow-y-scroll no-scrollbar bg-white dark:bg-[#131518] no-scrollbar transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full overflow-y-scroll no-scrollbar">
          <ul className="px-3 dark:border-black border-gray-200 text-sm font-medium">

            {/* Logo */}
            <li>
              <a href="#" className="rtl:space-x-reverse">
                <div className="self-center py-3 flex justify-center items-center whitespace-nowrap dark:text-white w-full text-justify text-black">
                  <img src={logo} className="h-8 mx-2" alt="Flowbite Logo" />
                  <span className='text-base text-black dark:text-white'>Bauddhanath Security</span>
                </div>
              </a>
              <hr className='my-3'/>
            </li>

            {/* Dashboard - Admin Only */}
            {["admin"].includes(userRole) && (
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-[#131518]" onClick={() => setPage('dashboard')}>
                  <span className="ms-3 no-underline dark:text-white">Dashboard</span>
                </a>
              </li>
            )}

            {/* Accounts / Finance Section */}
            {["admin","finance"].includes(userRole) && (
              <li>
                <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 rounded-lg group hover:bg-gray-100" onClick={() => toggleDropdown('payout')}>
                  <span className="flex-1 ms-3 text-left dark:text-white">Payout & Finance</span>
                  <svg className="size-2" viewBox="0 0 10 6" fill="none"><path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
                </button>
                <ul className={`py-2 ${dropdowns.payout ? 'block' : 'hidden'}`}>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('Salary')}>Salary</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('AdvancePayment')}>Advance Payment</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('Paymenthistory')}>Payment History</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('PayrollReport')}>Payroll Reports</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('invoice')}>Invoice</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('expensetracker')}>Expense Tracking 💳</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('FinancialDashboard')}>Financial Dashboard 📊</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('SalarySchedule')}>Salary Schedule Management 📅</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('TaxManagement')}>Tax & Deductions Management 🧾</a></li>
                    <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('CommissionBonus')}>Commission / Bonus 💰</a></li>
                    </ul>
              </li>
            )}

            {/* HR Section */}
            {["admin","hr"].includes(userRole) && (
              <li>
                <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 rounded-lg group hover:bg-gray-100" onClick={() => toggleDropdown('staffClient')}>
                  <span className="flex-1 ms-3 text-left dark:text-white">HR & Staff</span>
                  <svg className="size-2" viewBox="0 0 10 6" fill="none"><path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
                </button>
                <ul className={`py-2 ${dropdowns.staffClient ? 'block' : 'hidden'}`}>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('StaffList')}>Staff List</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('managestaff')}>Manage Staffs</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('performanceandeval')}>Performance / Evaluation</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('Attendance')}>Attendance</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('Recruitment')}>Recruitment Module 🧍</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('ShiftScheduling')}>Shift Scheduling ⏰</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('holidaypage')}>Leave Management 📅</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('EmployeeProfile')}>Employee Profile Dashboard 📁</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('TrainingCert')}>Training & Certification Tracking 🏅</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('PerformanceAnalytics')}>Performance Analytics 📈</a></li>
                </ul>
              </li>
            )}

            {/* Reception / Operations Section */}
            {["admin","operations"].includes(userRole) && (
              <li>
                <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 rounded-lg group hover:bg-gray-100" onClick={() => toggleDropdown('opsForms')}>
                  <span className="flex-1 ms-3 text-left dark:text-white">Operations</span>
                  <svg className="size-2" viewBox="0 0 10 6" fill="none"><path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
                </button>
                <ul className={`py-2 space-y-2 ${dropdowns.opsForms ? 'block' : 'hidden'}`}>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('NewAdmission')}>New Admission</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('Message')}>Message</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('AssignTask')}>Assign Task</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('ClientList')}>Client List</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('AddClient')}>Add New Client’s</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('DressStock')}>Dress Stock</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('VisitorLog')}>Visitor Log 🧾</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('NotificationCenter')}>Notification Center 🔔</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('DutyLogbook')}>Duty Logbook 🕒</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('ClientSiteDetails')}>Client Site Details 🧍‍♂️</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('InventoryManagement')}>Inventory Management 🧥</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('ClientCommLog')}>Client Communication Log 📞</a></li>
                </ul>
              </li>
            )}

            {/* Optional Shared Modules */}
            {["admin","finance","hr","operations"].includes(userRole) && (
              <li>
                <button type="button" className="flex items-center w-full p-2 text-sm text-gray-900 rounded-lg group hover:bg-gray-100" onClick={() => toggleDropdown('financeReports')}>
                  <span className="flex-1 ms-3 text-left dark:text-white">Shared Modules</span>
                  <svg className="size-2" viewBox="0 0 10 6" fill="none"><path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
                </button>
                <ul className={`py-2 space-y-2 ${dropdowns.financeReports ? 'block' : 'hidden'}`}>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('SearchFilter')}>Search & Filter 🔎</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('MessagingBoard')}>Internal Messaging 📨</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('MobileAttendance')}>Mobile Attendance 📱</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('ReportGenerator')}>Report Generator 🧾</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('AlertSystem')}>Alert System 🔔</a></li>
                  <li><a href="#" className="block pl-1 text-black no-underline py-1 hover:bg-gray-100" onClick={() => setPage('CalendarView')}>Calendar View 🗓️</a></li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </aside>
    </div>
  );
}
