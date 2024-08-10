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
    let isMounted = true; // Track if the component is mounted

    const fetchVideoData = async () => {
      try {
        // Fetch video data
        const response = await axios.get(`${BASE_URL}/api/v1/videos/${videoId}`, {
          withCredentials: true,
        });
        if (isMounted) {
          setVideoData(response.data.data);

          // Delay the watch history API call
          setTimeout(async () => {
            try {
              await axios.post(`${BASE_URL}/api/v1/watchHistory/add/${videoId}`, {}, {
                withCredentials: true,
              });
            } catch (error) {
              console.error('Error adding video to watch history:', error);
            }
          }, 3000); // Delay of 3 seconds
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/videos/random/video`, {
          withCredentials: true,
        });
        // Filter out the current video from related videos
        const filteredVideos = response.data.data.filter(video => video.id !== videoId);
        if (isMounted) {
          setRelatedVideos(filteredVideos);
        }
      } catch (error) {
        console.error('Error fetching related videos:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchVideoData();
    fetchRelatedVideos();

    // Cleanup function to set isMounted to false
    return () => {
      isMounted = false;
    };
  }, [videoId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Video Player on the left */}
      <div className="w-3/4 h-full p-4 flex flex-col">
        <div className="flex-grow bg-white">
          <VideoPlayer
            videoId={videoId}
            videoUrl={videoData.video} // Adjust this if your API response structure is different
            videoTitle={videoData.title}
            videoDescription={videoData.description}
            videoViews={videoData.view_count}
            videoTimestamp={format(videoData.time)}
            channelId={videoData.channel_id}
            channelName={videoData.channel_name}
            channelAvatar={videoData.avatar}
            channelSubscribers={videoData.sub_count}
            likeCount={videoData.like_count}
            liked={videoData.liked}
            subscribed={videoData.subscribed}
          />
        </div>

        {/* Comments Section below VideoPlayer */}
        <div className="w-full mt-4 bg-white p-4 border-t border-gray-200">
          <CommentsSection comments={videoData.comments} />
        </div>
      </div>

      {/* Related Videos on the right */}
      <div className="w-1/4 h-full p-4 bg-white overflow-y-auto border-l border-gray-200">
        <h2 className="text-xl font-bold mb-4">Related Videos</h2>
        <div className="flex flex-col space-y-4">
          {relatedVideos.map((video) => (
            <VideoPreview
              key={video.id}
              videoId={video.id}
              channelId={video.owner}
              title={video.title}
              avatar={video.avatar}
              thumbnail={video.thumbnail}
              channelName={video.fullname}
              views={video.views}
              timestamp={format(video.createdat)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
