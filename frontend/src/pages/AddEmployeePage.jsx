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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10 border border-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
        👨‍💼 Add New Employee
      </h2>

      {message && (
        <p className={`text-center font-medium mb-6 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full input"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
            <input
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full input"
              placeholder="M"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full input"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full input bg-white"
            >
              <option value="">-- Select --</option>
              <option value="Engineering">Engineering</option>
              <option value="Support">Support</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary *</label>
          <input
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            required
            className="w-full input"
            placeholder="55000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address *</label>
          <textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            required
            className="w-full input"
            rows={2}
            placeholder="123 Main Street"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Address *</label>
          <textarea
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            required
            className="w-full input"
            rows={2}
            placeholder="456 Elm Avenue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload ID Proof (PDF only, 10KB–1MB)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-600 file:text-white file:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          ➕ Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
