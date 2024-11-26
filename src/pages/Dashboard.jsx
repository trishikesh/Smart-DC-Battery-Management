import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/SideBar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Home() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [batteries, setBatteries] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://backend-battery-management.onrender.com/get-user-info?userId=${userId}`);
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
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
        // Filter out batteries with null values, then sort by date and get last 4
        const filteredBatteries = data.filter(battery => {
          return Object.values(battery).every(value => value !== null);
        });
        const sortedBatteries = filteredBatteries
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);
        setBatteries(sortedBatteries);
      } catch (error) {
        console.error('Error fetching batteries:', error);
      }
    };

    fetchUserInfo();
    fetchBatteries();
  }, [userId]);

  const handleCreateProfileClick = () => {
    setShowSettings(true);
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-[#010009] overflow-hidden">
      {userInfo.userType === 'existing_user' && <Sidebar />}
      <div className={`flex-grow p-4 ${userInfo.userType === 'existing_user' ? 'ml-64' : ''} flex flex-col`}>
        {userInfo.userType === 'existing_user' ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-white">
                {`Hello, ${userInfo.name}!`}
              </h1>
              <div className="relative w-1/2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input type="text" placeholder="Search here" className="pl-10 p-2 border rounded-md w-full bg-[#1a1a1a] text-white border-blue-400" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
              <div className="col-span-8 bg-[#1a1a1a] rounded-lg shadow-md p-4 border-2 border-blue-400">
                <h2 className="text-lg font-semibold mb-3 text-white">Recently Viewed</h2>
                <div className="flex flex-col space-y-2">
                  {batteries.map((battery, index) => (
                    <div key={index} className="flex items-center bg-[#010009] rounded-lg p-2 border border-blue-400">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-white">{battery.batteryName}</h3>
                        <p className="text-sm text-gray-400">Last checked: {new Date(battery.date).toLocaleString()}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">Status: {battery.status}</p>
                        <p className="text-sm text-gray-300">Charge: {battery.charge}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            
              <div className="col-span-4 flex flex-col gap-4">
                <div className="bg-[#1a1a1a] rounded-lg shadow-md p-3 border-2 border-blue-400 ">
                  <h2 className="text-lg font-semibold mb-2 text-white">Calendar</h2>
                  <Calendar 
                    className="w-full rounded-lg border-none text-sm bg-white text-black"
                    tileClassName="text-xs p-1"
                  />
                </div>

                <div className="bg-[#1a1a1a] rounded-lg shadow-md p-3 border-2 border-blue-400">
                  <h2 className="text-lg font-semibold mb-2 text-white">Notifications</h2>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-[#010009] rounded-lg border border-blue-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-xs text-white">New battery status update</p>
                    </div>
                    <div className="flex items-center p-2 bg-[#010009] rounded-lg border border-blue-400">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <p className="text-xs text-white">Maintenance reminder</p>
                    </div>
                    <div className="flex items-center p-2 bg-[#010009] rounded-lg border border-blue-400">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <p className="text-xs text-white">Critical battery alert</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#010009] bg-opacity-80">
            <div className="fixed left-0 top-0 h-full">
              <Sidebar />
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg text-center border border-blue-400">
              <div className="mb-4">
                <svg className="w-12 h-12 text-yellow-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">Attention please!</h2>
              <p className="text-gray-300 mb-4">In order to continue with the app, please create your profile.</p>
              <Link to={`/settings/${userId}`}>
                <button className="py-2 px-4 bg-blue-500 text-white rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-200">
                  Create Your Profile
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;