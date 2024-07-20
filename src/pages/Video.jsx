import React from 'react';
import VideoPlayer from '../components/VideoPlayer.jsx'; // Adjust the import path as needed
import VideoPreview from '../components/VideoPreview.jsx'; // Adjust the import path as needed
import CommentsSection from '../components/CommentsSection.jsx'; // Adjust the import path as needed

const Video = () => {
  return (
    <div className="flex w-full h-screen bg-white">
      {/* Video Player on the left */}
      <div className="w-3/4 h-full p-4 flex flex-col">
        <div className="flex-grow bg-white">
          <VideoPlayer />
        </div>

        {/* Comments Section below VideoPlayer */}
        <div className="w-full mt-4 bg-white p-4 border-t border-gray-200">
          <CommentsSection />
        </div>
      </div>

      {/* Related Videos on the right */}
      <div className="w-1/4 h-full p-4 bg-white overflow-y-auto border-l border-gray-200">
        <h2 className="text-xl font-bold mb-4">Related Videos</h2>
        <div className="flex flex-col space-y-4">
          <VideoPreview
            thumbnail="http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/sample_thumbnail1.jpg"
            videoId="1"
            title="Sample Video 1"
          />
          <VideoPreview
            thumbnail="http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/sample_thumbnail2.jpg"
            videoId="2"
            title="Sample Video 2"
          />
          {/* Add more VideoPreview components as needed */}
        </div>
      </div>
    </div>
  );
};

export default Video;
