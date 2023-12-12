import React, { useState, useEffect } from 'react';
import { postAction } from '../action/postAction';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";

const HomeEvent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  
  const showPost = (id) => navigate(`/post/${id}`);

  const calculateDaysLeft = (endDate) => {
    const currentDate = new Date();
    const endDateTime = new Date(endDate);
    const timeDifference = endDateTime - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const { postList } = useSelector((state) => ({
    postList: state.post.postList || [],
  }));

  useEffect(() => {
    dispatch(postAction.getPostList({ category: '이벤트' }));
  }, [dispatch, query]);

  return (
    <div className='home-event-area'>

      <div className='home-event-main-title'>News & Event</div>
      <div className='home-event-sub-title'>이벤트나 다양한 소식을 빠르게 받아보세요</div>
      <div className='home-event-card-area'>
        <Row className="home-event-card-grid">
          {postList.slice(0, 4).map((post) => {
            const daysLeft = calculateDaysLeft(post.endDate);
            return (
              <Col key={post._id} className='col-ma'>
                <div className='home-event-card' onClick={() => showPost(post._id)}>
                  <div>
                    <img src={post.image} alt="Post" className="home-event-img" />
                  </div>
                  <div className='home-event-title'>{post.title}</div>
                  <div className="home-event-date">
                    {daysLeft >= 0 ? (
                      "진행 중인 이벤트"
                    ) : (
                      `종료된 이벤트`
                    )}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div >
  )
}

export default HomeEvent