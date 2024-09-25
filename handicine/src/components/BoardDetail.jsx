import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './Detail.css';
import axios from 'axios';
const BoardDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/board/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
        fetchComments(); // Fetch comments when post details are loaded
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/board/${postId}/comments`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if required
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data); // Assuming the response includes comment author information
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchPostDetails();
  }, [postId]);
  const handleBackToList = () => {
    navigate('/board');
  };
  const handleUpdateClick = () => {
    navigate(`/board/update/${postId}`);
  };
  const handleAddComment = async () => {
    const commentData = {
      content: newComment, // Use newComment state
      postId: postId, // 게시글 ID
      authorUsername: userId,
    };
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:3000/api/board/${postId}/comments`, commentData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Comment added:', response.data);
      setComments([...comments, response.data]); // Update comments list
      setNewComment(""); // Clear input after adding
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="qna-page">
      <h1 className='page-title' style={{ color: "black", marginLeft:"300px" }}>게시물 내용</h1>
      <div className="detail-container">
        <h2>제목</h2>
        <div className="title-box">
          <h1 style={{ textAlign: "left" }}>{post.title}</h1>
        </div>
        <h2>내용</h2>
        <div className="content-box">
          <h4>{post.content}</h4>
        </div>
      </div>
      <h2 className="comment-section-title" style={{color:"black", marginRight:"1000px"}}>댓글</h2>
      <Form.Control
        className='commentfield'
        as="textarea"
        rows={3}
        placeholder="댓글을 입력하세요"
        value={newComment}
        onChange={handleCommentChange}
        style={{ marginTop: "20px", width:"993px" }}
      />
      {comments.map((comment) => (
        <div key={comment.id} className='container-box' style={{ marginTop: "30px", maxWidth:"1000px" }}>
          <strong>{comment.authorUsername
          }</strong>: {comment.content} {/* Display author and content */}
        </div>
      ))}
      <div className="write-button-container" style={{ marginTop: "20px" }}>
        <Button variant="secondary" onClick={handleUpdateClick} style={{ marginRight: "10px" }}>
          수정하기
        </Button>
        <Button variant="secondary" onClick={handleBackToList} style={{ marginRight: "10px" }}>
          목록보기
        </Button>
        <Button variant="success" onClick={handleAddComment}>
          댓글등록
        </Button>
      </div>
    </div>
  );
};
export default BoardDetail;