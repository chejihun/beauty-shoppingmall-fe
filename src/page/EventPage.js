import React, { useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import "../style/notice.css"
import { useDispatch, useSelector } from "react-redux";
import { postAction } from '../action/postAction';

const EventPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => (state.user))
  const handleWriteClick = () => {
    dispatch(postAction.setMode('new'));
    navigate("/posting", { state: { selectedCategory: '이벤트' } });
 
  }

 

  return (
    <div className='notice-area'>
      <h3 className="notice-title">Event</h3>
      <p className="notice-sub-title">이벤트 게시판입니다</p>

      {user && user.level === "admin" && (
        <div className='notice-admin-write'>
          <Button
            className='write-btn'
            onClick={handleWriteClick}
          >글 작성</Button>
        </div>
      )}




    </div>
  );

}

export default EventPage;