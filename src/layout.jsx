import React from 'react';
import { Helmet } from 'react-helmet';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Battery Management System</title>
        <link rel="icon" href="https://imgur.com/iYhYhYR.png" />
      </Helmet>
      <header className="bg-black/30 backdrop-blur-md p-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <img 
            src="https://imgur.com/iYhYhYR.png" 
            alt="Battery Management System Logo" 
            className="h-10"
          />
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

export default Layout;