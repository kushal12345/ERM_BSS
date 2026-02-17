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

  const roles = ['Accountant', 'Supervisor', 'Receptionist'];

  const roleFeatures = {
    Accountant: [
      'Salary',
      'Advanced Payment',
      'Payroll Reports',
      'Invoice',
      'Training Fees',
      'Expenses Tracking',
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
        <h5 className="mb-3 ml-2 font-semibold text-gray-900 dark:text-white">
          Choose Your {selectedRole}
        </h5>

        <div className="flex w-full items-center justify-center">
          <p className="w-full px-2 font-bold">
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
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 
                               focus:outline-none focus:ring-2 focus:ring-blue-500
                               dark:border-gray-600 dark:bg-[#1a1d21] dark:text-white"
            />
          </div>
        </div>
        {!currentroleuser && searched && searched.length > 0 && (
          <ListGroup className="mt-0 max-h-48 overflow-y-auto">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Settings
          </h3>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            ✖
          </button>
        </div>

        {/* Content */}
        <Container fluid>
          <Row>
            {/* Left Sidebar - Roles */}
            <Col xs={12} md={3} className="border-r">
              <h6 className="mb-3 text-gray-700 dark:text-gray-200">Roles</h6>
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
              <h5 className="mb-3 font-semibold text-gray-900 dark:text-white">
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
