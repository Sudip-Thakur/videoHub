import React from 'react';
import { Link } from 'react-router-dom';

const SmallCard = ({ videoId, channelId, title, avatar, thumbnail, channelName, views, timestamp }) => {
  if (!avatar) {
    avatar = 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721150292/tygudzkjyupxdyixsypo.png';
  }

  return (
    <div className="w-full h-36 flex rounded-lg overflow-hidden shadow-lg m-2 p-2 bg-white">
      {/* Thumbnail */}
      <Link to={`/video/${videoId}`} className="w-1/5 h-full flex-shrink-0 overflow-hidden rounded-lg group"> {/* Adjusted width */}
        <img
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={thumbnail}
          alt="Thumbnail"
        />
      </Link>
      {/* Content */}
      <div className="flex flex-col justify-between p-2 flex-grow">
        {/* Title */}
        <Link to={`/video/${videoId}`} className="text-sm mb-1 text-gray-900 leading-tight font-semibold hover:underline">
          {title}
        </Link>
        {/* Channel Info */}
        <div className="flex items-center">
          <Link to={`/channel/${channelId}`}>
            <img className="w-14 h-14 rounded-full mr-3 cursor-pointer transform transition-transform duration-300 hover:scale-105" src={avatar} alt="Channel avatar" />
          </Link>
          <div className="text-xs">
            <Link to={`/channel/${channelId}`} className="text-gray-600 cursor-pointer transition-all duration-300 hover:text-blue-600 hover:underline">
              {channelName}
            </Link>
            <p className="text-gray-600">{views} views • {timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
