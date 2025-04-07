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

const Dashboard = ({loginuser}) => {
  const [page, setPage] = useState(null);


  const renderpage = () => {
    switch (page) {
      
      case "dashboard":
        return <DashboardMain />;
      case "Salary":
        return <SalaryRec />;
      case "NewAdmission":
        return <NewAdmission />;
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
      default:
        return <DashboardMain />;
    }
  }
  
 
  return (
    <div className='w-full h-screen overflow-hidden bg-[#EDEDF4] dark:bg-[#131518]  '>
      <div className='w-full h-10  overflow-hidden'>
        <Navbar loginuser={loginuser} />
      </div>

      <div className='flex w-full h-full overflow-y-scroll no-scrollbar'>
        <div className='w-54 h-auto  overflow-y-scroll no-scrollbar'>
          <SidebarCom setPage={setPage} />
        </div>
        <div className='flex-1 h-auto overflow-hidden px-2 '>
          {renderpage()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;