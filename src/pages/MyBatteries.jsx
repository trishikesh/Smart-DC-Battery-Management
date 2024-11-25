import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import NewBattery from '../components/NewBatteryForm/NewBatteryForm';
import NewBatteryCard from '../components/NewBatteryCard/NewBatteryCard';
import BatteryCardDetailed from '../components/BatteryCardDetailed/BatteryCardDetailed';
import { useParams } from 'react-router-dom';   

function Home() {
  const [showNewBatteryForm, setShowNewBatteryForm] = useState(false);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [batteries, setBatteries] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchBatteries = async () => {
      try {
        const response = await fetch('https://backend-battery-management.onrender.com/fetch-battery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId })
        });
        const data = await response.json();
        // Filter out batteries with null values
        const filteredBatteries = data.filter(battery => {
          return Object.values(battery).every(value => value !== null);
        });
        setBatteries(filteredBatteries);
      } catch (error) {
        console.error('Error fetching batteries:', error);
      }
    };

    fetchBatteries();
  }, [userId]);

  const handleBatteryClick = (batteryData) => {
    setSelectedBattery(batteryData);
  };

  return (
    <div className="flex h-screen bg-[#010009] overflow-hidden">
      <Sidebar />

      <div className="flex-grow p-6 ml-64 flex flex-col">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">My Batteries</h1>
            <div className="relative w-1/2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input type="text" placeholder="Search here" className="pl-10 p-2 border rounded-md w-full bg-[#1a1a1a] text-white border-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 bg-[#1a1a1a] rounded-lg shadow-md p-4 border-2 border-blue-400 h-[calc(112vh-200px)]">
              <div className="flex flex-col space-y-3 h-full overflow-y-auto px-2 scrollbar-none hover:scrollbar-thin scrollbar-thumb-blue-400/30 hover:scrollbar-thumb-blue-400/50 scrollbar-track-transparent transition-all duration-300">
                {batteries.map((battery, index) => (
                  <div key={index} onClick={() => handleBatteryClick(battery)} className="cursor-pointer">
                    <NewBatteryCard batteryData={battery} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Battery Button */}
        <button 
          onClick={() => setShowNewBatteryForm(true)}
          className="fixed bottom-2 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* New Battery Form Modal */}
        {showNewBatteryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
            <div className="bg-[#1a1a1a] p-6 rounded-lg border-2 border-blue-400 w-[500px] transform transition-all duration-300 scale-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Add New Battery</h2>
                <button 
                  onClick={() => setShowNewBatteryForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <NewBattery onClose={() => setShowNewBatteryForm(false)} />
            </div>
          </div>
        )}

        {/* Battery Details Modal */}
        {selectedBattery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
            <div className="bg-[#1a1a1a] p-0 rounded-lg border-2 border-blue-400 w-[500px] transform transition-all duration-300 scale-100">
              <BatteryCardDetailed batteryData={selectedBattery} onClose={() => setSelectedBattery(null)} />
            </div>
          </div>
        )}
      </div>
    </div>  
  );
}

export default Home;