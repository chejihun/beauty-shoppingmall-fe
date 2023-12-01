import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import "../style/notice.css"
import PostTable from '../component/PostTable';
import { useDispatch, useSelector } from "react-redux";
import { postAction } from '../action/postAction';
import ReactPaginate from "react-paginate";

const NoticePage = () => {

  const pageSize = 5
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postList, totalPageNum } = useSelector((state) => ({
    postList: state.post.postList || [],
    totalPageNum: state.post.totalPageNum || 0,
  }));
  const { user } = useSelector((state) => (state.user))
  
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    title: query.get("title") || "",
  });

  const noticeHeader = [
    "No.",
    "제목",
    "작성일",
    "작성자",
  ];

  const handleWriteClick = () => {
    dispatch(postAction.setMode('new'));
    navigate("/posting", { state: { selectedCategory: '공지사항' } });
    // navigate("/posting")
  }

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  useEffect(() => {
    dispatch(postAction.getPostList({...searchQuery}));
  }, [dispatch, query]);

  useEffect(() => {
    if (searchQuery.title === "") {
      delete searchQuery.title
    }
    const params = new URLSearchParams(searchQuery)
    const query = params.toString();
    navigate("?" + query)
  }, [searchQuery]);


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
        currentPage={searchQuery.page}
        pageSize={pageSize}
        totalPageNum={totalPageNum}
      />

      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="paginate n-paginate"
      />

    </div>
  );

}

export default NoticePage