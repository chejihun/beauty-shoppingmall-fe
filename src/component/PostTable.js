import React from 'react'
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import "../style/notice.css"

const PostTable = ({ noticeHeader, postList, currentPage, pageSize, totalPostNum}) => {

  const navigate = useNavigate();
  
  const showPost = (id) => {
    navigate(`/post/${id}`);
  };

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
          {postList && (
            postList.map((post, index) => (
              <tr key={index} className='postcard' onClick={() => showPost(post._id)}>
                <th>{totalPostNum - (pageSize * (currentPage - 1) + index)}</th>
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