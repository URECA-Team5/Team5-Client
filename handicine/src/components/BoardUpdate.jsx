import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { FormControl, InputGroup, Button, Form } from 'react-bootstrap'; 
import axios from 'axios'; 
import './Update.css';

const BoardUpdate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); 
  const { postId } = useParams(); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/board/${postId}`);
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);              
  };

  const handleBackToList = () => {
    navigate('/board'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/api/board/${postId}`, { title, content });
      navigate('/board'); 
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
        await axios.delete(`http://localhost:8080/api/board/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}` // 토큰을 헤더에 추가
          }
        });
        navigate('/board'); // 삭제 후 게시글 목록으로 이동
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  

  return (
    <div className="qna-page">
      <h1 className='page-title' style={{color:"#333"}}>게시물 수정</h1>
      <div className="container-box">
        <Form onSubmit={handleSubmit}>
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
            <Button variant="success" type="submit" style={{marginRight: "10px"}}>
              수정하기
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              삭제하기
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BoardUpdate;
