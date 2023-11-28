import React from 'react'
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const PostTable = ({ noticeHeader, postList, currentPage, pageSize, totalPageNum}) => {

  const navigate = useNavigate();
  
  const showProduct = (id) => {
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
              <tr key={index} className='postcard' onClick={() => showProduct(post._id)}>
                 <th>{(totalPageNum - currentPage) * pageSize + (postList.length - index)}</th>
                <th>{post.title}</th>
                <th>{new Date(post.createdAt).toLocaleDateString()}</th>
                <th>{post.name}</th>
              </tr>
            ))
          )}
        </tbody>

      </Table>

    </div>
  )
}

export default PostTable