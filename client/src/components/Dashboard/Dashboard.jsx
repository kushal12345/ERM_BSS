import React,{useState} from 'react';
import Navbar from '../Navbar/navbar';
import SidebarCom from '../Sidebar/Sidebar';
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
import MessagePage from '../Content/message';
import Dressstock from '../Content/Dressstock/Dressstock';
import EmployeeWarningPage from '../Content/Warningform';
import HolidayFormPage from '../Content/Holiday';
import Waitingform from '../Content/Waitingform';
import PerformanceandEval from '../Content/PerformanceandEval';
import Documents from '../Content/Documents';
import Incident from '../Content/Incidents';
import {Row,Col, Container} from 'react-bootstrap';
import InvoiceSystem from '../Content/Payout/invoice';
import ExpenseTracker from '../Content/ExpenseTracking';
import FinancialDashboard from '../Content/FinancialDashboard';
import SalarySchedule from '../Content/Salaryschedulemanagement';
import TaxDeductions from '../Content/Tax_deduction';
import CommissionBonus from '../Content/Comission';
import StaffList from '../Content/Staff/Stafflist';
import RecruitmentModule from '../Content/Recruitmentmodule';
import ShiftScheduling from '../Content/ShiftScheduling';
import EmployeeProfileDashboard from '../Content/EmployeeProfile';
import TrainingCertDashboard from '../Content/TrainingTrack';
import PerformanceAnalytics from '../Content/Performanceanalyt';
import VisitorsLog from '../Content/Visitorslog';
import NotificationCenter from '../Content/Notificationcenter';
import DutyLogbook from '../Content/dutylogbook';
import MobileAttendance from '../Content/mobileattendance';
import InventoryManagement from '../Content/Inventrymgmt';
import ClientCommunicationLog from '../Content/clientcommlog';
import ReportGenerator from '../Content/reportgen';
import AlertSystem from '../Content/alertsys';
import CustomFullCalendar from '../Content/calenderview';
import TrainingFeeTab from '../Content/TrainingFeetab';

const Dashboard = ({loginuser}) => {
  const [page, setPage] = useState(null);


  const renderpage = () => {
    switch (page) {
      
      case "dashboard":
        return <DashboardMain />;
      case "TrainingCert":
        return <TrainingCertDashboard />;
      case "CalendarView":
        return <CustomFullCalendar />;
      case "TrainingFeeColl":
        return <TrainingFeeTab />;
      case "InventoryManagement":
        return <InventoryManagement />;
      case "AlertSystem":
        return <AlertSystem />;
      case "ReportGenerator":
        return <ReportGenerator />;
      case "ClientCommLog":
        return <ClientCommunicationLog />;
      case "MobileAttendance":
        return <MobileAttendance />;
      case "NotificationCenter":
        return <NotificationCenter />;
      case "DutyLogbook":
        return <DutyLogbook />;
      case "VisitorsLog":
        return <VisitorsLog />;
      case "PerformanceAnalytics":
        return <PerformanceAnalytics />;
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
        return <MessagePage />;
      case "ssf":
        return <Ssf />;
      case "managestaff":
        return <Managestaff />; 
      case "manageclient":
          return <Manageclient />; 
      case "Attendance":
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
      case "invoice":
        return <InvoiceSystem/>;
      case "performanceandeval":
        return <PerformanceandEval />;
      case "documents":
        return <Documents />;
      case "incidents":
        return <Incident />;
      case "expensetracker":
        return <ExpenseTracker />;
      case "FinancialDashboard":
        return <FinancialDashboard />;
      case "SalarySchedule":
        return <SalarySchedule />;
      case "TaxManagement":
        return <TaxDeductions />;
      case "CommissionBonus":
        return <CommissionBonus />;
      case "StaffList":
        return <StaffList />;
      case "Recruitment":
        return <RecruitmentModule />;
      case "ShiftScheduling":
        return <ShiftScheduling />;
      case "EmployeeProfile":
        return <EmployeeProfileDashboard />;
      default:
        return <DashboardMain />;
    }
  }
  
 
  return (
    <Container fluid className='w-full h-full  bg-gray-100 dark:bg-[#18191A] overflow-hidden no-scrollbar p-0 m-0'>
      <Row xs={12} md={12} lg={12}>
              <Navbar loginuser={loginuser} />
      </Row>
      <Row xs={12} md={12} lg={12} className='mt-2 h-[92vh] overflow-hidden no-scrollbar'>
        <Col xs={12} md={4} lg={2} >
          <SidebarCom setPage={setPage} userRole={loginuser.role} />
        </Col>
        <Col xs={12} md={8} lg={10}>
          {renderpage()}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;