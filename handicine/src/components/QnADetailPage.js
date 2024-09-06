import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QnADetailPage = () => {
  const { id } = useParams(); // URL에서 id 파라미터를 가져옴
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    // 나중에 API에서 질문 데이터를 받아옴
    // fetch(`/api/questions/${id}`).then(response => response.json()).then(data => setQuestion(data));
    setQuestion({
      id,
      title: "전문가에게 질문하고 싶어요",
      author: "사용자1",
      content: "여기에 질문의 내용을 입력합니다.",
      date: "2024-09-01",
    });
  }, [id]);

  if (!question) return <div>Loading...</div>;

  return (
    <div className="qna-detail">
      <h1>{question.title}</h1>
      <p>작성자: {question.author}</p>
      <p>작성일: {question.date}</p>
      <div className="qna-content">{question.content}</div>
    </div>
  );
};

export default QnADetailPage;