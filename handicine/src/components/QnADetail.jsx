import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './Detail.css';

const QnADetail = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]); // 댓글 상태 추가
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);              
  };

  const handleBackToList = () => {
    navigate('/qna');
  };

  const handleUpdateClick = () => {
    navigate('/qna/update');
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") { // 댓글이 빈칸이 아닐 때만 추가
      setComments([...comments, newComment]); // 새로운 댓글을 기존 배열에 추가
      setNewComment(""); // 입력 필드를 비우기
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value); // 새로운 댓글 입력 상태 업데이트
  };

  return (
    <div className="qna-page">
      <h1 className='page-title' style={{color:"#333"}}>게시물 내용</h1>
      <div className="detail-container">
        <div className="title-box">
          <h1>{title}</h1>
        </div>
        <div className="content-box">
          <h4>{content}</h4>
        </div>
      </div>

      <h2 className="comment-section-title">댓글</h2>

      {/* 댓글 입력 필드 */}
      <Form.Control
        className='commentfield'
        as="textarea"
        rows={3}
        placeholder="댓글을 입력하세요"
        value={newComment}
        onChange={handleCommentChange}
        style={{ marginTop: "20px" }}
      />

      {/* 기존 댓글을 렌더링 */}
      {comments.map((comment, index) => (
        <div key={index} className='container-box' style={{ marginTop: "30px" }}>
          {comment}
        </div>
      ))}

      <div className="write-button-container" style={{ marginTop: "20px" }}>
        <Button variant="secondary" onClick={handleUpdateClick} style={{ marginRight: "10px" }}>
          수정하기
        </Button>
        <Button variant="secondary" onClick={handleBackToList} style={{ marginRight: "10px" }}>
          목록보기
        </Button>
        <Button variant="success" onClick={handleAddComment}> {/* 댓글 등록 버튼 */}
          댓글등록
        </Button>
      </div>
    </div>
  );
};

export default QnADetail;
