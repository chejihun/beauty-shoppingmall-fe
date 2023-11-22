import React from 'react'
import Table from "react-bootstrap/Table";

const NoticeTable = ({ noticeHeader }) => {
  return (
    <div>
      
      <Table
        className='notice-table'
        // striped bordered hover
      >
        <thead className='thead'>
          <tr>
            {noticeHeader.map((title, index) => (
              <th key={index} className='notice-th'>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody className='tbody'>
          <tr>
            <th>01</th>
            <th>하드코딩 게시물 제목</th>
            <th>2023-11-20</th>
            <th>admin</th>
          </tr>

          <tr>
            <th>02</th>
            <th>하드코딩 게시물 제목</th>
            <th>2023-11-20</th>
            <th>admin</th>
          </tr>

          <tr>
            <th>03</th>
            <th>하드코딩 게시물 제목</th>
            <th>2023-11-20</th>
            <th>admin</th>
          </tr>
        </tbody>
      </Table>

    </div>
  )
}

export default NoticeTable