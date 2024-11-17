import React from 'react';
import Sidebar from '../components/SideBar/Sidebar';

const MyBatteries = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-grow p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8">My Batteries</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4, 5].map((battery) => (
            <div key={battery} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Battery {battery}</h2>
              <p className="text-sm text-gray-500">Capacity: 5000mAh</p>
              <p className="text-sm text-gray-500">Voltage: 3.7V</p>
              <p className="text-sm text-gray-500">Status: Good</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBatteries; 