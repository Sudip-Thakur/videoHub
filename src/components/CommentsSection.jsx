import React from 'react';
import Comment from './Comment.jsx' // Adjust the import path as needed

const CommentsSection = () => {

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default CommentsSection;
