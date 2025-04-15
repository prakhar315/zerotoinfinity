import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TopicDetail from './pages/TopicDetail';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TopicManager from './pages/Admin/TopicManager';
import ContentManager from './pages/Admin/ContentManager';
import UserStats from './pages/Admin/UserStats';

// Admin route guard component
const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const hasToken = localStorage.getItem('token');

  if (!isAdmin || !hasToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/topics" element={
            <AdminRoute>
              <TopicManager />
            </AdminRoute>
          } />
          <Route path="/admin/content" element={
            <AdminRoute>
              <ContentManager />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <UserStats />
            </AdminRoute>
          } />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Main App Routes */}
          <Route path="/" element={
            <>
              <Header />
              <main className="main-content">
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Header />
              <main className="main-content">
                <Login />
              </main>
              <Footer />
            </>
          } />
          <Route path="/register" element={
            <>
              <Header />
              <main className="main-content">
                <Register />
              </main>
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header />
              <main className="main-content">
                <Profile />
              </main>
              <Footer />
            </>
          } />
          <Route path="/topics/:topicId" element={
            <>
              <Header />
              <main className="main-content">
                <TopicDetail />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
