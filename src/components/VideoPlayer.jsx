import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants.js';

const VideoPlayer = ({
  videoUrl,
  videoId,
  videoTitle,
  videoDescription,
  videoViews,
  videoTimestamp,
  channelId,
  channelName,
  channelAvatar,
  channelSubscribers,
  liked,
  likeCount,
  subscribed
}) => {
  // Initialize state with individual useState hooks
  const [isLiked, setIsLiked] = useState(liked || false);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount || 0);
  const [isSubscribed, setIsSubscribed] = useState(subscribed || false);
  const [subCount, setSubCount] = useState(channelSubscribers || 0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // Only update state if the incoming props are defined
    if (liked !== undefined) setIsLiked(liked);
    if (likeCount !== undefined) setCurrentLikeCount(likeCount);
    if (subscribed !== undefined) setIsSubscribed(subscribed);
    if (channelSubscribers !== undefined) setSubCount(channelSubscribers);
  }, [liked, likeCount, subscribed, channelSubscribers]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/likes/${videoId}`, {}, {
        withCredentials: true,
      });
      const newLikeStatus = response.data.data.liked;
      setIsLiked(newLikeStatus);
      setCurrentLikeCount(prevCount => newLikeStatus ? prevCount + 1 : prevCount - 1);
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/subscriptions/channel/${channelId}`, {}, {
        withCredentials: true
      });
      const newSubscriptionStatus = response.data.data.subscribed;
      setIsSubscribed(newSubscriptionStatus);
      setSubCount(prevCount => newSubscriptionStatus ? prevCount + 1 : prevCount - 1);
    } catch (error) {
      console.error('Error subscribing to channel:', error);
    }
  };

  const handleDescriptionToggle = () => {
    setShowFullDescription(prev => !prev);
  };

  // Ensure that all required data is available before rendering
  if (!videoUrl || !videoTitle || !videoViews || !channelId || !channelName || !channelAvatar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
      <div className="relative pb-9/16">
        <video
          className="w-full h-auto rounded-lg"
          controls
          onError={(e) => console.error('Error loading video:', e)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">{videoTitle}</h2>
        <p className="text-gray-600">{videoViews} views • {currentLikeCount} likes • {videoTimestamp}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <Link to={`/channel/${channelId}`}>
            <img
              className="w-12 h-12 rounded-full mr-3"
              src={channelAvatar}
              alt="Channel avatar"
            />
          </Link>
          <div>
            <Link to={`/channel/${channelId}`}>
              <p className="text-lg font-semibold">{channelName}</p>
            </Link>
            <p className="text-gray-600">{subCount} subscribers</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className={`py-1 px-4 rounded text-white ${isSubscribed ? 'bg-red-600' : 'bg-blue-600'} transition-all duration-300`}
            onClick={handleSubscribe}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
          <button
            className={`py-1 px-4 rounded ${isLiked ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'} transition-all duration-300`}
            onClick={handleLike}
          >
            {isLiked ? 'Liked' : 'Like'}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className={`text-gray-800 ${showFullDescription ? '' : 'truncate'} overflow-hidden`}>
          {videoDescription}
        </p>
        {videoDescription && !showFullDescription && (
          <button
            className="text-blue-600 mt-2"
            onClick={handleDescriptionToggle}
          >
            More
          </button>
        )}
        {showFullDescription && (
          <button
            className="text-blue-600 mt-2"
            onClick={handleDescriptionToggle}
          >
            Less
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
