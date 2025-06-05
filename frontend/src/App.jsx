import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddEmployeePage from './pages/AddEmployeePage';
import SearchEmployeePage from './pages/SearchEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Add Employee</Link>
        <Link to="/search" style={{ marginRight: '10px' }}>Search Employee</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AddEmployeePage />} />
        <Route path="/search" element={<SearchEmployeePage />} />
        <Route path="/edit/:id" element={<EditEmployeePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
