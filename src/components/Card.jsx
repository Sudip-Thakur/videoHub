import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ videoId, channelId, title, avatar, thumbnail, channelName, views, timestamp }) => {
  const navigate = useNavigate();

  if (!avatar) {
    avatar = 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721150292/tygudzkjyupxdyixsypo.png';
  }

  const handleNavigateVideo = () => {
    navigate(`/video/${videoId}`);
  };

  const handleNavigateChannel = () => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="w-80 h-auto rounded-lg overflow-hidden shadow-lg m-4 bg-white relative flex flex-col">
      <div className="w-full h-52 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-t-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
          src={thumbnail}
          alt="Card image cap"
          onClick={handleNavigateVideo}
        />
      </div>
      <div className="px-4 py-3 flex items-center flex-grow">
        <img
          className="w-16 h-16 rounded-full mr-3 cursor-pointer transform transition-transform duration-300 hover:scale-105"
          src={avatar}
          alt="Channel avatar"
          onClick={handleNavigateChannel}
          style={{ borderRadius: '50%' }} // Ensure circular shape
        />
        <div className="text-sm flex flex-col justify-between flex-grow">
          <div className="relative">
            <p
              className="text-gray-900 leading-tight font-semibold truncate cursor-pointer transition-all duration-300 hover:text-blue-600 hover:underline"
              onClick={handleNavigateVideo}
              title={title} // Tooltip on hover
            >
              {title}
            </p>
          </div>
          <p
            className="text-gray-600 cursor-pointer transition-all duration-300 hover:text-blue-600 hover:underline"
            onClick={handleNavigateChannel}
          >
            {channelName}
          </p>
          <p className="text-gray-600">{views} views • {timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
