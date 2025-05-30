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
      // 1. Update employee details
      await API.put(`/employees/${id}`, formData);

      // 2. Upload new file if selected
      if (file) {
        const formDataObj = new FormData();
        formDataObj.append('file', file);
        await API.post(`/employees/${id}/upload-id-proof`, formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setMessage('✅ Employee updated successfully!');
      setTimeout(() => navigate('/search'), 1500); // Redirect after success
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to update employee.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Employee</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="">-- Department --</option>
          <option value="Engineering">Engineering</option>
          <option value="Support">Support</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
        <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Permanent Address" required />
        <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Current Address" required />

        <label>
          Upload New ID Proof:
          <input type="file" onChange={handleFileChange} />
        </label>

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployeePage;
