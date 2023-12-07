import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import "../style/event.css"
import QuillRender from "../component/QuillRender"

const EventCard = ({ post }) => {

  const navigate = useNavigate();

  const showPost = (id) => {
    navigate(`/post/${id}`);
  };
  
  return (
    <div className='event-card' onClick={() => showPost(post._id)}>
      <div className="event-img">
        <QuillRender quillText={post.description}/>
      </div>
      <div className='event-title'>{post.title}</div>
      <div>{new Date(post.createdAt).toLocaleDateString()}</div>
    </div>
  );
};

export default EventCard;


// {filterPostList && (
//   filterPostList.map((post, index) => (
//     <div key={index} className='postcard' onClick={() => showPost(post._id)}>
//       <QuillRender quillText={post.description} />
//       <div className='notice-card-title'>{post.title}</div>
//       <div>{new Date(post.createdAt).toLocaleDateString()}</div>
//     </div>
//   ))
// )}