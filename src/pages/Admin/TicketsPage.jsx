import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function TicketsPage() {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('https://backend-battery-management.onrender.com/all-complaints', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      // Filter out complaints that don't have a complaint number
      const validComplaints = data.filter(complaint => complaint.complaintNumber);
      setComplaints(validComplaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const systemUpdates = [
    {
      title: 'Software Update Required',
      description: 'New firmware version 2.1.0 available for charging stations',
      priority: 'High',
      date: '2024-01-15'
    },
    {
      title: 'Security Patch',
      description: 'Critical security update pending for battery monitoring system',
      priority: 'Critical',
      date: '2024-01-14'
    },
    {
      title: 'System Maintenance',
      description: 'Scheduled maintenance for database optimization',
      priority: 'Medium',
      date: '2024-01-13'
    }
  ];

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const handleStatusChange = async (complaintNumber, newStatus) => {
    try {
      const response = await fetch('https://backend-battery-management.onrender.com/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          complaintNumber: complaintNumber,
          newStatus: newStatus // Changed from status to newStatus
        })
      });
      if (response.ok) {
        // Refresh complaints after successful update
        fetchComplaints();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Onhold':
        return 'bg-orange-100 text-orange-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComplaints = filterStatus === 'All' 
    ? complaints 
    : complaints.filter(complaint => complaint.status === filterStatus);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Tickets | Battery Management System</title>
        <meta name="description" content="View and manage support tickets for battery systems. Track ticket status, update priorities, and monitor system updates." />
        <meta name="keywords" content="tickets, support tickets, battery management, ticket tracking, system updates" />
        <meta property="og:title" content="Tickets | Battery Management System" />
        <meta property="og:description" content="Comprehensive ticket management system for battery-related issues and updates." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tickets | Battery Management System" />
        <meta name="twitter:description" content="Comprehensive ticket management system for battery-related issues and updates." />
      </Helmet>

      {/* Simple navbar */}
      <nav className="bg-white shadow-md py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <img src="https://imgur.com/mna3iM9.png" alt="Logo" className="h-10" />
          <div className="flex gap-12 mr-8">
            <button 
              className="text-gray-600 hover:text-blue-600 text-lg"
              onClick={() => navigate('/admin-dashboard')}
            >
              Home
            </button>
            <button className="text-gray-600 hover:text-blue-600 text-lg">
              Tickets
            </button>
            <button 
              className="text-gray-600 hover:text-blue-600 text-lg" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main content with top margin for spacing */}
      <div className="max-w-7xl mx-auto p-3 mt-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <div className="bg-gray-200 rounded-lg p-4 h-full overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Recent Tickets</h2>
                <div className="flex space-x-4">
                  {['All', 'Pending', 'Onhold', 'Resolved'].map((status) => (
                    <label key={status} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={filterStatus === status}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {filteredComplaints.map((complaint, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium">{complaint.batteryName}</h3>
                          <span className="text-sm text-gray-500">Ticket #{complaint.complaintNumber}</span>
                        </div>
                        <p className="text-sm text-gray-600">Level: {complaint.level}</p>
                        <p className="text-sm text-gray-500 mt-1">{complaint.description}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <select 
                          className={`px-3 py-1 rounded-lg text-sm border ${getStatusColor(complaint.status)}`}
                          value={complaint.status}
                          onChange={(e) => handleStatusChange(complaint.complaintNumber, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Onhold">On Hold</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                        <span className="text-sm text-gray-500 mt-2">{complaint.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-gray-200 rounded-lg p-4 h-full overflow-auto">
              <h2 className="font-semibold mb-4">System Updates</h2>
              <div className="space-y-3">
                {systemUpdates.map((update, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-medium">{update.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{update.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(update.priority)}`}>
                        {update.priority}
                      </span>
                      <span className="text-sm text-gray-500">{update.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

export default TicketsPage;
