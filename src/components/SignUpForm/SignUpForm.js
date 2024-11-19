import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function SignUpForm({ onAuthSuccess }) {
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isNewUser) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("User signed up:", userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("User logged in:", userCredential.user);
      }

      onAuthSuccess(isNewUser, false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during authentication:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user signed in:", result.user);
      onAuthSuccess(false, false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
    }
  };

  const toggleForm = () => {
    setIsNewUser(!isNewUser);
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

          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2 bg-white text-gray-700 rounded-lg font-medium text-lg border border-gray-300 hover:bg-gray-50 transition duration-200 flex items-center justify-center shadow-sm"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>

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
