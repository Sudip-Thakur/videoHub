import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoPreview = ({ videoId, channelId, title, avatar, thumbnail, channelName, views, timestamp }) => {
  const navigate = useNavigate();

  const handleNavigateVideo = () => {
    navigate(`/video/${videoId}`);
  };

  const handleNavigateChannel = () => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="w-full h-36 flex rounded-lg overflow-hidden shadow-lg m-2 p-2 bg-white">
      {/* Thumbnail */}
      <div className="w-1/3 h-full flex-shrink-0 overflow-hidden rounded-lg group cursor-pointer" onClick={handleNavigateVideo}>
        <img
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={thumbnail}
          alt="Thumbnail"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col justify-between p-2 flex-grow">
        {/* Title */}
        <p
          className="text-sm mb-1 text-gray-900 leading-tight font-semibold hover:underline cursor-pointer truncate"
          onClick={handleNavigateVideo}
          title={title} // Tooltip on hover
        >
          {title}
        </p>
        {/* Channel Info */}
        <div className="flex flex-col text-xs">
          <p
            className="text-gray-600 cursor-pointer transition-all duration-300 hover:text-blue-600 hover:underline truncate"
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

export default VideoPreview;
