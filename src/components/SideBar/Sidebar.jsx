import React from 'react';
import { LayoutDashboard, Battery, Zap, BoltIcon, Settings, Users, Calendar, FileText, Bell } from 'lucide-react';

const Sidebar = ({ className = "" }) => {
  return (
    <div className={`fixed lg:block w-64 h-screen bg-green-600 text-white p-4 ${className}`}>
      <div className="text-2xl font-bold mb-8 text-white">Mediline</div>
      <nav>
        <ul className="space-y-4">
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <LayoutDashboard className="text-xl text-white" />Dashboard
          </li>
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Battery className="text-xl text-white" />My Batteries  
          </li>
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Zap className="text-xl text-white" />Voltage Status
          </li>
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <BoltIcon className="text-xl text-white" />Current Status
          </li>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Settings className="text-xl text-white" />Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;