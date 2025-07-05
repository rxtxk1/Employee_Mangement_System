import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-lg hover:shadow-2xl rounded-2xl border border-gray-200 flex items-center transition transform hover:scale-[1.02] duration-300 p-4 min-h-[100px]">
      <div className={`text-white ${color} rounded-full p-4 text-3xl shadow-md`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-600 font-medium">{text}</p>
        <p className="text-3xl font-extrabold text-gray-800 mt-1">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
