import React from 'react';
import { LayoutDashboard, Battery, Zap, BoltIcon, Settings, AlertCircle } from 'lucide-react';

const Sidebar = ({ className = "" }) => {
  return (
    <div className={`fixed lg:block w-64 h-screen bg-[#1a1a1a] text-white p-4 border-r border-blue-400 ${className}`}>
      <div className="mb-12">
        <img src="images/logowhite.png" alt="Logo" className="h-18" />
      </div>
      <nav>
        <ul className="space-y-4">
          <li className="hover:bg-[#010009] p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <LayoutDashboard className="text-xl text-white" />Dashboard
          </li>
          <li className="hover:bg-[#010009] p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Battery className="text-xl text-white" />My Batteries  
          </li>
          <li className="hover:bg-[#010009] p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Zap className="text-xl text-white" />Voltage Status
          </li>
          <li className="hover:bg-[#010009] p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <BoltIcon className="text-xl text-white" />Current Status
          </li>
          <li className="hover:bg-[#010009] p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <AlertCircle className="text-xl text-white" />Complaint
          </li>
          <br /><br /><br /><br /><br />
          <li className="hover:bg-[#010009] p-2 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Settings className="text-xl text-white" />Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;