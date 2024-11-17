import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-green-800 text-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold">
          Battery
        </div>
        {/* Details */}
        <div className="text-sm text-center sm:text-right">
          <p>© 2023 Battery Management System</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;