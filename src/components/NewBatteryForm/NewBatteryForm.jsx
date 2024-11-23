import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NewBattery = ({ onClose }) => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    batteryName: '',
    batteryType: '',
    manufacturer: '',
    activationDate: '',
    expectedEndDate: '',
  });

  useEffect(() => {
    // Set activation date to current date in dd/mm/yyyy format
    const currentDate = new Date();
    const activationDate = currentDate.toLocaleDateString('en-GB'); // Format: dd/mm/yyyy

    // Calculate expected end date (2 months ahead)
    const endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 2));
    const expectedEndDate = endDate.toLocaleDateString('en-GB'); // Format: dd/mm/yyyy

    setFormData((prev) => ({
      ...prev,
      activationDate,
      expectedEndDate,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      userId,
      batteryName: formData.batteryName,
      batteryType: formData.batteryType,
      manufacturer: formData.manufacturer,
      activationDate: formData.activationDate,
      expectedEndDate: formData.expectedEndDate
    };

    try {
      const response = await fetch('https://backend-battery-management.onrender.com/set-battery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to add battery');
      }

      const data = await response.json();
      console.log('Battery added successfully:', data);
      onClose();
    } catch (error) {
      console.error('Error adding battery:', error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center" onClick={handleBackdropClick}>
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] p-8 rounded-lg border-2 border-blue-400 w-[500px] transform transition-all duration-300 scale-100 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-400 hover:text-blue-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Battery Name */}
        <div className="mb-6">
          <label
            htmlFor="batteryName"
            className="block text-white font-medium mb-2"
          >
            Battery Name
          </label>
          <input
            type="text"
            id="batteryName"
            name="batteryName"
            value={formData.batteryName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-[#010009] text-white border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Battery Type */}
        <div className="mb-6">
          <label
            htmlFor="batteryType"
            className="block text-white font-medium mb-2"
          >
            Battery Type
          </label>
          <input
            type="text"
            id="batteryType"
            name="batteryType"
            value={formData.batteryType}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-[#010009] text-white border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Manufacturer */}
        <div className="mb-6">
          <label
            htmlFor="manufacturer"
            className="block text-white font-medium mb-2"
          >
            Manufacturer
          </label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-[#010009] text-white border border-blue-400 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Activation Date */}
        <div className="mb-6">
          <label
            htmlFor="activationDate"
            className="block text-white font-medium mb-2"
          >
            Activation Date
          </label>
          <input
            type="text"
            id="activationDate"
            name="activationDate"
            value={formData.activationDate}
            readOnly
            className="w-full px-4 py-2 bg-[#010009] text-gray-400 border border-blue-400 rounded-md cursor-not-allowed"
          />
        </div>

        {/* Expected End Date */}
        <div className="mb-8">
          <label
            htmlFor="expectedEndDate"
            className="block text-white font-medium mb-2"
          >
            Expected End Date
          </label>
          <input
            type="text"
            id="expectedEndDate"
            name="expectedEndDate"
            value={formData.expectedEndDate}
            readOnly
            className="w-full px-4 py-2 bg-[#010009] text-gray-400 border border-blue-400 rounded-md cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-all duration-300"
        >
          Add Battery
        </button>
      </form>
    </div>
  );
};

export default NewBattery;
