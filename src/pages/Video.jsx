import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer.jsx'; // Adjust the import path as needed
import VideoPreview from '../components/VideoPreview.jsx'; // Adjust the import path as needed
import CommentsSection from '../components/CommentsSection.jsx'; // Adjust the import path as needed
import { BASE_URL } from '../constants.js';
import { format } from 'timeago.js';

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

    // Uncomment the following lines to fetch related videos
    // const fetchRelatedVideos = async () => {
    //   try {
    //     const response = await axios.get(`${BASE_URL}/api/v1/videos/random/video`, {
    //       withCredentials: true,
    //     });
    //     setRelatedVideos(response.data.data);
    //   } catch (error) {
    //     console.error('Error fetching related videos:', error);
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
            videoUrl={videoData.video} // Adjust this if your API response structure is different
            videoTitle={videoData.title}
            videoDescription={videoData.description}
            videoViews={videoData.view_count}
            videoTimestamp={format(videoData.time)}
            channelId={videoData.channel_id}
            channelName={videoData.channel_name}
            channelAvatar={videoData.avatar}
            channelSubscribers={videoData.sub_count}
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
    </div>
  );
};

export default Video;
