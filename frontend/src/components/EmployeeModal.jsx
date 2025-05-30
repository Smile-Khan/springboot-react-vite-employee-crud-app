import React from 'react';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#fff',
  color: '#000',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: '#000',
};

const EmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div style={modalStyle} onClick={onClose}>
      <div
        style={modalContentStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={closeButtonStyle}
          onClick={onClose}
          aria-label="Close"
          onMouseOver={(e) => (e.target.style.color = 'red')}
          onMouseOut={(e) => (e.target.style.color = '#000')}
        >
          &times;
        </button>
        <h3>Employee Details</h3>
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>Name:</strong> {employee.firstName} {employee.middleName || ''} {employee.lastName}</p>
        <p><strong>Login ID:</strong> {employee.loginId}</p>
        <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Permanent Address:</strong> {employee.permanentAddress}</p>
        <p><strong>Current Address:</strong> {employee.currentAddress}</p>
        <p><strong>ID Proof File:</strong> {employee.idProofFileName || 'Not uploaded'}</p>
      </div>
    </div>
  );
};

export default EmployeeModal;
