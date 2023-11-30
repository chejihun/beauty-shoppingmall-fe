import { useParams  } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { commonUiAction } from "../action/commonUiAction";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "../action/postAction";
import { useNavigate, useSearchParams } from 'react-router-dom'
import QuillRender from "../component/QuillRender"
import DOMPurify from 'dompurify';
import { userAction } from "../action/userAction";

const Post = () => {

  // const state = useSelector((state) => state);
  // console.log("state",state);
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPost = useSelector((state) => state.post.selectedPost);
  const sanitizedHTML = DOMPurify.sanitize(selectedPost);

  const handleNoticeClick = () => {
    navigate("/notice")
  }

  const handlePostEdit = () => {
    try {
      dispatch(postAction.setMode('edit'));
      dispatch(postAction.getPostDetail(id));
      navigate('/posting', { state: { postData: selectedPost } });
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }
  // console.log("selectedPost", selectedPost)
 
  const handlePostDelete = () => {

  }

  const stripHtmlTags = (htmlString) => {
    const regex = /<br\s*\/?>/gi;
    return htmlString.replace(regex, '\n').replace(/<[^>]*>/g, '');
  };

  useEffect(() => {
    dispatch(userAction.loginWithToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(postAction.getPostDetail(id))
  }, [id]);

  return (
    <div className="post-area">
      <div className="post-from">
        <div className="post-type">
          {selectedPost && selectedPost.category}
          <p>공지사항</p>
          <p>새로운 소식을 전해드립니다</p>
        </div>

        <div className="post-name">
          <div>작성자</div>
          <div>{selectedPost && selectedPost.userName}</div>
        </div>
        <div className="post-name">
          <div>제목</div>
          <div>{selectedPost && selectedPost.title}</div>
        </div>

        <div className="post-content" >
          <QuillRender quillText={selectedPost && selectedPost.description} />
        </div>

        <div className="post-btn">
          <div>
            <button
              onClick={handleNoticeClick}
              className="move-notice"
            >목록
            </button>
          </div>

          <div>
            <div>
              {selectedPost && selectedPost.rightEdit && (
                <div>
                  <button onClick={handlePostEdit} className="move-notice">
                    수정
                  </button>
                  <button onClick={handlePostDelete} className="move-notice">
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default Post;