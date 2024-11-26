import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-battery-management.onrender.com/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await response.json();
      
      if (data.message === "Admin verified") {
        navigate('/admin-dashboard');
      } else {
        navigate('/error');
      }
    } catch (error) {
      console.error('Login error:', error);
      navigate('/error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#010009]">
      <Helmet>
        <title>Admin Login | Battery Management System</title>
        <meta name="description" content="Secure admin login portal for the Battery Management System. Access administrative controls and monitoring features." />
        <meta name="keywords" content="admin login, battery management system, admin portal, secure login" />
        <meta property="og:title" content="Admin Login | Battery Management System" />
        <meta property="og:description" content="Secure admin login portal for managing battery systems and monitoring performance." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Admin Login | Battery Management System" />
        <meta name="twitter:description" content="Secure admin login portal for managing battery systems and monitoring performance." />
      </Helmet>

      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-4 sm:p-6 md:p-8">
        <img
          src="/images/adminlogin.png"
          alt="Login Illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border border-blue-400/30">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-300 text-sm sm:text-base">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-blue-300 mb-1 sm:mb-2 text-sm sm:text-base" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#1a1a1a]/60 border border-blue-400/30 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-blue-300 mb-1 sm:mb-2 text-sm sm:text-base" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#1a1a1a]/60 border border-blue-400/30 text-white focus:outline-none focus:border-blue-500 transition duration-300 text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />
            </div>

            

            <button
              type="submit"
              className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out text-sm sm:text-base mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
