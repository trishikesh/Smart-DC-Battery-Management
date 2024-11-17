import React from 'react';
import SignUpForm from '../components/SignUpForm/SignUpForm';

const SignUp = ({ onAuthSuccess }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-blue-900 bg-opacity-80 backdrop-blur-md">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <SignUpForm onAuthSuccess={onAuthSuccess} />
        </div>
      </div>
      
    </div>
  );
};

export default SignUp; 