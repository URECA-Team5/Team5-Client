import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate로 페이지 이동 추가
import { FormControl, InputGroup, Button, Form } from 'react-bootstrap'; // FormControl, InputGroup, Button, Form 추가
import './Update.css';

const QnAUpdate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);              
  };

  const handleBackToList = () => {
    navigate('/qna'); // 'qna' 페이지로 이동
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 폼 데이터를 서버에 제출하는 로직을 추가할 수 있습니다.
    let ff = e.target
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    navigate('/qna'); // 'qna' 페이지로 이동
  };

  return (
    <div className="qna-page">
      <h1 className='page-title' style={{color:"#333"}}>게시물 수정</h1>
      <div className="container-box">
        <Form onSubmit={handleSubmit}>
          <Form.Select>
            <option value="qna">QnA 게시판</option>
            <option value="board">자유 게시판</option>
          </Form.Select>
          <Form.Group controlId="formTitle">
            <FormControl
              className='box'
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <FormControl
              className='box'
              as="textarea"
              rows={5}
              placeholder="내용을 입력하세요"
              value={content}
              onChange={handleContentChange}
            />
          </Form.Group>
          

          <div className="write-button-container">
            <Button variant="secondary" onClick={handleBackToList} style={{marginRight: "10px"}}>
              목록보기
            </Button>
            <Button variant="success" type="submit">
              수정
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default QnAUpdate;
