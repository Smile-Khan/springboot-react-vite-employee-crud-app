import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import EmployeeModal from '../components/EmployeeModal';

const SearchEmployeePage = () => {
  const [filters, setFilters] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    loginId: '',
    department: '',
    dobFrom: '',
    dobTo: '',
  });

  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const params = { ...filters, page, size: 5 };
      const res = await API.get('/employees/search', { params });
      setEmployees(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchEmployees();
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && page < totalPages - 1) {
      setPage(page + 1);
    } else if (direction === 'prev' && page > 0) {
      setPage(page - 1);
    }
  };

  const handleView = (emp) => {
    setSelectedEmployee(emp);
  };

  const handleEdit = (emp) => {
    navigate(`/edit/${emp.id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/employees/${id}`);
      alert('✅ Employee deleted.');
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert('❌ Error deleting employee.');
    }
  };

  const handleBatchDelete = async () => {
    const confirm = window.confirm(`Delete ${selectedIds.length} employees?`);
    if (!confirm) return;

    try {
      await API.post('/employees/delete-multiple', selectedIds); // POST body = [1, 2, 3]
      alert('✅ Deleted selected employees.');
      setSelectedIds([]);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert('❌ Error deleting selected employees.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔍 Search Employees</h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-md mb-6"
      >
        <input name="employeeId" className="input" placeholder="Employee ID" onChange={handleChange} />
        <input name="firstName" className="input" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" className="input" placeholder="Last Name" onChange={handleChange} />
        <input name="loginId" className="input" placeholder="Login ID" onChange={handleChange} />
        <select name="department" className="input" onChange={handleChange}>
          <option value="">-- Department --</option>
          <option value="Engineering">Engineering</option>
          <option value="Support">Support</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
        <input type="date" name="dobFrom" className="input" onChange={handleChange} />
        <input type="date" name="dobTo" className="input" onChange={handleChange} />
        <button type="submit" className="btn-blue mt-1">Search</button>
      </form>

      <table className="w-full border border-gray-300 shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="th">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedIds(
                    e.target.checked ? employees.map((emp) => emp.id) : []
                  )
                }
                checked={selectedIds.length === employees.length && employees.length > 0}
              />
            </th>
            <th className="th">Emp ID</th>
            <th className="th">First Name</th>
            <th className="th">Last Name</th>
            <th className="th">Login ID</th>
            <th className="th">DOB</th>
            <th className="th">Department</th>
            <th className="th">Salary</th>
            <th className="th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="td">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(emp.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds([...selectedIds, emp.id]);
                      } else {
                        setSelectedIds(selectedIds.filter((id) => id !== emp.id));
                      }
                    }}
                  />
                </td>
                <td className="td">{emp.employeeId}</td>
                <td className="td">{emp.firstName}</td>
                <td className="td">{emp.lastName}</td>
                <td className="td">{emp.loginId}</td>
                <td className="td">{emp.dateOfBirth}</td>
                <td className="td">{emp.department}</td>
                <td className="td">{emp.salary}</td>
                <td className="td space-x-2">
                  <button className="btn-view" onClick={() => handleView(emp)}>View</button>
                  <button className="btn-edit" onClick={() => handleEdit(emp)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="td text-center">No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedIds.length > 0 && (
        <button
          className="bg-red-600 text-white px-4 py-2 rounded my-4"
          onClick={handleBatchDelete}
        >
          🗑️ Delete Selected ({selectedIds.length})
        </button>
      )}

      <div className="mt-4 flex items-center gap-4">
        <button disabled={page === 0} className="btn-blue" onClick={() => handlePageChange('prev')}>
          Previous
        </button>
        <span className="text-gray-700">
          Page {page + 1} of {totalPages}
        </span>
        <button disabled={page >= totalPages - 1} className="btn-blue" onClick={() => handlePageChange('next')}>
          Next
        </button>
      </div>

      <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
    </div>
  );
};

export default SearchEmployeePage;
