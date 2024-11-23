import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar/Sidebar';
import { LogOut } from 'lucide-react';
import { useParams } from 'react-router-dom';

function Settings() {
  const { userId } = useParams();
  console.log(userId)
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Location: '',
    Phone: ''
  });
  const [updateFormData, setUpdateFormData] = useState({
    Name: '',
    Email: '', 
    Location: '',
    Phone: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('https://backend-battery-management.onrender.com/jhingalala', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        const result = await response.json();
        if (result.userType === 'existing_user') {
          setFormData({
            Name: result.name,
            Email: result.email,
            Location: result.location,
            Phone: result.phoneNumber
          });
          setUpdateFormData({
            Name: result.name,
            Email: result.email,
            Location: result.location,
            Phone: result.phoneNumber
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('https://backend-battery-management.onrender.com/update-user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...updateFormData }),
      });

      const result = await response.json();
      if (result.message === 'User details updated and userType changed to existing_user') {
        alert('Profile updated');
        setFormData(updateFormData);
        navigate(`/dashboard/${userId}`);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();
      if (result.message === 'User logged out successfully') {
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#010009] overflow-x-hidden">
      <div className="md:hidden w-full">
        <Sidebar />
      </div>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-grow p-4 md:ml-64 w-full">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-[#1a1a1a] border-2 border-blue-400 text-white rounded-lg hover:bg-[#2a2a2a] transition-all duration-300"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </button>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-xl shadow-2xl p-6 md:p-8 border-2 border-blue-400">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center md:text-left">Profile Settings</h1>
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative group">
                <img
                  src="path/to/profile.jpg"
                  alt="Profile"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-400 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="flex-grow w-full max-w-2xl space-y-6">
                {['Name', 'Email', 'Location', 'Phone'].map((field) => (
                  <div key={field} className="flex flex-col md:flex-row md:items-center gap-4">
                    <label className="text-white text-lg min-w-[100px]">{field}</label>
                    <div className="flex-grow flex items-center">
                      <input
                        type="text"
                        name={field}
                        value={isEditing ? updateFormData[field] : formData[field]}
                        onChange={handleInputChange}
                        placeholder={`Enter your ${field.toLowerCase()}`}
                        className="w-full p-3 border rounded-lg bg-[#010009] text-white border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-gray-400 text-sm mt-2">Please use the same email ID which you used to register.</p>
                <div className="flex justify-end">
                  {!isEditing && (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                      onClick={handleEditClick}
                    >
                      Update Details
                    </button>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-center md:justify-end">
                <button
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105"
                  onClick={handleSaveClick}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-[#1a1a1a] p-8 rounded-xl border-2 border-blue-400 w-full max-w-md mx-4 transform transition-all duration-300 scale-100 opacity-100">
              <h2 className="text-2xl font-bold text-white mb-4">Confirm Logout</h2>
              <p className="text-gray-300 mb-6">Do you want to log out?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
                >
                  No
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;