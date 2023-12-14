import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import "../style/notice.css"
import "../style/event.css"
import { useDispatch, useSelector } from "react-redux";
import { postAction } from '../action/postAction';
import EventCard from '../component/eventCard';
import { Button, Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from '../component/LoadingSpinner';

const EventPage = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => (state.user))
  const [query, setQuery] = useSearchParams();
  const { postList } = useSelector((state) => ({
    postList: state.post.postList || [],
  }));
  const [morePost, setMorePost] = useState(6);
  const { status } = useParams();
  const isCompleted = status === 'completed';
  const showPost = (id) => navigate(`/post/${id}`);
  const [showCompleted, setShowCompleted] = useState(isCompleted);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [isLoading, setIsLoading] = useState(true);

  const handleWriteClick = () => {
    dispatch(postAction.setMode('new'));
    navigate("/posting", { state: { selectedCategory: '이벤트' } });
  }

  const handleTabChange = (tab) => {
    setShowCompleted(tab === 'completed');
    if (tab === 'completed') {
      setActiveTab('completed')
      navigate('/events/completed');
    } else {
      setActiveTab('ongoing')
      navigate('/events/ongoing');
    }
  };
  
  const calculateDaysLeft = (endDate) => {
    const currentDate = new Date();
    const endDateTime = new Date(endDate);
    const timeDifference = endDateTime - currentDate;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };

  const handleShowMoreClick = () => {
    setMorePost((prev) => prev + 6);
  };

  useEffect(() => {
     setIsLoading(true);
    dispatch(postAction.getPostList({ category: '이벤트' })).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, query]);

  useEffect(() => {
    return () => dispatch(postAction.clearPost())
  }, [])

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
      <div className="tab-menu">
        <button
          onClick={() => handleTabChange('ongoing')}
          className={activeTab === 'ongoing' ? 'tab-button onactive' : 'tab-button'}
        >
          진행 중인 이벤트
        </button>
        <button
          onClick={() => handleTabChange('completed')}
          className={activeTab === 'completed' ? 'tab-button onactive' : 'tab-button'}
        >
          종료된 이벤트
        </button>
      </div>

      <div className="event-area">
        <Row className="event-card-grid">
          
        {isLoading && <LoadingSpinner />} 
          {postList &&
            postList
              .filter((post) =>
                showCompleted ? calculateDaysLeft(post.endDate) <= 0 : calculateDaysLeft(post.endDate) > 0
              )
              .slice(0, morePost)
              .map((post) => (
                <Col key={post._id}>
                  <EventCard post={post} />
                </Col>
              ))}
        </Row>
      </div >

      <div className="event-more-area">
        {morePost < postList.length && (
          <div>
            <button
              onClick={handleShowMoreClick}
              className="event-more-btn"
            >
              More +</button>
          </div>
        )}
      </div>



    </div>
  );

}

export default EventPage;