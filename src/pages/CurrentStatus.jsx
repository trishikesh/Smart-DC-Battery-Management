import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../components/SideBar/Sidebar';
import { Helmet } from 'react-helmet';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CurrentStatus = () => {
  const [filter, setFilter] = useState('All');

  // Sample data for the bar graph
  const allCurrentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Current Status',
        data: [12, 19, 3, 5, 2, 3], // Data from BatteryCardDetailed.jsx
        backgroundColor: 'linear-gradient(90deg, rgba(54, 162, 235, 0.8), rgba(153, 102, 255, 0.8))',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Filtered data based on the selected filter
  const getFilteredData = () => {
    switch (filter) {
      case 'High':
        return { ...allCurrentData, datasets: [{ ...allCurrentData.datasets[0], data: [19, 20, 18, 17, 16, 15] }] };
      case 'Medium':
        return { ...allCurrentData, datasets: [{ ...allCurrentData.datasets[0], data: [10, 12, 11, 13, 14, 10] }] };
      case 'Low':
        return { ...allCurrentData, datasets: [{ ...allCurrentData.datasets[0], data: [2, 3, 1, 4, 2, 3] }] };
      default:
        return allCurrentData;
    }
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Current Status | Battery Management System</title>
        <meta name="description" content="Monitor real-time current status of your batteries with detailed graphs and filtering options." />
        <meta name="keywords" content="battery current, current monitoring, battery management, current status" />
      </Helmet>

      <div className="flex h-screen bg-[#010009] overflow-hidden">
        <Sidebar />
        <div className="flex-grow p-4 ml-64 flex flex-col">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-bold text-white">Over-All Current Status</h1>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <label className="text-white mr-4">
              <input 
                type="radio" 
                value="All" 
                checked={filter === 'All'} 
                onChange={handleFilterChange} 
                className="mr-2"
              />
              All
            </label>
            <label className="text-white mr-4">
              <input 
                type="radio" 
                value="High" 
                checked={filter === 'High'} 
                onChange={handleFilterChange} 
                className="mr-2"
              />
              High
            </label>
            <label className="text-white mr-4">
              <input 
                type="radio" 
                value="Medium" 
                checked={filter === 'Medium'} 
                onChange={handleFilterChange} 
                className="mr-2"
              />
              Medium
            </label>
            <label className="text-white">
              <input 
                type="radio" 
                value="Low" 
                checked={filter === 'Low'} 
                onChange={handleFilterChange} 
                className="mr-2"
              />
              Low
            </label>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg shadow-md p-2 border-2 border-blue-400">
            <Bar data={getFilteredData()} options={{
              plugins: {
                legend: {
                  labels: {
                    color: 'white'
                  }
                }
              },
              scales: {
                x: {
                  ticks: {
                    color: 'white'
                  }
                },
                y: {
                  ticks: {
                    color: 'white'
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentStatus;