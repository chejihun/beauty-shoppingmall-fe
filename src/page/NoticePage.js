import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import "../style/notice.css"
import PostTable from '../component/PostTable';
import { useDispatch, useSelector } from "react-redux";
import { postAction } from '../action/postAction';
import ReactPaginate from "react-paginate";
import queryString from 'query-string';

const NoticePage = () => {
  const pageSize = 5
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const queryParams = queryString.parse(location.search);
  const { page=1, title="", category='공지사항' } = queryParams;

  const { postList, totalPostNum, page: currentPage } = useSelector((state) => ({
    postList: state.post.postList || [],
    totalPostNum: state.post.totalPostNum || 0,
    page: state.post.page || 1,
  }));
  const { user } = useSelector((state) => (state.user))

  const noticeHeader = [
    "No.",
    "제목",
    "작성일",
    "작성자",
  ];

  useEffect(() => {
    return () => dispatch(postAction.clearPost());
  },[])

  const handleWriteClick = () => {
    dispatch(postAction.setMode('new'));
    navigate("/posting", { state: { selectedCategory: '공지사항' } });
  }

  const handlePageClick = ({ selected }) => {
    const params = new URLSearchParams({...queryParams, page: selected + 1})
    const query = params.toString();
    navigate("?" + query)
  };

  useEffect(() => {
    if (page !== queryParams.page || title !== queryParams.title || category !== queryParams.category) {
      dispatch(postAction.getPostList({page, title, category, pageSize}));
    }
  }, [page, title, category]);

  const totalPageNum = Math.ceil(totalPostNum / pageSize);

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
        currentPage={currentPage}
        pageSize={pageSize}
        totalPostNum={totalPostNum}
      />

      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={currentPage - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
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