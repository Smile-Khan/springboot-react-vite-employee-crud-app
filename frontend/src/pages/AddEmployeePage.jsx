import React, { useState } from 'react';
import API from '../services/api';

const AddEmployeePage = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/employees', formData);
      const empId = res.data.id;

      if (file) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        await API.post(`/employees/upload-id/${empId}`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setMessage('✅ Employee added successfully!');
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        department: '',
        salary: '',
        permanentAddress: '',
        currentAddress: '',
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage('❌ Error adding employee.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Employee</h2>

      {message && (
        <p
          className={`mb-6 text-center font-medium ${
            message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="input"
          />
          <input
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="input bg-white"
        >
          <option value="">-- Select Department --</option>
          <option value="Engineering">Engineering</option>
          <option value="Support">Support</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>

        <input
          name="salary"
          type="number"
          placeholder="Salary *"
          value={formData.salary}
          onChange={handleChange}
          required
          className="input"
        />

        <textarea
          name="permanentAddress"
          placeholder="Permanent Address *"
          value={formData.permanentAddress}
          onChange={handleChange}
          required
          className="input"
          rows={2}
        />

        <textarea
          name="currentAddress"
          placeholder="Current Address *"
          value={formData.currentAddress}
          onChange={handleChange}
          required
          className="input"
          rows={2}
        />

        <div className="text-sm text-gray-600 mb-2">Upload ID Proof (PDF only)</div>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
