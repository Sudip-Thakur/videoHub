import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SmallCard from '../components/SmallCard.jsx'; // Ensure the import path is correct
import { format } from 'timeago.js';

function Liked() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getVideos = async () => {
      try {
        //TODO call recommendation api if logged in
        const response = await axios.get('http://localhost:8000/api/v1/likes/likedVideo', {
          withCredentials: true,
        });
        console.log('API Response:', response.data); // Check the entire response
        console.log('Fetched Videos:', response.data.data); // Check the videos data
        setVideos(response.data.data); // Update the videos state
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen"> {/* Removed fixed height */}
      {/* Fixed Title */}
      <div className="sticky top-0 bg-blue-600 text-white p-2 shadow-md z-10">
        <h1 className="text-xl font-bold">Liked Videos</h1>
      </div>
      
      {/* Cards */}
      <div className="flex flex-wrap justify-center items-start pt-2"> {/* Minimal padding-top */}
        {videos.map((video, index) => (
          <SmallCard
            key={index} // Added key prop
            videoId={video.id}
            channelId={video.owner}
            title={video.title}
            avatar={video.avatar}
            thumbnail={video.thumbnail}
            channelName={video.fullname}
            views={video.views}
            timestamp={format(video.createdat)}
          />
        ))}
      </div>
    </div>
  );
}

export default Liked;
