import React, { useState } from 'react';

function AdminForm() {
  const [connectionStatus, setConnectionStatus] = useState('Not Connected');
  const [errorMessage, setErrorMessage] = useState('');

  const checkDatabaseConnection = async () => {
    try {
      // Simulate connection check
      setConnectionStatus('Database Connected');
      setErrorMessage('');
      console.log('Successfully connected');
    } catch (error) {
      setConnectionStatus('Connection Failed');
      setErrorMessage(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Connection Test</h2>
      
      <button
        onClick={checkDatabaseConnection}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Test Connection
      </button>

      <div className="mt-4">
        <p className="text-lg">
          Status: <span className={connectionStatus === 'Database Connected' ? 'text-green-600' : 'text-red-600'}>
            {connectionStatus}
          </span>
        </p>
        {errorMessage && (
          <p className="text-red-600 mt-2">
            Error: {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminForm;
