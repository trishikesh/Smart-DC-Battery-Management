import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from './layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Dashboard from './pages/Dashboard';
import TicketsPage from './pages/Admin/TicketsPage';
import ContactPage from './pages/ContactUs';
import MyBatteries from './pages/MyBatteries';
import VoltageStatus from './pages/VoltageStatus';
import CurrentStatus from './pages/CurrentStatus';
import Settings from './pages/Settings';
import Complaint from './pages/Complaint';
import ErrorPage from './pages/error';
import AdminLogin from './pages/Admin/login';

const AuthComponent = ({ onAuthSuccess }) => {
  const navigate = useNavigate();

  const handleFormSuccess = (isSignup, isAdmin) => {
    onAuthSuccess(isSignup, isAdmin);
    if (isAdmin) {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <SignUp onAuthSuccess={handleFormSuccess} />
  );
};

function App() {
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAuthSuccess = (isSignup, isAdmin) => {
    setIsAdmin(isAdmin);
    if (isSignup && !isAdmin) {
      setShowUserInfoForm(true);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Battery Management System</title>
          <meta name="description" content="A comprehensive battery management system" />
          <link rel="icon" href="https://imgur.com/iYhYhYR.png" />
          <meta name="theme-color" content="#000000" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/sign-up" element={<AuthComponent onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/login" element={<AuthComponent onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/dashboard/:userId" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/admin/tickets" element={<Layout><TicketsPage /></Layout>} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/my-batteries/:userId" element={<Layout><MyBatteries /></Layout>} />
          <Route path="/voltage-status/:userId" element={<Layout><VoltageStatus /></Layout>} />
          <Route path="/current-status/:userId" element={<Layout><CurrentStatus /></Layout>} />
          <Route path="/settings/:userId" element={<Layout><Settings /></Layout>} />
          <Route path="/complaint/:userId" element={<Layout><Complaint /></Layout>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
