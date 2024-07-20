//for myChannel
import React from 'react';
import { Link } from 'react-router-dom';

const MyCard = () => {
  const videoId = '1'; // Replace with dynamic video ID if needed
  const title = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere exercitationem, ut provident ipsa ducimus enim vero, laudantium nihil labore veritatis distinctio officia dolor expedita quo, cupiditate suscipit deleniti neque facilis?';
  const thumbnail = 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279810/wdbgmoglkexii55vgjml.jpg'; // Update with correct path if necessary
  const views = "1.2M views";
  const timestamp = "2 days ago";

  const handleTogglePublicPrivate = () => {
    // Implement the logic to toggle public/private status here
    console.log(`Toggled public/private status for video ID: ${videoId}`);
  };

  const handleDelete = () => {
    // Implement the logic to delete the video here
    console.log(`Deleted video ID: ${videoId}`);
  };

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
        <div className="text-xs text-gray-600">{views} • {timestamp}</div>
        {/* Buttons */}
        <div className="flex space-x-2 mt-2">
          <button
            onClick={handleTogglePublicPrivate}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Public/Private
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
