import React from 'react'
import SmallCard from '../components/SmallCard.jsx';

function WatchHistory() {
  const numberOfSearchCards = 24; // Adjust the number as needed

  return (
    <div className="h-screen bg-gray-100 overflow-y-auto">
      {/* Fixed Title */}
      <div className="sticky top-0 bg-blue-600 text-white p-2 shadow-md z-10">
        <h1 className="text-xl font-bold">Watch History</h1>
      </div>
      
      {/* Cards */}
      <div className="flex flex-wrap justify-center items-start pt-2"> {/* Minimal padding-top */}
        {[...Array(numberOfSearchCards)].map((_, index) => (
          <SmallCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default WatchHistory