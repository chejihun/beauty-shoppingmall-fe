import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/event.css"

const EventCard = ({ post }) => {

  const navigate = useNavigate();

  const showPost = (id) => {
    navigate(`/post/${id}`, {state: {category: '이벤트'}});
  };
  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
  
    // 날짜 형식이 유효하지 않으면 0을 반환하도록 수정
    if (isNaN(end)) {
      console.error('Invalid date format for endDate:', endDate);
      return 0;
    }
  
    const timeDifference = end - now;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysRemaining;
  };

  return (
    <div className='event-card' onClick={() => showPost(post._id)}>
      <div>
        <img src={post.image} alt="Post" className="event-img" />
      </div>
      <div className='event-title'>{post.title}</div>
      <div className="event-date">
        {new Date(post.createdAt).toLocaleDateString()} - {new Date(post.endDate).toLocaleDateString()} ({getDaysRemaining(post.endDate)}일 남음)
      </div>
    </div>
  );
};

export default EventCard;