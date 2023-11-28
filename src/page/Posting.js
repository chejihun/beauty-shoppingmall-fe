import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { postAction } from "../action/postAction";
import { useNavigate } from "react-router-dom";
import "../style/posting.css"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"


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

  const handleContentChange = (value) => {
    setDescription(value);
    console.log(value)
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

  const modules = {
    clipboard: {
      matchVisual: false,
    },
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <div className='posting-area'>
      <h2>게시물 작성</h2>

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

        <div className='quill-hi'>
          <ReactQuill
            id='content'
            theme="snow"
            defaultValue={description}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
          />
        </div>

        <button
          type='submit'
          disabled={!category}
          className="write" >
          작성하기
        </button>
      </form>
    </div>
  );
};

export default Posting;
