import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import "../style/notice.css"
import "../style/event.css"
import { useDispatch, useSelector } from "react-redux";
import { postAction } from '../action/postAction';
import EventCard from '../component/eventCard';
import { Container } from "react-bootstrap";

const EventPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => (state.user))
  const [query, setQuery] = useSearchParams();
  const { postList } = useSelector((state) => ({
    postList: state.post.postList || [],
  }));

  const handleWriteClick = () => {
    dispatch(postAction.setMode('new'));
    navigate("/posting", { state: { selectedCategory: '이벤트' } });
  }
  const [activeTab, setActiveTab] = useState('ongoing'); // 'ongoing' 또는 'completed'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    dispatch(postAction.getPostList());
  }, [dispatch, query]);


  const renderEventList = () => {
    // 여기에 이벤트 데이터를 가져와서 현재 탭에 맞게 필터링하는 로직을 추가해야 합니다.
    // 예: const filteredEvents = events.filter(event => event.status === activeTab);
    // 그 후에 filteredEvents를 기반으로 이벤트 목록을 렌더링합니다.
    return (
      <div>
        {/* 이벤트 목록 렌더링 로직 */}
      </div>
    );
  };

  const showPost = (id) => {
    navigate(`/post/${id}`);
  };

  // 카테고리가 "공지사항"인 게시물만 필터링하는 함수
  const filterEventPosts = (posts) => {
    return posts.filter(post => post.category.includes('이벤트'));
  };

  // postList에서 "공지사항" 카테고리인 게시물만 가져오도록 수정
  const filterPostList = filterEventPosts(postList);


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
      {renderEventList()}

      <Container className="event-area">
        <div className="event-card-grid">
          {filterPostList && (
            filterPostList.map((post) => (
              <div>
                <EventCard post={post} />
              </div>
            ))
          )}
        </div>
      </Container>



    </div>
  );

}

export default EventPage;