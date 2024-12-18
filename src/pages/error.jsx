import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 | Page Not Found</title>
        <meta name="description" content="The page you are looking for cannot be found. Please check the URL or return to homepage." />
      </Helmet>

      <div className="min-h-screen bg-[#010009] flex flex-col items-center justify-center p-4">
        <img 
          src="https://imgur.com/KBwixYe.jpg" 
          alt="404 Error" 
          className="max-w-md w-full h-auto mb-8"
        />
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-blue-300 text-center mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
        >
          Return Home
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
