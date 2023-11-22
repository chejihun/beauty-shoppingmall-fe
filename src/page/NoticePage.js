import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import "../style/notice.css"
import NoticeTable from '../component/NoticeTable';
import { userAction } from "../action/userAction";
import { useDispatch, useSelector } from "react-redux";

const NoticePage = () => {

  const { user } = useSelector((state) => (state.user))
  const noticeHeader = [
    "No.",
    "제목",
    "작성일",
    "작성자",
  ];

  const handleWriteClick = () => {
    //버튼 클릭시 게시판 작성하는 페이지로 이동
  }

  return (
    <div className='notice-area'>
      <h3 className="notice-title">공지사항</h3>
      <p className="notice-sub-title">Important notices</p>

      {user && user.level === "admin" && (
        <div className='notice-admin-write'>
          <Button
            className='write-btn'
            onClick={handleWriteClick}
          >글 작성</Button>
        </div>
      )}

      <NoticeTable
        noticeHeader={noticeHeader}
      />

    </div>
  );

}

export default NoticePage