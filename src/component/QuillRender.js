import React from 'react';
import DOMPurify from 'dompurify';

const QuillRender = ({ quillText }) => {

  return (
    <div className="quill-renderer"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(quillText) }}>
    </div>
  );
};

export default QuillRender;