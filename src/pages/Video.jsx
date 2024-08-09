// import React from 'react';
// import VideoPlayer from '../components/VideoPlayer.jsx'; // Adjust the import path as needed
// import VideoPreview from '../components/VideoPreview.jsx'; // Adjust the import path as needed
// import CommentsSection from '../components/CommentsSection.jsx'; // Adjust the import path as needed

// const Video = () => {
//   return (
//     <div className="flex w-full h-screen bg-white">
//       {/* Video Player on the left */}
//       <div className="w-3/4 h-full p-4 flex flex-col">
//         <div className="flex-grow bg-white">
//           <VideoPlayer />
//         </div>

//         {/* Comments Section below VideoPlayer */}
//         <div className="w-full mt-4 bg-white p-4 border-t border-gray-200">
//           <CommentsSection />
//         </div>
//       </div>

//       {/* Related Videos on the right */}
//       <div className="w-1/4 h-full p-4 bg-white overflow-y-auto border-l border-gray-200">
//         <h2 className="text-xl font-bold mb-4">Related Videos</h2>
//         <div className="flex flex-col space-y-4">
//           <VideoPreview
//             thumbnail="http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/sample_thumbnail1.jpg"
//             videoId="1"
//             title="Sample Video 1"
//           />
//           <VideoPreview
//             thumbnail="http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/sample_thumbnail2.jpg"
//             videoId="2"
//             title="Sample Video 2"
//           />
//           {/* Add more VideoPreview components as needed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer.jsx'; // Adjust the import path as needed
import VideoPreview from '../components/VideoPreview.jsx'; // Adjust the import path as needed
import CommentsSection from '../components/CommentsSection.jsx'; // Adjust the import path as needed
import { BASE_URL } from '../constants.js';

const Video = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/videos/${videoId}`, {
          withCredentials: true,
        });
        setVideoData(response.data.data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setLoading(false);
      }
    };

    // const fetchRelatedVideos = async () => {
    //   try {
    //     //TODO call recommendation api if logged in
    //     const response = await axios.get(`${BASE_URL}/api/v1/videos/random/video`, {
    //       withCredentials: true,
    //     });
    //     console.log('API Response:', response.data); // Check the entire response
    //     console.log('Fetched Videos:', response.data.data); // Check the videos data
    //     setRelatedVideos(response.data.data); // Update the videos state
    //   } catch (error) {
    //     console.error('Error fetching videos:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchVideoData();
    // fetchRelatedVideos();
  }, [videoId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/likes/video/${videoId}`, {}, {
        withCredentials: true,
      });
      setVideoData(prevState => ({
        ...prevState,
        liked: response.data.data.liked,
        like_count: response.data.data.liked ? prevState.like_count + 1 : prevState.like_count - 1
      }));
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/subscriptions/channel/${videoData.channel_id}`, {}, {
        withCredentials: true
      });
      setVideoData(prevState => ({
        ...prevState,
        subscribed: response.data.data.subscribed,
        sub_count: response.data.data.subscribed ? prevState.sub_count + 1 : prevState.sub_count - 1
      }));
    } catch (error) {
      console.error('Error subscribing to channel:', error);
    }
  };

  console.log(videoData)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Video Player on the left */}
      <div className="w-3/4 h-full p-4 flex flex-col">
        <div className="flex-grow bg-white">
          <VideoPlayer
            videoUrl={videoData.video_url} // Adjust this if your API response structure is different
            title={videoData.title}
          />
        </div>

        {/* Comments Section below VideoPlayer */}
        <div className="w-full mt-4 bg-white p-4 border-t border-gray-200">
          <CommentsSection videoId={videoId} />
        </div>
      </div>

      {/* Related Videos on the right */}
      <div className="w-1/4 h-full p-4 bg-white overflow-y-auto border-l border-gray-200">
        <h2 className="text-xl font-bold mb-4">Related Videos</h2>
        <div className="flex flex-col space-y-4">
          {relatedVideos.map((video) => (
            <VideoPreview
              key={video.id}
              thumbnail={video.thumbnail}
              videoId={video.id}
              title={video.title}
            />
          ))}
        </div>
      </div>

      {/* Video Details */}
      <div className="w-full p-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-gray-900">{videoData.title}</div>
          <div className="flex items-center">
            <button
              onClick={handleLike}
              className={`py-2 px-4 rounded-full text-white ${videoData.liked ? 'bg-gray-500' : 'bg-red-500'} transition-all duration-300`}
            >
              {videoData.liked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <p className="text-gray-600 mr-2">{videoData.view_count} views</p>
          <span className="text-gray-600 mx-2">•</span>
          <p className="text-gray-600">{videoData.sub_count} subscribers</p>
        </div>
        <button
          onClick={handleSubscribe}
          className={`py-2 px-6 rounded-full text-white ${videoData.subscribed ? 'bg-gray-500' : 'bg-red-500'} transition-all duration-300`}
        >
          {videoData.subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default Video;
