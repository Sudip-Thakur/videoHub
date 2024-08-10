import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SmallCard from '../components/SmallCard.jsx';
import { BASE_URL } from '../constants.js';
import { format } from 'timeago.js';

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/watchHistory`, {
          withCredentials: true,
        });
        setWatchHistory(response.data.data); // Adjust if the API response structure differs
      } catch (error) {
        console.error('Error fetching watch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, []);

  if (loading) {
    return <div className="h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }
  console.log(watchHistory)
  return (
    <div className="h-screen bg-gray-100 overflow-y-auto">
      {/* Fixed Title */}
      <div className="sticky top-0 bg-blue-600 text-white p-2 shadow-md z-10">
        <h1 className="text-xl font-bold">Watch History</h1>
      </div>
      
      {/* Cards */}
      <div className="flex flex-wrap justify-center items-start pt-2">
        {watchHistory.length > 0 ? (
          watchHistory.map((item, index) => (
            <SmallCard 
              key={index} // Ensure your watch history items have a unique 'id'
              videoId={item.videoid} // Adjust based on the actual data structure
              title={item.videotitle}
              views={item.videoviews}
              timestamp={format(item.watchedat)}
              channelId={item.channelid}
              channelName={item.channelname}
              avatar={item.channelavatar}
              thumbnail={item.videothumbnail}
            />
          ))
        ) : (
          <div className="text-center mt-4">No watch history available.</div>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;
