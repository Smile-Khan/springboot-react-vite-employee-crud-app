import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    department: '',
    salary: '',
    permanentAddress: '',
    currentAddress: '',
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    API.get(`/employees/${id}`)
      .then(res => {
        const emp = res.data;
        setFormData({
          firstName: emp.firstName || '',
          middleName: emp.middleName || '',
          lastName: emp.lastName || '',
          dateOfBirth: emp.dateOfBirth || '',
          department: emp.department || '',
          salary: emp.salary || '',
          permanentAddress: emp.permanentAddress || '',
          currentAddress: emp.currentAddress || '',
        });
      })
      .catch(err => {
        console.error(err);
        setMessage('❌ Failed to fetch employee details.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/employees/${id}`, formData);
      if (file) {
        const formDataObj = new FormData();
        formDataObj.append('file', file);
        await API.post(`/employees/${id}/upload-id-proof`, formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setMessage('✅ Employee updated successfully!');
      setTimeout(() => navigate('/search'), 1500);
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to update employee.');
    }
  };

  const fetchAndShowHistory = async () => {
    try {
      const res = await API.get(`/employees/history/${id}`);
      setHistoryData(res.data);
      setShowHistory(true);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to fetch employee history.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-darkbg rounded shadow text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-4">✏️ Edit Employee</h2>

      {message && (
        <p className={`mb-4 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input className="input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input className="input" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
        <input className="input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input className="input" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="input bg-white dark:bg-gray-800 dark:text-white"
        >
          <option value="">-- Department --</option>
          <option value="Engineering">Engineering</option>
          <option value="Support">Support</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>

        <input className="input" type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
        <textarea className="input" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Permanent Address" required />
        <textarea className="input" name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Current Address" required />

        <div>
          <label className="block text-sm mb-1">Upload New ID Proof:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-600 file:text-white file:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          ✅ Update Employee
        </button>
      </form>

      <button
        onClick={fetchAndShowHistory}
        className="mt-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        📜 Show History
      </button>

      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-lg text-gray-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">📜 History for {formData.firstName} {formData.lastName}</h2>
            <ul className="list-disc list-inside space-y-2 max-h-60 overflow-y-auto text-sm">
              {historyData.map((item, index) => (
                <li key={index}>
                  🕒 <strong>{item.timestamp?.split('T')[0]}</strong>: <strong>{item.action}</strong> – {item.description}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowHistory(false)}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEmployeePage;
