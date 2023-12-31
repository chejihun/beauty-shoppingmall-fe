import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { commonUiAction } from "../action/commonUiAction";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "../action/postAction";
import { useNavigate, useLocation } from 'react-router-dom'
import QuillRender from "../component/QuillRender"
import DOMPurify from 'dompurify';
import { userAction } from "../action/userAction";

const Post = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const category = location?.state?.category;
  const selectedPost = useSelector((state) => state.post.selectedPost);
  const sanitizedHTML = DOMPurify.sanitize(selectedPost);
  const navigateTo = category === '이벤트' ? '/event' : '/notice'
  const handleToList = () => {
    navigate(navigateTo)
  }

  const handleEdit = () => {
    dispatch(postAction.setMode('edit'));
    dispatch(postAction.getPostDetail(id));
    navigate('/posting', { state: { postData: selectedPost } });
  }
  const handleDelete = () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      dispatch(postAction.deletePost({postId: id, navigate, navigateTo}));
    }
  };

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
          <p>{selectedPost && selectedPost.category} 게시판</p>
          <p>새로운 소식을 전해드립니다</p>
        </div>

        <div className="post-name">
          <div>작성자</div>
          <div>{selectedPost && selectedPost.userName}</div>
        </div>
        <div className="post-name post-line">
          <div>제목</div>
          <div>{selectedPost && selectedPost.title}</div>
        </div>

        <div className="post-content">
          <QuillRender quillText={selectedPost && selectedPost.description} />
          {selectedPost && selectedPost.image && (
            <img src={selectedPost.image} alt="Post" />
          )}
        </div>

        <div className="post-btn">
          <div>
            <button
              onClick={handleToList}
              className="move-notice"
            >목록
            </button>
          </div>

          <div>
            <div>
              {selectedPost && selectedPost.rightEdit && (
                <div>
                  <button onClick={handleEdit} className="move-notice">
                    수정
                  </button>
                  <button onClick={handleDelete} className="move-notice">
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