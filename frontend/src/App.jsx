import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import AddEmployeePage from './pages/AddEmployeePage';
import SearchEmployeePage from './pages/SearchEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import LoginPage from './pages/LoginPage';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('🔒 Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
        <nav className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold underline'
                : 'text-gray-600 hover:text-primary dark:text-gray-300'
            }
          >
            Add Employee
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-semibold underline'
                : 'text-gray-600 hover:text-primary dark:text-gray-300'
            }
          >
            Search Employee
          </NavLink>
          {!isLoggedIn && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? 'text-primary font-semibold underline'
                  : 'text-gray-600 hover:text-primary dark:text-gray-300'
              }
            >
              Login
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Routes */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<AddEmployeePage />} />
          <Route path="/search" element={<SearchEmployeePage />} />
          <Route path="/edit/:id" element={<EditEmployeePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
