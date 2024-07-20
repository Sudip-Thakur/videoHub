import React from 'react';

const Comment = () => {
  const userAvatar = 'http://res.cloudinary.com/dvla5jcq0/image/upload/v1721279668/esrwtg8kjanliwo8q7xh.jpg'
  const userName = 'iamsudip'
  const commentContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis aperiam iusto quidem repudiandae tenetur nemo cum dignissimos. Nihil, perspiciatis totam saepe architecto recusandae quia quibusdam ratione minima obcaecati dolorem?'
  return (
    <div className="flex items-start mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <img
        className="w-12 h-12 rounded-full mr-4"
        src={userAvatar}
        alt="User avatar"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">{userName}</p>
        <p className="text-gray-700 mt-1">{commentContent}</p>
      </div>
    </div>
  );
};

export default Comment;
