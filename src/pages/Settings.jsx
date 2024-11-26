import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar/Sidebar';
import { LogOut } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Settings() {
  const { userId } = useParams();
  console.log(userId)
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    phone: ''
  });
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    email: '', 
    location: '',
    phone: ''
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
            name: result.name,
            email: result.email,
            location: result.location,
            phone: result.phoneNumber
          });
          setUpdateFormData({
            name: result.name,
            email: result.email,
            location: result.location,
            phone: result.phoneNumber
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
    setUpdateFormData({ ...updateFormData, [name.toLowerCase()]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('https://backend-battery-management.onrender.com/update-user-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          name: updateFormData.name,
          email: updateFormData.email,
          location: updateFormData.location,
          phone: updateFormData.phone
        }),
      });

      const result = await response.json();
      if (result.message === 'User details updated successfully' || 
          result.message === 'User details updated and converted to existing user') {
        alert('Profile updated successfully');
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

  const confirmLogout = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Settings | Battery Management System</title>
        <meta name="description" content="Manage your profile settings, update personal information, and customize your account preferences." />
        <meta name="keywords" content="settings, profile settings, account management, user preferences, battery management system" />
        <meta property="og:title" content="Settings | Battery Management System" />
        <meta property="og:description" content="Manage your profile settings and account preferences in the Battery Management System." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex flex-col md:flex-row min-h-screen bg-[#010009]">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-grow p-4 md:ml-64">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-1.5 bg-[#1a1a1a] border border-blue-400 text-white rounded-lg hover:bg-[#2a2a2a] transition-all"
            >
              <LogOut className="mr-1.5 h-4 w-4" />
              Log Out
            </button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-4 md:p-6 border border-blue-400">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center md:text-left">Profile Settings</h1>
              
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="relative group">
                  <img
                    src="path/to/profile.jpg"
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-blue-400 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="flex-grow w-full max-w-xl space-y-4">
                  {['Name', 'Email', 'Location', 'Phone'].map((field) => (
                    <div key={field} className="flex flex-col md:flex-row md:items-center gap-2">
                      <label className="text-white text-base min-w-[80px]">{field}</label>
                      <div className="flex-grow">
                        <input
                          type="text"
                          name={field}
                          value={isEditing ? updateFormData[field.toLowerCase()] : formData[field.toLowerCase()]}
                          onChange={handleInputChange}
                          placeholder={`Enter your ${field.toLowerCase()}`}
                          className="w-full p-2 border rounded-md bg-[#010009] text-white border-blue-400 focus:ring-1 focus:ring-blue-500"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-gray-400 text-xs">Please use the same email ID which you used to register.</p>
                  <div className="flex justify-end">
                    {!isEditing && (
                      <button
                        className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90"
                    onClick={handleSaveClick}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {showLogoutModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-blue-400 w-full max-w-sm mx-4">
                <h2 className="text-xl font-bold text-white mb-3">Confirm Logout</h2>
                <p className="text-gray-300 mb-4">Do you want to log out?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-4 py-1.5 bg-[#2a2a2a] text-white rounded-md hover:bg-[#3a3a3a]"
                  >
                    No
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Settings;