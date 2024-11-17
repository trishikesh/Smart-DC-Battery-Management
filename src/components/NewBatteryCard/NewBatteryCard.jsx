import React from 'react';

const NewBatteryCard = ({ batteryData }) => {
  const statuses = ['Optimal', 'Critical', 'Normal'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return (
    <div className="flex items-center bg-[#010009] rounded-lg p-3 border border-blue-400/50 hover:border-blue-400 transition-all duration-300 transform hover:scale-[1.01] hover:translate-x-0">
      <div className="flex-1">
        <h3 className="font-medium text-lg text-white">{batteryData.batteryName}</h3>
        <p className="text-sm text-gray-400">Type: {batteryData.batteryType}</p>
        <p className="text-sm text-gray-400">Activation Date: {batteryData.activationDate}</p>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-300">Status: {randomStatus}</p>
        
      </div>
    </div>
  );
};

export default NewBatteryCard;