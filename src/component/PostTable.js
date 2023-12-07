import React from 'react'
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "../style/notice.css"

const PostTable = ({ noticeHeader, postList, currentPage, pageSize, totalPageNum}) => {

  const navigate = useNavigate();
  
  const showPost = (id) => {
    navigate(`/post/${id}`);
  };

   // 카테고리가 "공지사항"인 게시물만 필터링하는 함수
   const filterNoticePosts = (posts) => {
    return posts.filter(post => post.category.includes('공지사항'));
  };

  // postList에서 "공지사항" 카테고리인 게시물만 가져오도록 수정
  const filteredPostList = filterNoticePosts(postList);

  return (
    <div>
      <Table className='notice-table'>
        <thead className='thead'>
          <tr>
            {noticeHeader.map((title, index) => (
              <th key={index} className='notice-th'>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody className='tbody'>
          {filteredPostList && (
            filteredPostList.map((post, index) => (
              <tr key={index} className='postcard' onClick={() => showPost(post._id)}>
                <th>{(totalPageNum - currentPage) * pageSize + (filteredPostList.length - index)}</th>
                <th className='notice-card-title'>{post.title}</th>
                <th>{new Date(post.createdAt).toLocaleDateString()}</th>
                <th>{post.userName}</th>
              </tr>
            ))
          )}
        </tbody>

      </Table>

    </div>
  )
}

export default PostTable