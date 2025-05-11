import React,{useState} from 'react';
import Navbar from '../Navbar/navbar';
import { SidebarCom } from '../Sidebar/Sidebar';
import DashboardMain from '../Content/Content';
import NewAdmission from '../Content/NewAdmission';
import Ssf from '../Content/Ssf';
import Managestaff from '../Content/Staff/Managestaff';
import Manageclient from '../Content/Client/Manageclient';
import SalaryRec from '../Content/Payout/Salary';
import Attendance from '../Content/Attendance/Attendance';
import AssignTask from '../Content/AssignTask/AssignTask';
import Advancepayment from '../Content/Payout/Advancepayment';
import PaymentHistory from '../Content/Payout/PaymentHistory';
import PayrollReports from '../Content/Payout/PayrollReports';
import Message from '../Content/message';
import Dressstock from '../Content/Dressstock/Dressstock';
import EmployeeWarningPage from '../Content/Warningform';
import HolidayFormPage from '../Content/Holiday';
import Waitingform from '../Content/Waitingform';


const Dashboard = ({loginuser}) => {
  const [page, setPage] = useState(null);


  const renderpage = () => {
    switch (page) {
      
      case "dashboard":
        return <DashboardMain />;
      case "Salary":
        return <SalaryRec />;
      case "AdvancePayment":
        return <Advancepayment />;      
      case "NewAdmission":
        return <NewAdmission />;
      case "Paymenthistory":
        return <PaymentHistory />;
      case "PayrollReport":
        return <PayrollReports />;
      case "message":
        return <Message />;
      case "ssf":
        return <Ssf />;
      case "managestaff":
        return <Managestaff />; 
      case "manageclient":
          return <Manageclient />; 
      case "attendance":
          return <Attendance />;   
      case "assigntask":
          return <AssignTask/>;
      case "dressstock":
          return <Dressstock />; 
      case "warningpage":
          return <EmployeeWarningPage />;
      case "holidaypage":
        return <HolidayFormPage />; 
      case "waitingpage":
        return <Waitingform />;
      default:
        return <DashboardMain />;
    }
  }
  
 
  return (
    <div className='w-full h-screen pb-4 bg-[#EDEDF4] dark:bg-[#131518] grid grid-rows-[10%_90%] overflow-hidden'>
      <div className='w-full overflow-hidden'>
        <Navbar loginuser={loginuser} />
      </div>

      <div className='grid grid-cols-12 w-full  overflow-y-scroll no-scrollbar'>
        <div className='w-54 col-span-2 h-auto overflow-y-scroll no-scrollbar'>
          <SidebarCom setPage={setPage} />
        </div>
        <div className='col-span-10 h-auto overflow-y-scroll no-scrollbar px-2 '>
          {renderpage()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;