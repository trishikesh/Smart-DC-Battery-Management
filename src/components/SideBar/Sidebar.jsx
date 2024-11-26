import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Battery, Zap, BoltIcon, Settings, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Sidebar = ({ className = "" }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  return (
    <div className={`fixed lg:block w-64 h-screen bg-[#1a1a1a] text-white p-4 border-r border-blue-400 ${className}`}>
      <div className="mb-24">
        <img src="https://imgur.com/iYhYhYR.png" alt="Logo" className="h-18" />
      </div>
      <nav>
        <ul className="space-y-4 mb-20">
          <Link to={`/dashboard/${userId}`}>
          <li className="hover:bg-[#010009] p-4 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <LayoutDashboard className="text-xl text-white" />Dashboard
          </li>
          </Link>
          <Link to={`/my-batteries/${userId}`}>
          <li className="hover:bg-[#010009] p-4 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Battery className="text-xl text-white" />My Batteries  
          </li>
          </Link>
          <Link to={`/voltage-status/${userId}`}>
          <li className="hover:bg-[#010009] p-4 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Zap className="text-xl text-white" />Voltage Status
          </li>
          </Link>
          <Link to={`/current-status/${userId}`}>
          <li className="hover:bg-[#010009] p-4 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <BoltIcon className="text-xl text-white" />Current Status
          </li>
          </Link>
          <Link to={`/complaint/${userId}`}>
          <li className="hover:bg-[#010009] p-4 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <AlertCircle className="text-xl text-white" />Complaint
          </li>
          </Link>
          <br /><br /><br /><br /><br />
          <Link to={`/settings/${userId}`}>
          <li className="hover:bg-[#010009] p-4 rounded-md cursor-pointer flex items-center gap-2 text-white">
            <Settings className="text-xl text-white" />Settings
          </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;