import React, { useEffect, useState } from 'react';
import { getEmployeeHistory } from '../services/historyService';

const EmployeeHistory = ({ employeeId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employeeId) {
      getEmployeeHistory(employeeId)
        .then(data => setHistory(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [employeeId]);

  if (loading) return <p>Loading history...</p>;
  if (history.length === 0) return <p>No history found for this employee.</p>;

  return (
    <div>
      <h3>Change History</h3>
      <ul>
        {history.map(item => (
          <li key={item.id}>
            <strong>{item.action}</strong> — {item.details} <br />
            <small>{new Date(item.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeHistory;
