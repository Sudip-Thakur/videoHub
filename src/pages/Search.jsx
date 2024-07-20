import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchCard from '../components/SearchCard.jsx';
import { useParams } from 'react-router-dom';
import { format } from 'timeago.js';

const Search = () => {
  const { keyword } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/videos/search/${keyword}`, {
          withCredentials: true // Corrected 'withCredentials'
        });
        setVideos(response.data.data); // Update the videos state
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getVideos();
  }, [keyword]);

  return (
    <div className='w-full max-w-full flex flex-col items-center bg-gray-100 overflow-y-auto p-2'>
      {videos.map((video) => (
        <SearchCard
          key={video.id}
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
  );
}

export default Search;
