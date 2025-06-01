import React from 'react';

const EmployeeHistoryModal = ({ employee, onClose }) => {
  if (!employee) return null;

  // Dummy history logs
  const history = [
    `✅ ${employee.dateOfBirth?.slice(0, 4)}-01-01: Employee added`,
    `✏️ 2024-03-10: Salary updated from ₹${employee.salary - 5000} → ₹${employee.salary}`,
    `📍 2024-05-15: Address updated`,
    `🔒 2024-05-25: Login ID updated to ${employee.loginId}`,
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">📜 History for {employee.firstName} {employee.lastName}</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeHistoryModal;
