// import React from 'react';
// import Comment from './Comment.jsx' // Adjust the import path as needed

// const CommentsSection = () => {

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Comments</h2>
//       <Comment />
//       <Comment />
//       <Comment />
//       <Comment />
//       <Comment />
//       <Comment />
//     </div>
//   );
// };

// export default CommentsSection;

import React, { useState } from 'react';
import Comment from './Comment.jsx'; // Adjust the import path as needed
import Button from '@mui/material/Button';

const CommentsSection = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, text: 'This is a sample comment.', username: 'Username1' },
    { id: 2, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis aperiam iusto quidem repudiandae tenetur nemo cum dignissimos. Nihil, perspiciatis totam saepe architecto recusandae quia quibusdam ratione minima obcaecati dolorem?', username: 'Username2' },
    { id: 3, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis aperiam iusto quidem repudiandae tenetur nemo cum dignissimos. Nihil, perspiciatis totam saepe architecto recusandae quia quibusdam ratione minima obcaecati dolorem?', username: 'Username3' },
    { id: 4, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis aperiam iusto quidem repudiandae tenetur nemo cum dignissimos. Nihil, perspiciatis totam saepe architecto recusandae quia quibusdam ratione minima obcaecati dolorem?', username: 'Username4' },
  ]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, text: comment, username: 'Username' },
      ]);
      setComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-3"
          src="http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/esrwtg8kjanliwo8q7xh.jpg" // Replace with dynamic user avatar URL if needed
          alt="User avatar"
        />
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded mr-2"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
          Comment
        </Button>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} username={comment.username} text={comment.text} />
      ))}
    </div>
  );
};

export default CommentsSection;

