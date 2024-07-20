import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoPreview = () => {
  const navigate = useNavigate();
  const videoId = '1'; // Replace with dynamic video ID if needed
  const channelId = '2'; // Replace with dynamic channel ID if needed
  const title = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere exercitationem, ut provident ipsa ducimus enim vero, laudantium nihil labore veritatis distinctio officia dolor expedita quo, cupiditate suscipit deleniti neque facilis?';
  const thumbnail = 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279810/wdbgmoglkexii55vgjml.jpg'; // Update with correct path if necessary
  const channelName = "Channel Name";
  const views = "1.2M views";
  const timestamp = "2 days ago";

  const handleNavigateVideo = () => {
    navigate(`/video/${videoId}`);
  };

  const handleNavigateChannel = () => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="w-full h-36 flex rounded-lg overflow-hidden shadow-lg m-2 p-2 bg-white">
      {/* Thumbnail */}
      <div className="w-1/3 h-24 flex-shrink-0 overflow-hidden rounded-lg group cursor-pointer" onClick={handleNavigateVideo}>
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
          className="text-sm mb-2 text-gray-900 leading-tight font-semibold hover:underline cursor-pointer truncate"
          onClick={handleNavigateVideo}
          title={title} // Tooltip on hover
        >
          {title}
        </p>
        {/* Channel Info */}
        <div className="flex flex-col text-xs">
          <p
            className="text-gray-600 cursor-pointer transition-all duration-300 hover:text-blue-600 hover:underline"
            onClick={handleNavigateChannel}
          >
            {channelName}
          </p>
          <p className="text-gray-600">{views} • {timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
