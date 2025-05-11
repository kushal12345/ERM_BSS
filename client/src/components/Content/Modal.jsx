import React, { useEffect, useState } from 'react';
import Modalhire from './Waitingaccept';
import Modaldetails from './Waitingdetails';

const Modal = ({ show, onClose, employee }) => {
  const [showModalaccept, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isHiring, setIsHiring] = useState(false); 
   
  if (!show) return null;
 console.log(isHiring)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      { isHiring &&  isHiring ? (
        <Modalhire
          show={show}
          onClose={onClose}
          employee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          setIsHiring={setIsHiring}

        />
      ) : (
        <Modaldetails
          show={show}
          onClose={onClose}
          employee={employee}
          setSelectedEmployee={setSelectedEmployee}
          setIsHiring={setIsHiring}
        />

      )}
    </div>
  );
};

export default Modal;
