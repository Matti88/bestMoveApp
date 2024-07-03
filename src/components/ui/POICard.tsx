'use client';
import React from 'react';

interface POICardProps {
  address: string;
  modeOfTransportation: string;
  timeRange: number;
  title: string;
  onDelete: () => void; // Callback function for delete action
}

const POICard: React.FC<POICardProps> = ({ address, modeOfTransportation, timeRange, title, onDelete }) => {

  return (
    <div className={`bg-white rounded shadow p-4 mb-4 bg-gray-800 text-black`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold ">{title}</h3>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <p className="text-gray-600 mb-2">{address}</p>
      <p className="text-gray-600 mb-2">Mode of Transportation: {modeOfTransportation}</p>
      <p className="text-gray-600 mb-2">Time Range: {timeRange}</p>
    </div>
  );
};

export default POICard;
