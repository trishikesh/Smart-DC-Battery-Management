import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BatteryCard = ({ batteryData, onClose }) => {
  const { batteryName, batteryType, manufacturer, activationDate, expectedEndDate } = batteryData;

  // Generate random state of charge
  const stateOfCharge = Math.floor(Math.random() * 100) + 1;

  // Sample data for graphs
  const graphData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Current Status',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Voltage Status',
        data: [2, 3, 20, 5, 1, 4],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg border-2 border-blue-400 shadow-md relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-blue-400 hover:text-blue-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h3 className="text-xl font-bold text-white mb-2">{batteryName}</h3>
      <p className="text-white mb-1">Type: {batteryType}</p>
      <p className="text-white mb-1">Manufacturer: {manufacturer}</p>
      <p className="text-white mb-1">Activation Date: {activationDate}</p>
      <p className="text-white mb-1">Expected End Date: {expectedEndDate}</p>
      <p className="text-white mb-4">State of Charge: {stateOfCharge}%</p>

      <div className="mb-4">
        <Line data={graphData} />
      </div>
    </div>
  );
};

export default BatteryCard;