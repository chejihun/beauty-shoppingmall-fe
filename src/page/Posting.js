import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { postAction } from "../action/postAction";
import { useNavigate } from "react-router-dom";
import "../style/posting.css"

const Posting = () => {
  const categories = ['공지사항', '상품후기', '이벤트'];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');  // 추가: 사용자 이름

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postAction.createPost({ title, description, category, name }));
    navigate('/notice');
  };
  
  return (
    <div className='posting-area'>
      <h2>포스팅 작성</h2>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor='category'>카테고리:</label>
        <select
          id='category'
          value={category}
          onChange={handleCategoryChange}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <option value=''>카테고리 선택</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor='name'>이름:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={handleNameChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <label htmlFor='title'>제목:</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={handleTitleChange}
          style={{ width: '100%', marginBottom: '10px' }}
        />

        <label htmlFor='content'>본문:</label>
        <textarea
          id='content'
          value={description}
          onChange={handleContentChange}
          style={{ width: '100%', minHeight: '200px', marginBottom: '10px' }}
        />

        <button type='submit' disabled={!category}>
          작성하기
        </button>
      </form>
    </div>
  );
};

export default Posting;
