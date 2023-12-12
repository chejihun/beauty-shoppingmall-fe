import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "../action/postAction";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/posting.css"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidge";


const Posting = () => {
  const location = useLocation();
  const { selectedCategory } = location.state || { selectedCategory: '' };
  const [category, setCategory] = useState(selectedCategory);
  const { state } = useLocation();
  const categories = ['공지사항', '상품후기', '이벤트'];
  const categoryMappings = {
    '공지사항': 'notice',
    '상품후기': 'reviews',
    '이벤트': 'event'
  };
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState('');

  const mode = useSelector((state) => state.post.mode);
  const postId = useSelector((state) => state.post.selectedPost ? state.post.selectedPost._id : null);
  const loading = useSelector((state) => state.post.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setDescription(value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const uploadImagePost = (url) => {
    setImage(url);
  };

  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (event) => {
    const selectedDate = event.target.value;
    setEndDate(selectedDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) return;
    const postData = { title, description, category, image, startDate, endDate, navigate}
    if (mode === 'edit' && postId) {
      // 수정 모드
      const navigateTo = `/post/${postId}`
      dispatch(postAction.editPost({...postData, navigateTo, postId}))
    } else {
      // 새로운 모드
      const fromCategory = location?.state?.selectedCategory || '';
      const fromPath = categoryMappings[fromCategory] || '';
      const navigateTo = `/${fromPath}`
      dispatch(postAction.createPost({...postData, navigateTo}));
    }
  };

  useEffect(() => {
    if (state && state.postData) {
      const { title, description, category, image, startDate, endDate } = state.postData;
      setCategory(category)
      setTitle(title);
      setDescription(description);
      setStartDate(startDate);
      setEndDate(endDate);
      setImage(image)
    }
  }, [state]);

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
      ["link"],
      ['image', { 'imageSrc': true }],
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
          disabled={selectedCategory !== ''}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <option value=''>카테고리 선택</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {category === '이벤트' && (
          <div>
            <label htmlFor='startDate'>시작 날짜:</label>
            <input
              type='date'
              id='startDate'
              value={startDate}
              onChange={handleStartDateChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />

            <label htmlFor='endDate'>종료 날짜:</label>
            <input
              type='date'
              id='endDate'
              value={endDate}
              onChange={handleEndDateChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </div>
        )}

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
            value={description}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
          />
        </div>
        
        <div className="mb-3" controlId="Image" required>
        <div>Image</div>
        <CloudinaryUploadWidget uploadImage={uploadImagePost} className="Cloudinary" />

        <img
          id="uploadedimage"
          src={image}
          className="upload-image mt-2"
          alt="uploadedimage"

        />
      </div>
        
        <button
          type='submit'
          disabled={!category}
          className="write"
        >
          {mode === 'new' ? '작성하기' : '수정하기'}
        </button>
      </form>
    </div>
  );
};

export default Posting;
