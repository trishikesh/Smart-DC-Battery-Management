import React from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Home() {
  return (
    <div className="flex h-screen bg-[#010009] overflow-hidden">
      <Sidebar />

      <div className="flex-grow p-4 ml-64 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">Welcome, User!</h1>
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
              <div className="flex items-center bg-[#010009] rounded-lg p-2 border border-blue-400">
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-white">Battery Pack A</h3>
                  <p className="text-sm text-gray-400">Last checked: 2 hours ago</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Status: Optimal</p>
                  <p className="text-sm text-gray-300">Charge: 85%</p>
                </div>
              </div>

              <div className="flex items-center bg-[#010009] rounded-lg p-2 border border-blue-400">
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-white">Battery Pack B</h3>
                  <p className="text-sm text-gray-400">Last checked: 5 hours ago</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Status: Good</p>
                  <p className="text-sm text-gray-300">Charge: 72%</p>
                </div>
              </div>

              <div className="flex items-center bg-[#010009] rounded-lg p-2 border border-blue-400">
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-white">Battery Pack C</h3>
                  <p className="text-sm text-gray-400">Last checked: 1 day ago</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Status: Needs Attention</p>
                  <p className="text-sm text-gray-300">Charge: 45%</p>
                </div>
              </div>

              <div className="flex items-center bg-[#010009] rounded-lg p-2 border border-blue-400">
                <div className="flex-1">
                  <h3 className="font-medium text-lg text-white">Battery Pack D</h3>
                  <p className="text-sm text-gray-400">Last checked: 2 days ago</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">Status: Critical</p>
                  <p className="text-sm text-gray-300">Charge: 15%</p>
                </div>
              </div>
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
      </div>
    </div>
  );
}

export default Home;