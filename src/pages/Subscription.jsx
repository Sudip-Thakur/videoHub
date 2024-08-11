import axios from 'axios';
import React, {useEffect, useState} from 'react';
import ChannelCard from '../components/ChannelCard'; // Ensure the import path is correct
import { BASE_URL } from '../constants';

function Subscription() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getChannels = async () => {
      try {
        //TODO call recommendation api if logged in
        const response = await axios.get(`${BASE_URL}/api/v1/subscriptions/channels`, {
          withCredentials: true,
        });

        setChannels(response.data.data); // Update the videos state
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    getChannels();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen"> {/* Removed fixed height */}
      {/* Fixed Title */}
      <div className="sticky top-0 bg-blue-600 text-white p-2 shadow-md z-10">
        <h1 className="text-xl font-bold">Subscribed Channels</h1>
      </div>
      
      {/* Cards */}
      <div className="flex flex-wrap justify-center items-start p-2"> {/* Minimal padding-top */}
        {channels.map((channel, index) => (
          <ChannelCard
            channelId ={channel.channelid}
            avatar={channel.avatar || 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721150292/tygudzkjyupxdyixsypo.png'}
            name={channel.fullname}
            bio={channel.bio}
            subscriberCount={channel.subscribercount}
            subscribed={channel.issubscribed}
            videoCount={channel.videocount}
          />
        ))}
      </div>
    </div>
  );
}

export default Subscription;
