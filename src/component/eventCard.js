import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/event.css"

const EventCard = ({ post }) => {

  const navigate = useNavigate();

  const showPost = (id) => {
    navigate(`/post/${id}`, { state: { category: '이벤트' } });
  };
  const calculateDaysLeft = (endDate) => {
    const currentDate = new Date();
    const endDateTime = new Date(endDate);
    const timeDifference = endDateTime - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const daysLeft = calculateDaysLeft(post.endDate);

  return (
    <div className='event-card' onClick={() => showPost(post._id)}>
      <div>
        <img src={post.image} alt="Post" className="event-img" />
      </div>
      <div className='event-title'>{post.title}</div>
      <div className="event-date">
        {daysLeft >= 0 ? (
          `이벤트 종료 날짜는 ${daysLeft}일 남았습니다.`
        ) : (
          "이벤트가 종료되었습니다."
        )}
      </div>
    </div>
  );
};

export default EventCard;