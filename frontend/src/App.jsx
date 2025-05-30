import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddEmployeePage from './pages/AddEmployeePage';
import SearchEmployeePage from './pages/SearchEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage'; // <-- Import here

function App() {
  return (
    <div>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Add Employee</Link>
        <Link to="/search">Search Employee</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AddEmployeePage />} />
        <Route path="/search" element={<SearchEmployeePage />} />
        <Route path="/edit/:id" element={<EditEmployeePage />} /> {/* Add this */}
      </Routes>
    </div>
  );
}

export default App;
