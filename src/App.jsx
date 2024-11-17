import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import UserInfoForm from './components/UserInfoForm/UserInfoForm';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Dashboard from './pages/Dashboard';
import { BarChart } from '@mui/x-charts/BarChart';
import TicketsPage from './pages/Admin/TicketsPage';
import ContactPage from './pages/ContactUs';

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
        <Routes>
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/sign-up" element={<AuthComponent onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/login" element={<AuthComponent onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/admin-login" element={<AuthComponent onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/dashboard" element={
            showUserInfoForm ? <UserInfoForm /> : <Layout><Dashboard /></Layout>
          } />
          <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/tickets" element={<Layout><TicketsPage /></Layout>} />
          <Route path="/contact-us" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
