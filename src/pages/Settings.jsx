import React, { useState } from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import { Pencil } from 'lucide-react';

function Settings() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add logic to save changes
  };

  return (
    <div className="flex h-screen bg-[#010009] overflow-hidden">
      <Sidebar />

      <div className="flex-grow p-4 ml-64 flex flex-col items-center justify-center">
        <div className="bg-[#1a1a1a] rounded-lg shadow-md p-8 border-2 border-blue-400 w-full max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-6">Profile</h1>
          <div className="flex items-center mb-6">
            <img
              src="path/to/profile.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div className="flex flex-col space-y-4">
              {['Name', 'Email', 'Password', 'Location', 'Phone'].map((field) => (
                <div key={field} className="flex items-center justify-between">
                  <label className="text-white">{field}</label>
                  <div className="flex items-center">
                    <input
                      type={field === 'Password' ? 'password' : 'text'}
                      className="p-2 border rounded-md bg-[#010009] text-white border-blue-400"
                      disabled={!isEditing}
                    />
                    <Pencil
                      className="ml-2 text-white cursor-pointer"
                      onClick={handleEditClick}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isEditing && (
            <button
              className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-md"
              onClick={handleSaveClick}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;