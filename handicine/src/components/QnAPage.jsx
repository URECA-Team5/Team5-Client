import React, { useState, useEffect } from 'react';
import './QnAPage.css';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate로 페이지 이동 추가
import { FormControl, InputGroup, Button, Pagination, Table } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // 돋보기 아이콘

const QnAPage = () => {
  const [questions, setQuestions] = useState([
    { id: 1, title: "전문가에게 질문하고 싶어요", author: "사용자1", date: "2024-09-01" },
    { id: 2, title: "약물 복용 관련 질문이 있습니다", author: "사용자2", date: "2024-09-02" },
    { id: 3, title: "의학적인 질문을 하고 싶어요", author: "사용자3", date: "2024-09-03" },
    { id: 4, title: "약물 복용 관련 질문이 있습니다", author: "사용자4", date: "2024-09-04" },
    { id: 5, title: "전문가에게 질문하고 싶어요", author: "사용자5", date: "2024-09-05" },
    { id: 6, title: "의학적인 질문을 하고 싶어요", author: "사용자6", date: "2024-09-06" },
    { id: 7, title: "전문가에게 질문하고 싶어요", author: "사용자7", date: "2024-09-07" },
    { id: 8, title: "약물 복용 관련 질문이 있습니다", author: "사용자8", date: "2024-09-08" },
    { id: 9, title: "의학적인 질문을 하고 싶어요", author: "사용자9", date: "2024-09-09" },
    { id: 10, title: "질문 예시", author: "사용자10", date: "2024-09-10" },
    { id: 11, title: "질문 예시", author: "사용자11", date: "2024-09-11" },
    { id: 12, title: "질문 예시", author: "사용자12", date: "2024-09-12" },
    // 질문을 추가로 작성하거나 백엔드에서 받아올 수 있습니다.
  ]);

  const [searchOption, setSearchOption] = useState("제목만");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10; // 한 페이지당 질문 수
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleSearchOptionSelect = (option) => {
    setSearchOption(option);
  };

  const handleSearch = () => {
    console.log(`검색 옵션: ${searchOption}, 검색어: ${searchText}`);
    // 검색 기능을 추가할 때 사용할 검색 로직
  };

  const handleWriteClick = () => {
    navigate('/input'); // 'input.jsx'로 이동
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="qna-page">
      <h1 className='page-title'>전문가 Q&A 게시판</h1>
      <div className="search-bar">
        <InputGroup className="custom-search">
          <FormControl
            placeholder="검색어를 입력해주세요"
            aria-label="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputGroup.Text className="search-icon" onClick={handleSearch}>
            <FaSearch style={{ color: 'green' }} />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <div className="container-box">
        <Table striped bordered hover responsive className="qna-table">
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.map(question => (
              <tr key={question.id}>
                <td>
                  <Link to={`/board/${question.id}`}>
                    {question.title}
                  </Link>
                </td>
                <td>{question.author}</td>
                <td>{question.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* 페이지네이션 */}
        <Pagination className="pagination">
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          />
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>

        {/* 글쓰기 버튼 */}
        <div className="write-button-container">
          <Button variant="success" onClick={handleWriteClick}>
            글쓰기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QnAPage;
