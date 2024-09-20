import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormControl, Button, Form } from 'react-bootstrap';
import './Input.css';

const Input = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("qna"); // 기본 값: QnA 게시판
  const navigate = useNavigate();
  const location = useLocation();

  // 제목 입력 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 내용 입력 핸들러
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // 게시판 선택 핸들러
  const handleBoardTypeChange = (e) => {
    setBoardType(e.target.value);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
      title: title,
      content: content,
      authorUsername: "사용자", // 임시 사용자 이름
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 선택한 게시판에 따른 API 엔드포인트 설정
    const apiEndpoint = boardType === "qna" ? "/api/qna" : "/api/board";

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const from = location.state?.from || boardType;
        navigate(`/${from}`); // 게시글 작성 후 해당 게시판으로 이동
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 목록보기 버튼 핸들러
  const handleBackToList = () => {
    const from = location.state?.from || 'qna';
    navigate(`/${from}`);
  };

  return (
    <div className="qna-page">
      <h1 className='page-title' style={{color:"#333"}}>게시물 등록</h1>
      <div className="container-box">
        <Form onSubmit={handleSubmit}>
          <Form.Select value={boardType} onChange={handleBoardTypeChange}>
            <option value="qna">QnA 게시판</option>
            <option value="board">자유 게시판</option>
          </Form.Select>
          <Form.Group controlId="formTitle">
            <FormControl
              style={{margin:"20px 0px"}}
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <FormControl
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
              등록
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Input;
