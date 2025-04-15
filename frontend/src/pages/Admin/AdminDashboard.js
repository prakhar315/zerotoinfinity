import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <AdminSidebar />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Admin Dashboard</h1>
          </div>

          {/* Welcome Message */}
          <div className="alert alert-success mb-4">
            <h4 className="alert-heading">Welcome to the Admin Dashboard!</h4>
            <p>You have successfully logged in as an administrator. Use the sidebar to navigate to different sections.</p>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <h5 className="card-title">Users</h5>
                  <p className="card-text">Manage user accounts and view user statistics</p>
                  <Link to="/admin/users" className="text-white">View Users</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h5 className="card-title">Topics</h5>
                  <p className="card-text">Create and manage learning topics</p>
                  <Link to="/admin/topics" className="text-white">Manage Topics</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-white bg-info">
                <div className="card-body">
                  <h5 className="card-title">Content</h5>
                  <p className="card-text">Add and edit educational content</p>
                  <Link to="/admin/content" className="text-white">Manage Content</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-white bg-warning">
                <div className="card-body">
                  <h5 className="card-title">Statistics</h5>
                  <p className="card-text">View platform usage statistics</p>
                  <Link to="/admin/users" className="text-white">View Stats</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Link to="/admin/topics" className="btn btn-outline-primary w-100">
                    <i className="bi bi-plus-circle me-2"></i> Add New Topic
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link to="/admin/content" className="btn btn-outline-success w-100">
                    <i className="bi bi-file-earmark-plus me-2"></i> Add New Content
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link to="/" className="btn btn-outline-secondary w-100">
                    <i className="bi bi-eye me-2"></i> View Public Site
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Guide */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Admin Guide</h5>
            </div>
            <div className="card-body">
              <h6>Getting Started</h6>
              <p>Use the sidebar navigation to access different admin functions:</p>
              <ul>
                <li><strong>Dashboard:</strong> Overview of the platform</li>
                <li><strong>Users:</strong> View and manage user accounts</li>
                <li><strong>Topics:</strong> Create and organize learning topics</li>
                <li><strong>Content:</strong> Add educational content to topics</li>
              </ul>
              <p>For any issues or questions, please contact the system administrator.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
