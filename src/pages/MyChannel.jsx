import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MyCard from '../components/MyCard.jsx';

const Channel = () => {
  const { channelId } = useParams();
  
  // Placeholder data, replace with actual data fetch
  const [channelData, setChannelData] = useState({
    coverImage: 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279810/wdbgmoglkexii55vgjml.jpg', // Update with correct path
    avatar: 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/esrwtg8kjanliwo8q7xh.jpg', // Update with correct path
    name: 'Channel Name',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    subscriberCount: '1.2M subscribers',
    isSubscribed: false, // Change based on actual subscription status
  });

  const handleSubscribe = () => {
    // Toggle subscription status
    setChannelData(prevState => ({
      ...prevState,
      isSubscribed: !prevState.isSubscribed
    }));

    // Additional actions can be added here, like API calls
    // Example:
    // if (!channelData.isSubscribed) {
    //   // Send subscribe request
    // } else {
    //   // Send unsubscribe request
    // }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100">
      {/* Channel Cover Image */}
      <div className="w-full h-40 bg-gray-300 relative overflow-hidden -mb-16">
        <img
          className="w-full h-full object-cover"
          src={channelData.coverImage}
          alt="Channel cover"
        />
        {/* Channel Avatar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
          <img
            className="w-32 h-32 rounded-full border-4 border-white"
            src={channelData.avatar}
            alt="Channel avatar"
          />
        </div>
      </div>

      {/* Channel Info */}
      <div className="text-center mt-24 px-4">
        <h1 className="text-2xl font-bold text-gray-900">{channelData.name}</h1>
        <p className="text-gray-600 mt-2">{channelData.bio}</p>
        <p className="text-gray-500 mt-2">{channelData.subscriberCount}</p>
        <button
          onClick={handleSubscribe}
          className={`mt-4 py-2 px-6 rounded-full text-white ${channelData.isSubscribed ? 'bg-gray-500' : 'bg-red-500'}`}
        >
          {channelData.isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      {/* Channel Videos */}
      <div className="flex flex-wrap justify-center items-start mt-8 px-4">
        {[...Array(24)].map((_, index) => (
          <MyCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Channel;
