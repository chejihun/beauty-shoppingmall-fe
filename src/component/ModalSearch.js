import React, { useEffect, useState } from 'react'
import "../style/modalsearch.css"
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ModalSearch = ({ showModalSearch, setShowModalSearch  }) => {

  const searchKeyword = ["바디", "핸드", "크림"]
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearchCloseClick = () => {
    setShowModalSearch(false)
  }
  
  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      const searchValue = event.target.value;
      navigate(`/store?name=${searchValue}`);
      setShowModalSearch(false);
    }
  };
  
  useEffect(() => {
    if (showModalSearch) {
      setKeyword(""); 
    }
  }, [showModalSearch]);

  return (
    <Modal
      show={showModalSearch}
      size='lg'
      fullscreen='md-down'
      contentClassName="modal-search"
    >
      <IoClose
        className='modal-close'
        onClick={handleSearchCloseClick}
      />
        <Row>
          <Col className='modal-search-area'>
            <div className="search">
              <input
                type="text"
                placeholder="검색어 입력"
                className='md-searchbar'
                onChange={(event) => setKeyword(event.target.value)}
                onKeyPress={onCheckEnter}
                value={keyword}
              />
              <BiSearch className='md-searchbar-icon' />
            </div>
            <div className="search-keyword">
              <h4>인기 검색어 : </h4>
              {searchKeyword.map((item, index) => (
                <div key={index} className='item-keyword'>
                  #{item}
                </div>
              ))}
            </div>
          </Col>
        </Row>
    </Modal>
  )
}

export default ModalSearch