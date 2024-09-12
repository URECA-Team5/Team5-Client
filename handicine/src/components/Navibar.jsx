import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navibar.css';

const Navibar = () => {
  // 로그인 상태를 관리할 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
    // 추가적인 로그아웃 처리 로직 (예: 세션 삭제)
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <div className="brand-container">
        <Navbar.Brand as={Link} to='/' className="custom-brand">HANDICINE</Navbar.Brand>
      </div>
      <div className="nav-container">
        <Nav className="menu">
          <Nav.Link as={Link} to="/qna">전문가 Q&A</Nav.Link>
          <Nav.Link as={Link} to="/board">자유 게시판</Nav.Link>
          <Nav.Link as={Link} to="/pharmacy">주변 약국 찾기</Nav.Link>
          <Nav.Link as={Link} to="/disease">전염병 유행정보</Nav.Link>
          <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
        </Nav>
      </div>
      <div className="auth-container">
        {!isLoggedIn ? (
          <>
            <Button variant="light" className='btn' as={Link} to="/login">로그인</Button>
            <Button variant="light" className='btn' as={Link} to="/signup">회원가입</Button>
          </>
        ) : (
          <>
            <Button variant="light" className='btn' as={Link} to="/mypage">마이페이지</Button>
            <Button variant="light" className='btn' onClick={handleLogout}>로그아웃</Button>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default Navibar;
