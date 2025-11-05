import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Search } from 'lucide-react';
import { FetchSearchedstaff } from '../../Fetch/FetchSearchedstaff';

const Setting = ({ showModal, onClose }) => {
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [currentroleuser, setCurrentroleuser] = useState(null);
  const [searched, setSearched] = useState([null]);

  // ---------------- Search box ---------------- //
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    FetchSearchedstaff(setSearched, searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    console.log('Searching employee:', value);
  };
  // ---------------- End Search ---------------- //

  if (!showModal) return null;

  const roles = ['Admin', 'Accountant', 'Supervisor', 'Guard', 'Receptionist'];

  const roleFeatures = {
    Admin: [
      'Manage Users',
      'Access All Reports',
      'System Settings',
      'User Role & Permission Control',
      'Branch / Site Management',
      'Audit Log / Activity Tracking',
      'Backup & Data Export',
    ],
    Accountant: [
      'Manage Users',
      'Access Reports',
      'System Settings',
      'Payout / Salary Management',
      'Advance Payment',
      'Payment History',
      'Payroll Reports',
      'Invoice Management',
      'Expense Tracking',
      'Financial Dashboard',
      'Salary Schedule Management',
      'Tax & Deductions Management',
      'Commission / Bonus',
    ],
    Supervisor: [
      'Approve Attendance',
      'View Guard Reports',
      'Assign Tasks',
      'Performance Evaluation',
      'Shift Scheduling / Roster',
      'Leave Management',
    ],
    Guard: [
      'Change Password',
      'Update Availability',
      'Duty Logbook',
      'Client Site Details',
    ],
    Receptionist: [
      'View Visitors Log',
      'Manage Check-in / Check-out',
      'Client Communication Log',
      'New Admission',
      'Message',
    ],
  };

  const renderRoleOptions = () => {
    const features = roleFeatures[selectedRole] || [];
    return (
      <Form>
        <Form.Group>
          {features.map((feature) => (
            <Form.Check key={feature} label={feature} />
          ))}
        </Form.Group>
      </Form>
    );
  };

  const renderRoleUser = () => {
    return (
      <div>
        <h5 className="font-semibold ml-2 mb-3 text-gray-900 dark:text-white">
          Choose Your {selectedRole}
        </h5>

        <div className="w-full flex items-center justify-center">
          <p className="px-2 font-bold w-full">
            {currentroleuser ? (
              currentroleuser
            ) : (
              <p>Empty! Hire new one.</p>
            )}
          </p>
          
        </div>
        <div className="relative w-full sm:w-72">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search employee..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 
                               focus:ring-2 focus:ring-blue-500 focus:outline-none
                               dark:bg-[#1a1d21] dark:text-white dark:border-gray-600"
                  />
                </div>
            </div>
        {!currentroleuser && searched && searched.length > 0 && (
          <ListGroup className="max-h-48 overflow-y-auto mt-0">
            {searched.map((emp) => (  
              <ListGroup.Item
                key={emp && emp._id ? emp._id : null}
                action
                onClick={() => setCurrentroleuser(`${emp && emp.Fname ? emp.Fname : 'Empty'} ${emp && emp.Lname ? emp.Lname : 'Empty'}`)}
              >
                {emp && emp.Fname ? emp.Fname : 'Empty'} {emp && emp.Lname ? emp.Lname : 'Empty'}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Settings
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
          >
            ✖
          </button>
        </div>

        {/* Content */}
        <Container fluid>
          <Row>
            {/* Left Sidebar - Roles */}
            <Col xs={12} md={3} className="border-r">
              <h6 className="text-gray-700 dark:text-gray-200 mb-3">Roles</h6>
              <ListGroup>
                {roles.map((role) => (
                  <ListGroup.Item
                    key={role}
                    action
                    active={selectedRole === role}
                    onClick={() => setSelectedRole(role)}
                  >
                    {role}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            {/* Right Content */}
            <Col xs={12} md={9} className="pl-4">
              <h5 className="font-semibold mb-3 text-gray-900 dark:text-white">
                {selectedRole} Permissions
              </h5>
              <Row>
                <Col>{renderRoleOptions()}</Col>
                <Col>{renderRoleUser()}</Col>
              </Row>

              <div className="mt-4 flex justify-start">
                <Button variant="secondary" className="me-2" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary">Save Changes</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Setting;
