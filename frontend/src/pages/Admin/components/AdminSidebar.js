import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky pt-3">
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Admin Panel</span>
        </h6>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActive('/admin/dashboard')}`} 
              to="/admin/dashboard"
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActive('/admin/users')}`} 
              to="/admin/users"
            >
              <i className="bi bi-people me-2"></i>
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActive('/admin/topics')}`} 
              to="/admin/topics"
            >
              <i className="bi bi-folder me-2"></i>
              Topics
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${isActive('/admin/content')}`} 
              to="/admin/content"
            >
              <i className="bi bi-file-text me-2"></i>
              Content
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Account</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <button 
              className="nav-link btn btn-link text-start w-100" 
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </li>
          <li className="nav-item">
            <Link 
              className="nav-link" 
              to="/"
            >
              <i className="bi bi-house me-2"></i>
              Back to Site
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminSidebar;
