import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import "../style/notice.css"
import PostTable from '../component/PostTable';
import { useDispatch, useSelector } from "react-redux";
import { postAction } from '../action/postAction';

const NoticePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.postList);
  // console.log('postList:', postList);

  const [query, setQuery] = useSearchParams();
  const { user } = useSelector((state) => (state.user))
  const noticeHeader = [
    "No.",
    "제목",
    "작성일",
    "작성자",
  ];

  const handleWriteClick = () => {
    navigate("/posting")
  }

  useEffect(() => {
    dispatch(postAction.getPostList(query));
  }, [dispatch, query]);

  return (
    <div className='notice-area'>
      <h3 className="notice-title">Notice</h3>
      <p className="notice-sub-title">공지사항입니다</p>

      {user && user.level === "admin" && (
        <div className='notice-admin-write'>
          <Button
            className='write-btn'
            onClick={handleWriteClick}
          >글 작성</Button>
        </div>
      )}

      <PostTable
        noticeHeader={noticeHeader}
        postList={postList}
      />

    </div>
  );

}

export default NoticePage