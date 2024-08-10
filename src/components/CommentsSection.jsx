import React from 'react';
import Comment from './Comment.jsx' // Adjust the import path as needed

const CommentsSection = (comments) => {
  console.log(comments)
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {comments.map((comment, index) => (
          <Comment
            // key={index}
            // userAvatar={comment.avatar}
            // userName={comment.username}
            // commentContent={comment.content}
          />
        ))}
    </div>
  );
};

export default CommentsSection;
