import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card.jsx';
import { format } from 'timeago.js';
import { BASE_URL } from '../constants.js';

const Channel = () => {
  const { channelId } = useParams();
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    const getChannelData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/users/get/${channelId}`, {
          withCredentials: true
        });
        const fetchedData = response.data.data[0];
        setData(fetchedData);
        setIsSubscribed(fetchedData.isSubscribed);
        setSubscriberCount(fetchedData.countSubscribers);
      } catch (error) {
        console.error('Error fetching channel data:', error);
      } finally {
        setLoading(false);
      }
    };

    getChannelData();
  }, [channelId]);

  useEffect(() => {
    setLoading(true);
    const getVideos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/videos/channel/${channelId}`, {
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
  }, [channelId]);

  const coverImage = data.coverimage || 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/800px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg';
  const avatar = data.avatar || 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721150292/tygudzkjyupxdyixsypo.png';
  const fullname = data.fullname;
  const bio = data.bio;

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/subscriptions/channel/${channelId}`, {}, {
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
    <div className="flex flex-col items-center bg-gray-100">
      {/* Channel Cover Image */}
      <div className="w-full h-40 bg-gray-300 relative overflow-hidden -mb-16">
        <img
          className="w-full h-full object-cover"
          src={coverImage}
          alt="Channel cover"
        />
        {/* Channel Avatar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
          <img
            className="w-32 h-32 rounded-full border-4 border-white"
            src={avatar}
            alt="Channel avatar"
          />
        </div>
      </div>

      {/* Channel Info */}
      <div className="text-center mt-24 px-4">
        <h1 className="text-2xl font-bold text-gray-900">{fullname}</h1>
        <p className="text-gray-600 mt-2">{bio}</p>
        <p className="text-gray-500 mt-2">{subscriberCount} subscribers</p>
        <button
          onClick={handleSubscribe}
          className={`mt-4 py-2 px-6 rounded-full text-white ${isSubscribed ? 'bg-gray-500' : 'bg-red-500'}`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      {/* Channel Videos */}
      <div className="flex flex-wrap justify-center items-start mt-8 px-4">
        {videos.map((video, index) => (
          <Card
            key={video.id}
            videoId={video.id}
            channelId={video.owner}
            title={video.title}
            avatar={video.avatar || 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721150292/tygudzkjyupxdyixsypo.png'}
            thumbnail={video.thumbnail}
            channelName={video.fullname}
            views={video.views}
            timestamp={format(video.createdat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Channel;
