import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ChannelCard = ({ channelId, avatar, name, bio, subscriberCount, subscribed, videoCount }) => {
  const [isSubscribed, setIsSubscribed] = useState(subscribed);
  const [currentSubscriberCount, setSubscriberCount] = useState(subscriberCount);

  const handleToggleSubscribe = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/subscriptions/channel/${channelId}`, {}, {
        withCredentials: true
      });
      const updatedSubscriptionStatus = response.data.data.subscribed;
      setIsSubscribed(updatedSubscriptionStatus);
      setSubscriberCount(prevCount => updatedSubscriptionStatus ? prevCount + 1 : prevCount - 1);
    } catch (error) {
      console.error('Error subscribing to channel:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl flex items-start bg-white rounded-lg shadow-md overflow-hidden p-4 mb-4">
      {/* Avatar Image */}
      <NavLink to={`/channel/${channelId}`}>
        <img
          className="w-32 h-32 rounded-full object-cover mr-4 cursor-pointer"
          src={avatar}
          alt="Channel Avatar"
        />
      </NavLink>
      
      {/* Channel Info */}
      <div className="flex-grow">
        <NavLink to={`/channel/${channelId}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 cursor-pointer">{name}</h2>
        </NavLink>
        <div className="flex items-center mb-4">
          <p className="text-gray-600 mr-4">{currentSubscriberCount} subscribers</p>
          <span className="text-gray-600 mx-2">•</span> {/* Stylish dot */}
          <p className="text-gray-600">{videoCount} videos</p>
        </div>
        <p className="text-gray-600 mb-4">{bio}</p>
      </div>

      {/* Subscribe Button */}
      <div className="flex-shrink-0 flex items-center">
        <button
          className={`py-2 px-4 rounded-full text-white ${isSubscribed ? 'bg-gray-500' : 'bg-red-500'} transition-all duration-300`}
          onClick={handleToggleSubscribe}
        >
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default ChannelCard;
