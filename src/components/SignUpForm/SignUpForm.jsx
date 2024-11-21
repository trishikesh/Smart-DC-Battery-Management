import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm({ onAuthSuccess }) {
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      if (value.length === 6) {
        verifyOtp(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNewUser) {
      try {
        const response = await fetch("http://localhost:5000/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        if (response.ok) {
          setShowOtpInput(true);
          await fetch("http://localhost:5000/send-otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email }),
          });
        } else {
          console.error("Failed to create user");
        }
      } catch (error) {
        console.error("Error during user creation:", error.message);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/fetch-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const result = await response.json();

        if (response.ok && result.message === "Login allowed") {
          const userid = result.userId;
          navigate(`/dashboard/${userid}`);
        } else {
          setLoginError(result.message || "Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error.message);
        
      }
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        onAuthSuccess(true, false);
        const userid = result.userId;
        navigate(`/dashboard/${userid}`);
      } else {
        console.error("OTP verification failed");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error.message);
    }
  };

  const toggleForm = () => {
    setIsNewUser(!isNewUser);
    setLoginError("");
  };

  return (
    <div className="flex items-center bg-blue-900 bg-opacity-80 backdrop-blur-md">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-black relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
            {isNewUser ? "Let's Get Started!" : "Welcome back!"}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-6 transition-transform duration-500 ease-in-out"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
            {isNewUser ? "Create Account" : "Log In"}
          </h2>

          {!showOtpInput ? (
            <>
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

              {isNewUser && (
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
                {isNewUser ? "Sign Up" : "Log In"}
              </button>
            </>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1" htmlFor="otp">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter 6-digit OTP"
                required
              />
            </div>
          )}

          {loginError && (
            <div className="text-red-500 text-center mt-3">
              {loginError}
            </div>
          )}

          <div className="text-center mt-3">
            <p className="text-gray-600">
              {isNewUser ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                {isNewUser ? "Log in" : "Sign up"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
