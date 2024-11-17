import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [date, setDate] = useState(new Date());
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    navigate('/public');
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const months = ['July', 'August', 'September', 'October', 'November'];
  
  const stateOfHealth = [85, 82, 88, 90, 87];
  const stateOfCharge = [75, 78, 82, 80, 85];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome, Admin</h1>
        <div className="space-x-4">
          <button className="text-blue-600 hover:underline">HOME</button>
          <button className="text-blue-600 hover:underline">TICKETS</button>
          <button className="text-blue-600 hover:underline" onClick={handleLogout}>LOG-OUT</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-gray-200 rounded-lg p-4 h-auto">
            <h2 className="font-semibold mb-4">Recent Tickets</h2>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Battery Performance Issue</h3>
                    <p className="text-sm text-gray-600">Reported by: John Doe</p>
                    <p className="text-sm text-gray-500 mt-1">Battery draining faster than usual in cold weather</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">Pending</span>
                    <span className="text-sm text-gray-500 mt-2">2 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Charging Station Malfunction</h3>
                    <p className="text-sm text-gray-600">Reported by: Jane Smith</p>
                    <p className="text-sm text-gray-500 mt-1">Station #4 not responding to charging attempts</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">Pending</span>
                    <span className="text-sm text-gray-500 mt-2">5 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Battery Health Alert</h3>
                    <p className="text-sm text-gray-600">Reported by: Mike Johnson</p>
                    <p className="text-sm text-gray-500 mt-1">Unexpected decrease in battery health metrics</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">Pending</span>
                    <span className="text-sm text-gray-500 mt-2">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-gray-200 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Calendar</h2>
            <div className="calendar-container">
              <Calendar 
                onChange={setDate}
                value={date}
                className="rounded-lg border-none shadow-lg"
                tileClassName="text-sm p-2"
                navigationLabel={({ date }) => 
                  date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-gray-200 rounded-lg p-4">
          <h2 className="font-semibold mb-4">Regional Battery Performance</h2>
          <div className="h-80">
            <BarChart
              series={[
                {
                  data: stateOfHealth,
                  label: 'State of Health (%)',
                  color: '#4CAF50'
                },
                {
                  data: stateOfCharge,
                  label: 'State of Charge (%)',
                  color: '#2196F3'
                }
              ]}
              xAxis={[{ 
                data: months,
                scaleType: 'band'
              }]}
              yAxis={[{
                min: 0,
                max: 100
              }]}
              height={300}
            />
          </div>
        </div>
      </div>

      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Do you want to Log Out?</h2>
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={confirmLogout}>Yes</button>
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={cancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
