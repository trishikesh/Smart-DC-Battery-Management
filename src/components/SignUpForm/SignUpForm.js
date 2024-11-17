import React, { useState } from 'react';

function SignUpForm({ onAuthSuccess }) {
  const [isNewUser, setIsNewUser] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onAuthSuccess(isNewUser);
  };

  const toggleForm = () => {
    setIsAdmin(false);
    setIsNewUser(!isNewUser);
  };

  const toggleAdminForm = () => {
    setIsAdmin(true);
    setIsNewUser(false);
  };

  return (
    <div className="flex items-center bg-blue-900 bg-opacity-80 backdrop-blur-md">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-black relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
            {isAdmin ? "Admin Portal" : isNewUser ? "Let's Get Started!" : "Welcome back!"}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-6 transition-transform duration-500 ease-in-out"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
            {isAdmin ? 'Admin Login' : isNewUser ? 'Create Account' : 'Log In'}
          </h2>

          {!isAdmin && (
            <div className="mb-3">
              <label className="block text-gray-600 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          {isAdmin && (
            <div className="mb-3">
              <label className="block text-gray-600 font-medium mb-1" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your User ID"
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="block text-gray-600 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {isNewUser && !isAdmin && (
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-200"
          >
            {isAdmin ? 'Admin Login' : isNewUser ? 'Sign Up' : 'Log In'}
          </button>

          <div className="text-center mt-3">
            {!isAdmin ? (
              <p className="text-gray-600">
                {isNewUser ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  {isNewUser ? 'Log in' : 'Sign up'}
                </button>
                {!isNewUser && (
                  <>
                    <br />
                    <button
                      type="button"
                      onClick={toggleAdminForm}
                      className="text-blue-500 hover:underline focus:outline-none mt-2 inline-block"
                    >
                      Admin Login
                    </button>
                  </>
                )}
              </p>
            ) : (
              <p className="text-gray-600">
                Not an Admin?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsAdmin(false);
                    setIsNewUser(true);
                  }}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  Sign up
                </button>
                {' '} or {' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsAdmin(false);
                    setIsNewUser(false);
                  }}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
