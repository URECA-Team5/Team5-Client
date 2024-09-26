import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './Detail.css';
import  axios  from 'axios';
const QnADetail = () => {
  const {qnaId} = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]); // 댓글 상태 추가
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태
  const userId = localStorage.getItem('userId');
  const userToken = localStorage.getItem('userToken');
  const navigate = useNavigate();
  console.log(qnaId);
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/qna/${qnaId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        console.log(data);
        setPost(data);
        fetchComments(); // Fetch comments when post details are loaded
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/qna/${qnaId}/answers`, {
          headers: {
            'Authorization': `Bearer ${userToken}` // Include token if required
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
  }, [qnaId]);
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
  const handleAddComment = async () => {
    function parseJwt(token) {
      try {
        const trimmedToken = token.trim();
        const base64Url = token.split('.')[1]; // JWT의 payload 부분 추출
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload); // payload JSON으로 반환
      } catch (error) {
        console.error("JWT 해석 중 오류 발생:", error);
        return null;
      }
    }
    const token = localStorage.getItem('token');
      console.log(token);
      const decodedToken = parseJwt(token);
      console.log(decodedToken.role_name);
    const  question_id = qnaId;
    console.log('questionId : ',question_id);
      console.log('userId',userId);
      if(decodedToken.role_name === "expert"){
        const commentData = {
          content: newComment, // Use newComment state
          questionId: question_id, // 게시글 ID
          authorUsername: userId,
        };
        try {
          const response = await axios.post(`http://localhost:8080/api/qna/${question_id}/answers`, commentData, {
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
      }
      else {
        alert("전문가만 댓글을 작성할 수 있습니다.");
      }
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value); // 새로운 댓글 입력 상태 업데이트
  };
  if (!post) {
    return <div>Loading...</div>; // 데이터가 로드되지 않은 경우 표시
}
  return (
    <div className="qna-page">
      <h1 className='page-title' style={{ color: "black", marginLeft:"300px" }}>게시물 내용</h1>
      <div className="detail-container">
        <div className="title-box">
          <h1>{post.title}</h1>
        </div>
        <div className="content-box">
          <h4>{post.content}</h4>
        </div>
      </div>
      <h2 className="comment-section-title" style={{color:"black", marginRight:"1000px"}}>댓글</h2>
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
      {comments.map((comment) => (
        <div key={comment.id} className='container-box' style={{ marginTop: "30px", maxWidth:"1000px" }}>
          <strong>{comment.authorUsername
          }</strong>: {comment.content}
        </div>
      ))}
      <div className="write-button-container" style={{ marginTop: "20px" }}>
      {post.authorUsername === userId && ( // 게시글 작성자와 로그인한 유저가 같을 경우 수정하기 버튼이 보임
          <Button variant="secondary" onClick={handleUpdateClick} style={{ marginRight: "10px" }}>
            수정하기
          </Button>
        )}
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