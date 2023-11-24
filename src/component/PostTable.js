import React from 'react'
import Table from "react-bootstrap/Table";

const PostTable = ({ noticeHeader, postList }) => {

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
          {postList.map((post, index) => (
            <tr key={index}>
              <th>{index}</th>
              <th>{post.title}</th>
              <th>{new Date(post.createdAt).toLocaleDateString()}</th>
              <th>{post.name}</th>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  )
}

export default PostTable