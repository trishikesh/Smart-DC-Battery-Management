import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md text-white py-2 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src="https://imgur.com/iYhYhYR.png" alt="Logo" className="h-8" />
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © 2024 Battery Management System. All rights reserved.
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;