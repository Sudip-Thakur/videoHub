import React from 'react';
import { Link } from 'react-router-dom';

const SearchCard = ({ videoId, channelId, title, avatar, thumbnail, channelName, views, timestamp }) => {

  if (!avatar) {
    avatar = 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721150292/tygudzkjyupxdyixsypo.png';
  }

  return (
    <div className="w-full max-w-full flex rounded-lg overflow-hidden shadow-lg mb-8 bg-white">
      {/* Thumbnail Section */}
      <Link to={`/video/${videoId}`} className="flex-shrink-0 w-60 h-36 overflow-hidden rounded-lg relative">
        <img
          className="w-full h-full p-2 object-cover rounded-lg transition-transform duration-300 ease-in-out"
          src={thumbnail}
          alt="Card image cap"
          style={{ height: '144px' }} // Fixed height for thumbnail
        />
      </Link>

      {/* Content Section */}
      <div className="flex flex-col p-4 flex-grow">
        <Link to={`/video/${videoId}`} className="text-lg mb-2 text-gray-900 leading-tight font-semibold hover:underline">
          {title}
        </Link>
        <div className="flex items-center mb-2">
          <Link to={`/channel/${channelId}`}>
            <img
              className="w-16 h-16 rounded-full mr-4 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              src={avatar}
              alt="Channel avatar"
              style={{ width: '64px', height: '64px' }} // Fixed size for avatar
            />
          </Link>
          <div className="text-sm">
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

export default SearchCard;
