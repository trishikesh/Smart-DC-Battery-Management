import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BatteryCardMini = () => {
  const { userId } = useParams();
  const [batteries, setBatteries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const statuses = ['Optimal', 'Critical', 'Normal'];

  // Clean and deduplicate battery data
  const cleanBatteryData = (data) => {
    // Remove any entries that have null/undefined values in ANY field
    const nonNullData = data.filter(battery => {
      return battery && 
        // Check if ALL fields have non-null values
        Object.values(battery).every(val => val !== null && val !== undefined);
    });

    // Remove duplicates based on _id
    const uniqueData = Array.from(new Map(
      nonNullData.map(item => [item._id, item])
    ).values());

    return uniqueData;
  };

  useEffect(() => {
    const fetchBatteries = async () => {
      try {
        // Construct URL with query parameter
        const url = new URL('https://backend-battery-management.onrender.com/fetch-battery');
        url.searchParams.append('userId', userId || 'default-user-id');

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId: userId || 'default-user-id'
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch batteries');
        }

        const rawData = await response.json();
        
        // Clean and process the data
        const cleanedData = cleanBatteryData(rawData);
        console.log('Cleaned and Deduplicated Data:', cleanedData);
        setBatteries(cleanedData);
        setIsLoading(false);
        
      } catch (error) {
        console.error('Error fetching batteries:', error);
        setIsLoading(false);
      }
    };

    fetchBatteries();
  }, []); // Empty dependency array ensures it only runs once when mounted

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400">Your data is loading...</p>
      </div>
    );
  }

  return (
    <div>
      {batteries.length > 0 ? (
        batteries.map((battery) => (
          <div
            key={battery._id}
            className="flex items-center bg-[#010009] rounded-lg p-3 border border-blue-400/50 hover:border-blue-400 transition-all duration-300 transform hover:scale-[1.01] hover:translate-x-0"
          >
            <div className="flex-1">
              <h3 className="font-medium text-lg text-white">{battery.batteryName}</h3>
              <p className="text-sm text-gray-400">Type: {battery.batteryType}</p>
              <p className="text-sm text-gray-400">Activation Date: {battery.activationDate}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-300">Status: {battery.status}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No valid batteries found.</p>
      )}
    </div>
  );
};

export default BatteryCardMini;
