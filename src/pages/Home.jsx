import React from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-grow p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <input type="text" placeholder="search here" className="p-2 border rounded-md" />
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 bg-gray-50 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Welcome, User!</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-6">Recently Viewed</h2>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center bg-gray-50 rounded-lg p-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">Battery Pack A</h3>
                    <p className="text-sm text-gray-500">Last checked: 2 hours ago</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Status: Optimal</p>
                    <p className="text-sm text-gray-600">Charge: 85%</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">Battery Pack B</h3>
                    <p className="text-sm text-gray-500">Last checked: 5 hours ago</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Status: Good</p>
                    <p className="text-sm text-gray-600">Charge: 72%</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">Battery Pack C</h3>
                    <p className="text-sm text-gray-500">Last checked: 1 day ago</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Status: Needs Attention</p>
                    <p className="text-sm text-gray-600">Charge: 45%</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">Battery Pack D</h3>
                    <p className="text-sm text-gray-500">Last checked: 2 days ago</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Status: Critical</p>
                    <p className="text-sm text-gray-600">Charge: 15%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">Calendar</h2>
              <Calendar 
                className="w-full rounded-lg border-none text-sm"
                tileClassName="text-xs p-1"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">Notifications</h2>
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-xs">New battery status update</p>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <p className="text-xs">Maintenance reminder</p>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <p className="text-xs">Critical battery alert</p>
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