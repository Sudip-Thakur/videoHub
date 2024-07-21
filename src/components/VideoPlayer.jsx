// import React, { useState } from 'react';

// const VideoPlayer = () => {
//   const [subscribed, setSubscribed] = useState(false);

//   const videoUrl = 'http://res.cloudinary.com/dvla5jcq0/video/upload/v1721279750/p3slxuwh5ycwfqetfyjl.mp4'; // Replace with your video URL
//   const videoTitle = 'Sample Video Title';
//   const videoDescription = 'This is a sample video description.';
//   const videoViews = '1.2M views';
//   const videoTimestamp = '2 days ago';
//   const channelId = '2'; // Replace with dynamic channel ID if needed
//   const channelName = "Channel Name";
//   const channelAvatar = 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/esrwtg8kjanliwo8q7xh.jpg'; // Update with correct path if necessary
//   const channelSubscribers = '500K subscribers'; // Replace with dynamic subscriber count if needed

//   const handleSubscribeToggle = () => {
//     setSubscribed(!subscribed);
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
//       <div className="relative pb-9/16">
//         <video
//           className="w-full h-auto rounded-lg"
//           controls
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//       <div className="mt-4">
//         <h2 className="text-xl font-bold">{videoTitle}</h2>
//         <p className="text-gray-600">{videoViews} • {videoTimestamp}</p>
//       </div>
//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center">
//           <img
//             className="w-12 h-12 rounded-full mr-3"
//             src={channelAvatar}
//             alt="Channel avatar"
//           />
//           <div>
//             <p className="text-lg font-semibold">{channelName}</p>
//             <p className="text-gray-600">{channelSubscribers}</p>
//           </div>
//         </div>
//         <button
//           className={`py-1 px-4 rounded text-white ${subscribed ? 'bg-red-600' : 'bg-blue-600'} transition-all duration-300`}
//           onClick={handleSubscribeToggle}
//         >
//           {subscribed ? 'Unsubscribe' : 'Subscribe'}
//         </button>
//       </div>
//       <div className="mt-4">
//         <p className="text-gray-800">{videoDescription}</p>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CommentsSection from './CommentsSection.jsx'; // Adjust the import path as needed

const VideoPlayer = () => {
  const [subscribed, setSubscribed] = useState(false);

  const videoUrl = 'http://res.cloudinary.com/dvla5jcq0/video/upload/v1721279750/p3slxuwh5ycwfqetfyjl.mp4'; // Replace with your video URL
  const videoTitle = 'Sample Video Title';
  const videoDescription = 'This is a sample video description.';
  const videoViews = '1.2M views';
  const videoTimestamp = '2 days ago';
  const channelId = '2'; // Replace with dynamic channel ID if needed
  const channelName = "Channel Name";
  const channelAvatar = 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/esrwtg8kjanliwo8q7xh.jpg'; // Update with correct path if necessary
  const channelSubscribers = '500K subscribers'; // Replace with dynamic subscriber count if needed

  const handleSubscribeToggle = () => {
    setSubscribed(!subscribed);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
      <div className="relative pb-9/16">
        <video
          className="w-full h-auto rounded-lg"
          controls
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{videoTitle}</h2>
          <div className="flex items-center space-x-4">
            <ThumbUpIcon className="text-gray-600 cursor-pointer" />
            <ShareIcon className="text-gray-600 cursor-pointer" />
            <PlaylistAddIcon className="text-gray-600 cursor-pointer" />
          </div>
        </div>
        <p className="text-gray-600">{videoViews} • {videoTimestamp}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full mr-3"
            src={channelAvatar}
            alt="Channel avatar"
          />
          <div>
            <p className="text-lg font-semibold">{channelName}</p>
            <p className="text-gray-600">{channelSubscribers}</p>
          </div>
        </div>
        <button
          className={`py-1 px-4 rounded text-white ${subscribed ? 'bg-red-600' : 'bg-blue-600'} transition-all duration-300`}
          onClick={handleSubscribeToggle}
        >
          {subscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </div>
      <div className="mt-4">
        <p className="text-gray-800">{videoDescription}</p>
      </div>
      <hr className="my-4" />
      <CommentsSection />
    </div>
  );
};

export default VideoPlayer;

