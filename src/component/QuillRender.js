import React from 'react';
import DOMPurify from 'dompurify';

const QuillRender = ({ quillText }) => {
  // Quill에서 나오는 줄바꿈 처리 함수
  const renderQuillText = (quillText) => {
    return quillText.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="quill-renderer"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(quillText) }}>
    </div>
  );
};

export default QuillRender;