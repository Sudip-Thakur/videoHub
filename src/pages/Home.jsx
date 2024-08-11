import axios from 'axios';
import { format } from 'timeago.js';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';
import { BASE_URL } from '../constants.js';

const Home = ({ isLoggedIn }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getVideos = async () => {
      try {
        //TODO call recommendation api if logged in
        const response = await axios.get(`${BASE_URL}/api/v1/videos/random/video`, {
          withCredentials: true,
        });
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
    <div className='bg-gray-100 min-h-screen'> {/* Removed fixed height */}
      <div className='flex flex-wrap justify-center items-start p-4'>
        {videos.map((video, index) => (
          <Card
            key={index}
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

export default Home;
