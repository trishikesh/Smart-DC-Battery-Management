import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar/Sidebar';
import { useParams } from 'react-router-dom';

function Complaint() {
  const { userId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [formData, setFormData] = useState({
    batteryName: '',
    date: new Date().toISOString().split('T')[0],
    level: 'Normal',
    description: ''
  });

  useEffect(() => {
    fetchComplaints();
  }, [userId]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('https://backend-battery-management.onrender.com/lodge-complaints', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-battery-management.onrender.com/lodge-complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userId,
    
        })
      });

      if (response.ok) {
        const newComplaint = await response.json();
        setComplaints([newComplaint, ...complaints]);
        setFormData({
          batteryName: '',
          date: new Date().toISOString().split('T')[0],
          level: 'Normal',
          description: ''
        });
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (statusFilter === 'All') return true;
    return complaint.status === statusFilter;
  });

  return (
    <div className="flex h-screen bg-[#010009] overflow-hidden">
      <Sidebar />

      <div className="flex-grow p-6 ml-64 flex flex-col">
        <h1 className="text-3xl font-bold text-white mb-6">My Complaints</h1>
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 bg-[#1a1a1a] rounded-lg shadow-md p-4 border-2 border-blue-400">
            <div className="flex justify-center mb-6 space-x-6">
              {['All', 'Pending', 'Onhold', 'Resolved'].map((status) => (
                <label key={status} className="inline-flex items-center text-white cursor-pointer">
                  <input
                    type="radio"
                    name="statusFilter"
                    value={status}
                    checked={statusFilter === status}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  {status}
                </label>
              ))}
            </div>
            
            <div className="h-[calc(100vh-280px)] overflow-y-auto px-2 scrollbar-none hover:scrollbar-thin scrollbar-thumb-blue-400/30 hover:scrollbar-thumb-blue-400/50 scrollbar-track-transparent transition-all duration-300">
              <div className="flex flex-col space-y-3">
                {filteredComplaints.map((complaint, index) => (
                  <div key={index} className="flex items-center bg-[#010009] rounded-lg p-2 border border-blue-400">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg text-white">{complaint.batteryName}</h3>
                      <p className="text-sm text-gray-400">Date: {complaint.date}</p>
                      <p className="text-sm text-gray-400">Level: {complaint.level}</p>
                      <p className="text-sm text-gray-400">Description: {complaint.description}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">Status: {complaint.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-4 bg-[#1a1a1a] rounded-lg shadow-md p-4 border-2 border-blue-400">
            <h2 className="text-lg font-semibold mb-3 text-white">Log a Complaint</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white">Battery Name</label>
                <input
                  type="text"
                  name="batteryName"
                  value={formData.batteryName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md bg-[#1a1a1a] text-white border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-white">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  className="w-full p-2 border rounded-md bg-[#1a1a1a] text-white border-blue-400"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-white">Level</label>
                <div className="flex items-center space-x-4">
                  <label className="text-white">
                    <input
                      type="radio"
                      name="level"
                      value="Urgent"
                      checked={formData.level === 'Urgent'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Urgent
                  </label>
                  <label className="text-white">
                    <input
                      type="radio"
                      name="level"
                      value="Normal"
                      checked={formData.level === 'Normal'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Normal
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-white">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md bg-[#1a1a1a] text-white border-blue-400"
                  required
                />
              </div>
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
                Lodge Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaint;